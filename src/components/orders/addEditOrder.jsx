import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { addOrderThunk } from "../../store/slices/orders/addOrderThunk";
import { updateOrderThunk } from "../../store/slices/orders/updateOrderThunk";
import { findOrderThunk } from "../../store/slices/orders/findOrderThunk";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import './addEditOrder.css';
import { Button, TextField, Paper, Typography, Box, Grid, Container, Divider } from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { customersFetchThunk } from "../../store/slices/customers/customersFetch";
import { activitiesFetch } from "../../store/slices/activites/activitiesFetch";

export const AddEditOrder = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myOrder = useSelector(state => state.order.order);
  const isM = useSelector(state => state.manager.isM);
  const activityName = useSelector(state => state.order.activityName);
  const activities = useSelector(state => state.activity.activities);
  const customers = useSelector(state => state.customer.customers);

  const [order, setOrder] = useState(myOrder? myOrder : {
    
    customerId: params.id? parseInt(params.id) : 0,
    payment: 0,
    amountOfParticipants: 0,
    date: "",
    activeHour: "",
    activityId: params.idActivity? parseInt(params.idActivity) : 0
  });
  const [edit, setEdit] = useState(false);
  const refDialog = useRef();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    console.log("AddEditOrder useEffect running with params:", params);
    
    // Initialize order with default values if not already set
    if (!order) {
      setOrder({
        customerId: params.id ? parseInt(params.id) : 0,
        amountOfParticipants: 0,
        date: "",
        activeHour: "",
        activityId: params.idActivity ? parseInt(params.idActivity) : 0
      });
    }
    
    if (params.id) {
      setOrder(prev => ({ ...prev, customerId: parseInt(params.id) }));
    }
    
    if (params.idActivity) {
      setOrder(prev => ({ ...prev, activityId: parseInt(params.idActivity) }));
      console.log("Setting activity ID:", params.idActivity);
      
      // Find activity price
      const activity = activities?.find(a => a.activityId === parseInt(params.idActivity));
      console.log("Found activity:", activity);
      
      if (activity && order?.amountOfParticipants) {
        setTotalPrice(activity.price * order.amountOfParticipants);
      }
    }
    else if (params.orderId) {
      dispatch(findOrderThunk({ id: params.orderId }));
      setEdit(true);
    }
    
    // Make sure the dialog exists before trying to open it
    if (refDialog.current) {
      console.log("Opening dialog");
      refDialog.current.showModal();
    } else {
      console.error("Dialog reference is not available");
    }
  }, [params, activities]); // Add dependencies

  // Recalculate price when amount changes
  useEffect(() => {
    if (order.activityId && order.amountOfParticipants) {
      const activity = activities.find(a => a.activityId === parseInt(params.idActivity));
      if (activity) {
        setTotalPrice(activity.price * order.amountOfParticipants);
      }
    }
  }, [order.amountOfParticipants, order.activityId]);

  const saveOrder = () => {
    debugger
    if (order.activityId && order.customerId) {
      if (edit) {
        dispatch(updateOrderThunk({ details: order }));
        refDialog.current.close();
        navigate('/orders');
      } else {
        dispatch(addOrderThunk({ details: order }));
        refDialog.current.close();
        navigate(-1);
      }
    } else {
      alert("לא ניתן להוסיף/לערוך - חסרים פרטים חיוניים");
    }
  };

  const cancel = () => {
    refDialog.current.close();
    navigate(-1);
  };

  const generateInvoice = () => {
    // יצירת מסמך PDF חדש
    const doc = new jsPDF();
    
    // מציאת פרטי הלקוח והפעילות
    const customer = customers.find(c => c.instituteId === parseInt(params.id));
    const activity = activities.find(a => a.activityId === parseInt(params.idActivity));  
    
    if (!customer || !activity) {
      alert("לא ניתן להפיק חשבונית - חסרים פרטים");
      return;
    }
    
    // הוספת כותרת
    doc.setFontSize(22);
    doc.setTextColor(63, 81, 181);
    doc.text("חשבונית עסקה", 105, 20, { align: "center" });
    
    // פרטי חשבונית
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`מספר חשבונית: INV-${Date.now().toString().slice(-6)}`, 200, 40, { align: "right" });
    doc.text(`תאריך: ${new Date().toLocaleDateString('he-IL')}`, 200, 50, { align: "right" });
    
    // פרטי לקוח
    doc.setFontSize(14);
    doc.setTextColor(63, 81, 181);
    doc.text("פרטי לקוח:", 200, 70, { align: "right" });
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`שם: ${customer.instituteName || 'לא צוין'}`, 200, 80, { align: "right" });
    doc.text(`טלפון: ${customer.mobile || 'לא צוין'}`, 200, 90, { align: "right" });
    doc.text(`אימייל: ${customer.email || 'לא צוין'}`, 200, 100, { align: "right" });
    doc.text(`איש קשר: ${customer.contactName || 'לא צוין'}`, 200, 110, { align: "right" });
    
    // פרטי הזמנה
    doc.setFontSize(14);
    doc.setTextColor(63, 81, 181);
    doc.text("פרטי הזמנה:", 200, 130, { align: "right" });
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`פעילות: ${activityName || activity.name || 'לא צוין'}`, 200, 140, { align: "right" });
    doc.text(`תאריך: ${order.date || 'לא צוין'}`, 200, 150, { align: "right" });
    doc.text(`שעה: ${order.activeHour || 'לא צוין'}`, 200, 160, { align: "right" });
    doc.text(`מספר משתתפים: ${order.amountOfParticipants || 0}`, 200, 170, { align: "right" });
    
    // במקום טבלה, נשתמש בטקסט רגיל
    doc.setFontSize(14);
    doc.setTextColor(63, 81, 181);
    doc.text("פרטי תשלום:", 200, 190, { align: "right" });
    
    // יצירת קו מפריד
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 200, 190, 200);
    
    // כותרות עמודות
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("תיאור", 180, 210, { align: "right" });
    doc.text("כמות", 130, 210, { align: "right" });
    doc.text("מחיר ליחידה", 80, 210, { align: "right" });
    doc.text("סה\"כ", 30, 210, { align: "right" });
    
    // קו מפריד נוסף
    doc.line(20, 215, 190, 215);
    
    // נתוני השורה
    doc.text(activityName || activity.name || 'פעילות', 180, 225, { align: "right" });
    doc.text(`${order.amountOfParticipants || 0}`, 130, 225, { align: "right" });
    doc.text(`₪${activity.price || 0}`, 80, 225, { align: "right" });
    doc.text(`₪${totalPrice}`, 30, 225, { align: "right" });
    
    // קו מפריד תחתון
    doc.line(20, 230, 190, 230);
    
    // סה"כ לתשלום
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`סה"כ לתשלום: ₪${totalPrice}`, 190, 245, { align: "right" });
    
    // כותרת תחתונה
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text("תודה שבחרתם בנו!", 105, 280, { align: "center" });
    
    // שמירת ה-PDF
    doc.save(`חשבונית-${order.customerId}-${Date.now()}.pdf`);
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
                  value={order?.customerId || ''}
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
                value={order?.amountOfParticipants || ''}
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
                value={order?.date || ''}
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
                  value={order?.activityId || ''}
                  onChange={e => setOrder({ ...order, activityId: parseInt(e.target.value) })}
                  className="form-field"
                />
              </Grid>
            )}
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="שעה"
                variant="outlined"
                value={order?.activeHour || ''}
                onChange={e => setOrder({ ...order, activeHour: e.target.value })}
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
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<SaveIcon />}
            onClick={saveOrder}
            className="action-button save-button"
          >
            שמור
          </Button>
          
          <Button 
            variant="outlined" 
            color="secondary" 
            startIcon={<ReceiptIcon />}
            onClick={generateInvoice}
            className="action-button invoice-button"
            // disabled={!order.customerId || !order.activityId || !order.amountOfParticipants}
          >
            הפק חשבונית
          </Button>
          
          <Button 
            variant="outlined" 
            startIcon={<ArrowBackIcon />}
            onClick={cancel}
            className="action-button back-button"
          >
            חזור
          </Button>
        </Box>
      </Container>
    </dialog>
  );
};