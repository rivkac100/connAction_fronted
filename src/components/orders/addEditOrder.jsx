<<<<<<< HEAD
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../logon/logon.css"
import * as React from 'react';
// import Button from '@mui/joy/Button';
// import Divider from '@mui/joy/Divider';
import { useParams } from 'react-router-dom';
import { addOrderThunk } from "../../store/slices/addOrderThunk";
import { updateOrderThunk } from "../../store/slices/updateOrderThunk";
import { findOrderThunk } from "../../store/slices/findOrderThunk";
// import { Input } from "@mui/material";
// import Select from '@mui/joy/Select';
// import Option from '@mui/joy/Option';
//import Stack from '@mui/joy/Stack';
//import LocationOn from '@mui/icons-material/LocationOn';
// import { Stack } from "@mui/material";
// import { LocationOn } from "@mui/icons-material";
export const LogonOrder = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const orders = useSelector(state => state.order.orders)
  const myOrder = useSelector(state => state.order.order)
  // const [order, setOrder] = useState({
  //     instituteName: "", mobile: "", email: "",
  //     fax: "", contactName: "", contactPhone: "", city: "", community: "", amount: 0,
  //     due: 0
  // });
  const [order, setOrder] = useState(myOrder)
  const [edit, setEdit] = useState(false);
  const refDialog = useRef();

  const [id, setId] = useState();
  const [currency, setCurrency] = React.useState('dollar');
  useEffect(() => {
    
    
    //    setId(params.id)
    //    console.log(id);
    if(params.orderId) {
      debugger
      console.log(params.orderId);
      //setId(parseInt(params.id))
      // console.log(id)
      //let c = orders.find(x => x.instituteId===parseInt(params.id));
      dispatch(findOrderThunk({ id: params.orderId }))
      console.log(myOrder);
      // for (const key in object) {
      //     if (Object.hasOwnProperty.call(object, key)) {
      //         const element = object[key];

      //     }
      //}
      // 
      // setOrder(order);
      console.log(order);
      setEdit(true)
    }refDialog.current.showModal();
  }, [])
  //const refDialog = useRef()
  // const navigate = useNavigate();
  // useEffect(() => {
  //     refDialog.current.showModal();
  //  }, []);
  const logOnn = () => {
    if ( order.activityId) {
      debugger
      if (edit) {

        dispatch(updateOrderThunk({ details: order }))
        refDialog.current.close();

        navigate('/orders')
      }
      else {
        dispatch(addOrderThunk({ details: order }));
        refDialog.current.close();

        // console.log(token);
        navigate('/orders')

      }
    }
    else {
      alert("can't add/ edit")

    }
  }
  const cancele = () => {
    refDialog.current.close();
    navigate(`/orders`)
}
  return <dialog ref={refDialog} className="inDiv" >

    <br /><input className="logBut" type="text" value={order?.payment} placeholder="insert payment" onChange={e => setOrder({ ...order, payment: parseInt(e.target.value) })} />
    <br /><input className="logBut" type="text" value={order?.customerId} placeholder="insert customerId" onChange={e => setOrder({ ...order, customerId: parseInt(e.target.value) })} />
    <br /><input className="logBut" type="text" value={order?.brokerId} placeholder="insert brokerId" onChange={e => setOrder({ ...order, brokerId: parseInt(e.target.value) })} />
    <br /><input className="logBut" type="text" value={order?.amountOfParticipants} placeholder="insert amountOfParticipants" onChange={e => setOrder({ ...order, amountOfParticipants: parseInt(e.target.value) })} />
    <br /><input className="logBut" type="date" value={order?.date} placeholder="insert date" onChange={e => setOrder({ ...order, date: e.target.value })} />
    <br /><input className="logBut" type="text" value={order?.activityId} placeholder="insert activityId" onChange={e => setOrder({ ...order, activityId: parseInt(e.target.value) })} />
    <br /><input className="logBut" type="text" value={order?.activeHour} placeholder="insert activeHour" onChange={e => setOrder({ ...order, activeHour: e.target.value })} />
    {/* <br /><input className="logBut" type="text" value={order?.activeMinutes} placeholder="insert activeMinutes" onChange={e => setOrder({ ...order, activeMinutes:parseInt(e.target.value)})} /> */}
    <br /><button className="login" onClick={() => { logOnn() }}>save</button>
    <br /><button className="login" onClick={() => { cancele() }}>back</button>




    {/* <Input
        placeholder="סוג טיול"
        startDecorator={{ dollar: '$', baht: '฿', yen: '¥' }[currency]}
        endDecorator={
          <React.Fragment>
            <Divider orientation="vertical" />
            <Select
              variant="plain"
              value={currency}
              onChange={(_, value) => setCurrency(value)}
              slotProps={{
                listbox: {
                  variant: 'outlined',
                },
              }}
              sx={{ mr: -1.5, '&:hover': { bgcolor: 'transparent' } }}
            >
              <Option value="dollar">US dollar</Option>
              <Option value="baht">Thai baht</Option>
              <Option value="yen">Japanese yen</Option>
            </Select>
          </React.Fragment>
        }
        sx={{ width: 300 }}
      />
      <Input
        placeholder="Your location"
        startDecorator={
          <Button variant="soft" color="neutral" startDecorator={<LocationOn/>}>
            Locate
          </Button>
        }
        sx={{ width: 300 }}
      /> */}
    {/* {raute && refDialog.current.close()} */}
  </dialog>

=======
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../logon/logon.css"
import * as React from 'react';
// import Button from '@mui/joy/Button';
// import Divider from '@mui/joy/Divider';
import { useParams } from 'react-router-dom';
import { addOrderThunk } from "../../store/slices/addOrderThunk";
import { updateOrderThunk } from "../../store/slices/updateOrderThunk";
// import { Input } from "@mui/material";
// import Select from '@mui/joy/Select';
// import Option from '@mui/joy/Option';
//import Stack from '@mui/joy/Stack';
//import LocationOn from '@mui/icons-material/LocationOn';
// import { Stack } from "@mui/material";
// import { LocationOn } from "@mui/icons-material";
export const LogonOrder = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orders = useSelector(state => state.order.orders)
    const token = useSelector(state => state.order.token)
    // const [order, setOrder] = useState({
    //     instituteName: "", mobile: "", email: "",
    //     fax: "", contactName: "", contactPhone: "", city: "", community: "", amount: 0,
    //     due: 0
    // });
    const [order,setOrder]=useState({})
    const [edit, setEdit] = useState(false);
   
    const [id,setId]=useState();
     const [currency, setCurrency] = React.useState('dollar');
    useEffect(() => {
    //    setId(params.id)
    //    console.log(id);
        if (params.id) {
            console.log(params.id);
            //setId(parseInt(params.id))
           // console.log(id)
            let c = orders.find(x => x.instituteId===parseInt(params.id));

            // for (const key in object) {
            //     if (Object.hasOwnProperty.call(object, key)) {
            //         const element = object[key];

            //     }
            //}
            // 
            setOrder(c);
            console.log(order);
            setEdit(true)
        }
    }, [])
    //const refDialog = useRef()
    // const navigate = useNavigate();
    // useEffect(() => {
    //     refDialog.current.showModal();
    //  }, []);
    const logOnn = () => {
      if(order.brokerId && order.activityId){
        debugger
        if (edit) {
            dispatch(updateOrderThunk({details:order}))
            navigate('/orders')
        }
        else {
            dispatch(addOrderThunk({details:order}));
            // console.log(token);
            navigate('/orders')

        }
}
else {alert("can't add/ edit")

}
        // if (token === 0) {
        //     // navigate(`/home/${}`);
        //     console.log("aabb");
        // }
        // dispatch(setCurrentUser({ username: user.username, password: user.password, token: -1 }))
        // navigate("/calender");
    }

    return <div className="inDiv" >
        
        <br /><input className="logBut" type="text" value={order?.payment} placeholder="insert payment" onChange={e => setOrder({ ...order, payment: parseInt(e.target.value) })} />
        <br /><input className="logBut" type="text" value={order?.customerId} placeholder="insert customerId" onChange={e => setOrder({ ...order, customerId:parseInt( e.target.value) })} />
        <br /><input className="logBut" type="text" value={order?.borkerName } placeholder="insert brokerId" onChange={e => setOrder({ ...order, brokerId: parseInt(e.target.value) })} />
        <br /><input className="logBut" type="text" value={order?.amountOfParticipants} placeholder="insert amountOfParticipants" onChange={e => setOrder({ ...order, amountOfParticipants: parseInt(e.target.value) })} />
        <br /><input className="logBut" type="date" value={order?.date} placeholder="insert date" onChange={e => setOrder({ ...order, date: e.target.value })} />
        <br /><input className="logBut" type="text" value={order?.activityId} placeholder="insert activityId" onChange={e => setOrder({ ...order, activityId: parseInt(e.target.value) })} />
        <br /><input className="logBut" type="text" value={order?.activeHour} placeholder="insert activeHour" onChange={e => setOrder({ ...order, activeHour: e.target.value})} />
        {/* <br /><input className="logBut" type="text" value={order?.activeMinutes} placeholder="insert activeMinutes" onChange={e => setOrder({ ...order, activeMinutes:parseInt(e.target.value)})} /> */}
        <br /><button className="login" onClick={() => { logOnn() }}>log on</button>
        
       
  
    
      {/* <Input
        placeholder="סוג טיול"
        startDecorator={{ dollar: '$', baht: '฿', yen: '¥' }[currency]}
        endDecorator={
          <React.Fragment>
            <Divider orientation="vertical" />
            <Select
              variant="plain"
              value={currency}
              onChange={(_, value) => setCurrency(value)}
              slotProps={{
                listbox: {
                  variant: 'outlined',
                },
              }}
              sx={{ mr: -1.5, '&:hover': { bgcolor: 'transparent' } }}
            >
              <Option value="dollar">US dollar</Option>
              <Option value="baht">Thai baht</Option>
              <Option value="yen">Japanese yen</Option>
            </Select>
          </React.Fragment>
        }
        sx={{ width: 300 }}
      />
      <Input
        placeholder="Your location"
        startDecorator={
          <Button variant="soft" color="neutral" startDecorator={<LocationOn/>}>
            Locate
          </Button>
        }
        sx={{ width: 300 }}
      /> */}
        {/* {raute && refDialog.current.close()} */}
    </div>
     
>>>>>>> ef9fa70721cd9013739de9d55184d1f9a325e648
}