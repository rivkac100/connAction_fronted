import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { addOrderThunk } from "../../store/slices/orders/addOrderThunk";
import { updateOrderThunk } from "../../store/slices/orders/updateOrderThunk";
import { findOrderThunk } from "../../store/slices/orders/findOrderThunk";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import './addEditOrder.css';
import { Button, TextField, Paper, Typography, Box, Grid, Container, Divider } from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PaymentIcon from '@mui/icons-material/Payment';
import { customersFetchThunk } from "../../store/slices/customers/customersFetch";
import { activitiesFetch } from "../../store/slices/activites/activitiesFetch";
import { customersFetchThunkById } from "../../store/slices/customers/customerFetchThunkById";
import { timeIsAvailableThunk } from "../../store/slices/managers/timeIsAvailableThunk";
import { activityFetchThunkById } from "../../store/slices/activites/activityFetchThunkById";
import { editOrder, editfindOrder, editorder } from "../../store/slices/orders/orderSlice";

import { editCust } from "../../store/slices/activites/activitySlice";
import { managersFetchThunkById } from "../../store/slices/managers/managerFetchThunkById";
import { editCan } from "../../store/slices/managers/managersSlice";
import { editIsManager } from "../../store/slices/customers/customersSlice";


export const AddEditOrder = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myOrder = useSelector(state => state.order.order);
  const manager = useSelector(state => state.manager.myManager);
  const isM = useSelector(state => state.manager.isM);
  const actDispatch = useSelector(state => state.order.activity);
  const custDispatch = useSelector(state => state.activity.customer);
  const mangDispatch = useSelector(state => state.customer.manager);
  const timeDispatch = useSelector(state => state.manager.isEmpty);
  const addDispatch = useSelector(state => state.order.add);
  const updateDispatch = useSelector(state => state.order.update);
  const saveDispatch = useSelector(state => state.manager.addOrUpdate);
  const activityName = useSelector(state => state.order.activityName);
  const activity = useSelector(state => state.activity.activity);
  const customer = useSelector(state => state.user.MyUser);
  const isAvailable = useSelector(state => state.manager.isEmpty);
  const [order, setOrder] = useState(myOrder ? myOrder : {

    customerId: params.id ? parseInt(params.id) : 0,
    payment: 0,
    amountOfParticipants: 0,
    date: "",
    activeHour: "",
    activityId: params.idActivity ? parseInt(params.idActivity) : 0,
    managerId: params.mid ? parseInt(params.mid) : 0,
    isOk:0,
    isPayment:0,
  });
  const [edit, setEdit] = useState(false);
  const refDialog = useRef();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    console.log("AddEditOrder useEffect running with params:", params);
    // if (params.orderId) {
    //   dispatch(editOrder(null));
    //   console.log("myOrder", myOrder);
    // }
    console.log(myOrder);

    if(parseInt(params.orderId)===myOrder.orderId) {
         refDialog.current.showModal();
    }
    if (!params.orderId) {
      dispatch(editfindOrder());
      console.log(order);
      refDialog.current.showModal();

    }
    // Initialize order with default values if not already set
    if (!order) {
      setOrder({
        customerId: params.id ? parseInt(params.id) : 0,
        amountOfParticipants: 0,
        date: "",
        activeHour: "",
        activityId: params.idActivity ? parseInt(params.idActivity) : 0,
        managerId: params.mid ? parseInt(params.mid) : 0,
        isOk:0,
        isPayment:0
      });
      dispatch(editfindOrder());
    }

    if (params.id) {
      setOrder(prev => ({ ...prev, customerId: parseInt(params.id) }));
    }

    if (params.idActivity) {
      if (!activity && params.idActivity && actDispatch) {
        dispatch(activityFetchThunkById({ id: parseInt(params.idActivity) }));
        console.log(activity);
      }
      else if (activity) {
        dispatch(editCust());
      }
      setOrder(prev => ({ ...prev, activityId: parseInt(params.idActivity) }));
      console.log("Setting activity ID:", params.idActivity);

      // Find activity price
      // const activity = activities?.find(a => a.activityId === parseInt(params.idActivity));
      console.log("Found activity:", activity);

      if (activity && order?.amountOfParticipants && activity.price) {
        setTotalPrice(activity.price * order.amountOfParticipants);
      }
    }



    // Make sure the dialog exists before trying to open it
    // if ( refDialog.current) {
    //   console.log("Opening dialog");
    //   refDialog.current.showModal();
    // } else {
    //   console.error("Dialog reference is not available");
    // }
  }, [params]); // Add dependencies
  useEffect(()=>{
    if(params.orderId){
      // if (!myOrder || (myOrder.orderId !== parseInt(params.orderId))) {
      //   dispatch(findOrderThunk({ id: params.orderId }));
   
      // }
    //   dispatch(findOrderThunk({ id: params.orderId }));
      setOrder({...order, customerId: myOrder.customerId ,managerId: myOrder.managerId, activityId: myOrder.activityId, date: myOrder.date, activeHour: myOrder.activeHour, payment: myOrder.payment, amountOfParticipants: myOrder.amountOfParticipants, isOk: myOrder.isOk, isPayment: myOrder.isPayment });
      console.log(myOrder);
      console.log(order);
      if(myOrder.orderId === parseInt(params.orderId)){ 
   
      setEdit(true);
      }
     
      refDialog.current.showModal();
    }
  },[params.orderId]);
  useEffect(() => {
    if (params.id) {


      if (!customer && custDispatch) {
        // Fetch activities

        dispatch(customersFetchThunkById({ id: parseInt(params.id) }));

        // dispatch(activitiesFetch());
      }
      else if (customer && custDispatch) {
        dispatch(editIsManager());
      }
    }
  }, [customer, params.id,custDispatch]);
  useEffect(() => {
    if (params.mid) {
      setOrder({...order, managerId: parseInt(params.mid) });

      if (!manager && mangDispatch) {
        // Fetch activities

        dispatch(managersFetchThunkById({ id: parseInt(params.mid) }));

        // dispatch(activitiesFetch());
      }
      else if (manager && mangDispatch) {
        dispatch(editCan());
      }
    }
  }, [manager, params.mid,mangDispatch]);
  // Recalculate price when amount changes
  useEffect(() => {
    if (order.activityId > 1000 && order.amountOfParticipants && !activity.activityId && actDispatch) {
      // const activity = activities.find(a => a.activityId === parseInt(params.idActivity));
      dispatch(activityFetchThunkById({ id: order.activityId }));

      if (activity.price) {
        setTotalPrice(activity.price * order.amountOfParticipants);
      }
    }
    else if (activity) {
      dispatch(editCust());
    }
  }, [order.amountOfParticipants, order.activityId]);
  useEffect(() => {
    if (order.customerId > 10000 && !customer && custDispatch) {
      dispatch(customersFetchThunkById({ id: order.customerId }));
    }
    else if (customer && custDispatch) {
      dispatch(editIsManager());
    }
  }, [order.customerId,custDispatch])
  useEffect(() => {
    

     if (order.managerId > 1 && !manager && mangDispatch) {
      dispatch(managersFetchThunkById({ id: order.managerId }));
    }
    else if (manager && mangDispatch) {
      dispatch(editCan());
    }

  }, [order.managerId,mangDispatch])
  useEffect(() => {
    

    if ( !manager && mangDispatch) {
     dispatch(managersFetchThunkById({ id:params.mid }));
   }
   else if (manager && mangDispatch) {
     dispatch(editCan());
   }

 }, [params.mid]);
  const saveOrder = () => {
    console.log(customer);
    console.log(manager);
    console.log(activity);
    console.log(order);
    if (order.activityId && order.customerId) {
      // יצירת עותק של ההזמנה עם הוספת השניות לשעה
      const orderToSave = {
        ...order,
        activeHour: order.activeHour && !order.activeHour.includes(":00") ?
          order.activeHour + ":00" :
          order.activeHour
      };

      if (edit && updateDispatch && saveDispatch) {

        dispatch(updateOrderThunk({ details: orderToSave }));
        refDialog.current.close();
        navigate('/orders');
      } else if (addDispatch && saveDispatch) {

        dispatch(addOrderThunk({ details: orderToSave }));
        refDialog.current.close();
        navigate(-1);
      }
    } else {
      alert("לא ניתן להוסיף/לערוך - חסרים פרטים חיוניים");
    }
  };
  const proceedToPayment = () => {
    console.log(customer);
    console.log(manager);
    console.log(activity);
    console.log(order);
    if (order.activityId && order.customerId && order.amountOfParticipants > 0) {
      try {
        // הוספת השניות לשעה
        const formattedHour = order.activeHour && !order.activeHour.includes(":00") ?
          order.activeHour + ":00" :
          order.activeHour;

        // שמירת פרטי ההזמנה בלוקל סטורג' לשימוש בדף התשלום
        const orderDetails = {
          ...order,
          activeHour: formattedHour,
          totalPrice,
          activityName
        };

        localStorage.setItem('pendingOrder', JSON.stringify(orderDetails));
        console.log('Order details saved to localStorage:', orderDetails);

        // סגירת הדיאלוג הנוכחי
        refDialog.current.close();
        // ניווט לדף התשלום
        navigate('payment');




      } catch (error) {
        console.error('Error navigating to payment page:', error);
        alert(`שגיאה במעבר לדף התשלום: ${error.message}`);
      }
    } else {
      alert("לא ניתן לעבור לתשלום - חסרים פרטים חיוניים");
    }
  };
  const check = async () => {
    console.log(customer);
    console.log(manager);
    console.log(activity);
    setOrder({ ...order, managerId: params.mid?params.mid:order.managerId });
    console.log(order);
    console.log(timeDispatch);
    //  await dispatch( activityFetchThunkById({ id: order.activityId }));
    if ( activity.lenOfActivity && order.date && order.activeHour && order.amountOfParticipants && order.activityId && order.customerId && order.managerId) {
      dispatch(timeIsAvailableThunk({ id: order.managerId, date: order.date, time: order.activeHour, len: activity.lenOfActivity }));
    }

    else {
      alert("לא ניתן לבדוק - חסרים פרטים חיוניים");
    }
  }
  const cancel = () => {
    refDialog.current.close();
    navigate(-1);
  };

  const generateInvoice = () => {
    // מציאת פרטי הלקוח והפעילות
    // const customer = customers.find(c => c.instituteId === parseInt(params.id));
    // const activity = activities.find(a => a.activityId === parseInt(params.idActivity));  
     if(!customer && order.customerId) {
      dispatch(customersFetchThunkById({ id: order.customerId }));
      console.log(customer);
    }
    if (!order.customerId || !order.activityId) {
      alert("לא ניתן להפיק חשבונית - חסרים פרטים");
      return;
    }

    // יצירת אלמנט HTML זמני לחשבונית
    const invoiceElement = document.createElement('div');
    invoiceElement.style.width = '800px';
    invoiceElement.style.padding = '40px';
    invoiceElement.style.fontFamily = 'Arial, sans-serif';
    invoiceElement.style.direction = 'rtl';
    invoiceElement.style.position = 'absolute';
    invoiceElement.style.left = '-9999px';
    invoiceElement.style.top = '-9999px';
    console.log(customer);
    console.log(customer.instituteName);
    // הוספת תוכן החשבונית
    invoiceElement.innerHTML = `
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #b60557; font-size: 28px; margin-bottom: 10px;">חשבונית עסקה</h1>
        <p style="font-size: 14px; color: #666;">מספר חשבונית: INV-${Date.now().toString().slice(-6)}</p>
        <p style="font-size: 14px; color: #666;">תאריך: ${new Date().toLocaleDateString('he-IL')}</p>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="color: #b60557; font-size: 18px; margin-bottom: 15px;">פרטי לקוח</h2>
        <p style="font-size: 14px; margin: 5px 0;">שם: ${customer.instituteName  || 'לא צוין'}</p>
        <p style="font-size: 14px; margin: 5px 0;">טלפון: ${customer.mobile || 'לא צוין'}</p>
        <p style="font-size: 14px; margin: 5px 0;">אימייל: ${customer.email || 'לא צוין'}</p>
        <p style="font-size: 14px; margin: 5px 0;">איש קשר: ${customer.contactName || 'לא צוין'}</p>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="color: #b60557; font-size: 18px; margin-bottom: 15px;">פרטי הזמנה</h2>
        <p style="font-size: 14px; margin: 5px 0;">פעילות: ${activityName || activity.name || 'לא צוין'}</p>
        <p style="font-size: 14px; margin: 5px 0;">תאריך: ${order.date || 'לא צוין'}</p>
        <p style="font-size: 14px; margin: 5px 0;">שעה: ${order.activeHour || 'לא צוין'}</p>
        <p style="font-size: 14px; margin: 5px 0;">מספר משתתפים: ${order.amountOfParticipants || 0}</p>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="color: #b60557; font-size: 18px; margin-bottom: 15px;">פרטי תשלום</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid #ddd;">
              <th style="text-align: right; padding: 10px; font-size: 14px;">תיאור</th>
              <th style="text-align: right; padding: 10px; font-size: 14px;">כמות</th>
              <th style="text-align: right; padding: 10px; font-size: 14px;">מחיר ליחידה</th>
              <th style="text-align: right; padding: 10px; font-size: 14px;">סה"כ</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="text-align: right; padding: 10px; font-size: 14px;">${activityName || activity.name || 'פעילות'}</td>
              <td style="text-align: right; padding: 10px; font-size: 14px;">${order.amountOfParticipants || 0}</td>
              <td style="text-align: right; padding: 10px; font-size: 14px;">₪${activity.price || 0}</td>
              <td style="text-align: right; padding: 10px; font-size: 14px;">₪${totalPrice}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div style="text-align: left; margin-bottom: 30px;">
        <h3 style="color: #b60557; font-size: 18px;">סה"כ לתשלום: ₪${totalPrice}</h3>
      </div>
      
      <div style="text-align: center; margin-top: 50px;">
        <p style="font-size: 14px; color: #666;">תודה שבחרתם בנו!</p>
      </div>
    `;

    // הוספת האלמנט לדף
    document.body.appendChild(invoiceElement);

    // המרת האלמנט לתמונה באמצעות html2canvas
    html2canvas(invoiceElement, { scale: 2 }).then(canvas => {
      // הסרת האלמנט הזמני
      document.body.removeChild(invoiceElement);

      // יצירת PDF מהתמונה
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // חישוב יחס גובה/רוחב של התמונה
      const imgWidth = 210; // רוחב דף A4 במ"מ
      const imgHeight = canvas.height * imgWidth / canvas.width;

      // הוספת התמונה ל-PDF
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      // שמירת ה-PDF
      pdf.save(`חשבונית-${order.customerId}-${Date.now()}.pdf`);
    });
  };

  return (
    <dialog ref={refDialog} className="order-dialog">
      <Container component={Paper} className="order-container">
        <Box className="order-header">
          {params.idActivity && (
            <Typography variant="h4" className="title">
              הזמנה חדשה: {activityName}
            </Typography>
          )}
          {params.orderId && (
            <Typography variant="h4" className="title">
              עריכת הזמנה
            </Typography>
          )}
        </Box>

        <Divider className="divider" />

        <Box className="order-form">
          <Grid container spacing={3}>
            {!params.id && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="קוד לקוח"
                  variant="outlined"
                  value={order?.customerId}
                  onChange={e => setOrder({ ...order, customerId: parseInt(e.target.value) })}
                  className="form-field"
                />
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="כמות משתתפים"
                variant="outlined"
                type="number"
                value={order?.amountOfParticipants}
                onChange={e => setOrder({ ...order, amountOfParticipants: parseInt(e.target.value) })}
                className="form-field"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="תאריך"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={order?.date}
                onChange={e => setOrder({ ...order, date: e.target.value })}
                className="form-field"
              />
            </Grid>

            {!params.idActivity && (
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="קוד פעילות"
                  variant="outlined"
                  value={order?.activityId}
                  onChange={e => setOrder({ ...order, activityId: parseInt(e.target.value) })}
                  className="form-field"
                />
              </Grid>
            )}
            {!params.mid && (
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="קןד מנהל "
                  variant="outlined"
                  type="number"
                  value={order?.managerId}
                  onChange={e => setOrder({ ...order, managerId: parseInt(e.target.value) })}
                  className="form-field"
                />
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="שעה"
                variant="outlined"
                type="time"
                InputLabelProps={{ shrink: true }}
                inputProps={{ step: 60 }}
                value={order?.activeHour?.substring(0, 5) || ''}
                onChange={e => {
                  const timeValue = e.target.value;
                  const timeWithSeconds = timeValue + ":00";
                  setOrder({ ...order, activeHour: timeWithSeconds });
                }}
                className="form-field"
              />
            </Grid>

            <Grid item xs={12}>
              <Box className="price-display">
                <Typography variant="h5">
                  סה"כ לתשלום: ₪{totalPrice}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box className="order-actions">
          {!isAvailable &&
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={check}

              className="action-button save-button"
              style={{ backgroundColor: '#b60557', color: 'white' }}
            >
              בדיקה האם הזמן זמין
            </Button>}
          {(isAvailable || edit) && <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={saveOrder}
            disabled={!isAvailable}
            className="action-button save-button"
            style={{ backgroundColor: '#b60557', color: 'white' }}
          >
            שמור
          </Button>}

          <Button
            variant="contained"
            startIcon={<PaymentIcon />}
            onClick={proceedToPayment}
            className="action-button payment-button"
            style={{ backgroundColor: '#b60557', color: 'white' }}

          >
            המשך לתשלום
          </Button>

          <Button
            variant="contained"
            startIcon={<ReceiptIcon />}
            onClick={generateInvoice}
            className="action-button invoice-button"
            style={{ backgroundColor: '#b60557', color: 'white' }}
          >
            הפק חשבונית
          </Button>

          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={cancel}
            className="action-button back-button"
            style={{ backgroundColor: '#b60557', color: 'white' }}
          >
            חזור
          </Button>
        </Box>
        <Outlet />
      </Container>
     
    </dialog>
  );
};

