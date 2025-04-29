import { useEffect, useState } from "react";
import "./login.css"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { customersFetchThunk } from "../../store/slices/customersFetch";
// import { Button } from "@mui/material";
// import DeleteIcon from '@mui/icons-material/Delete';
// import SendIcon from '@mui/icons-material/Send';
// import Stack from '@mui/material/Stack';

export const Login = () => {
  const [customer, setCustomer] = useState({ name: "", email: "" });
  const dispatch = useDispatch();
  const customers = useSelector(state => state.customer.customers)
  const [newCustomer, setNewCustomer] = useState(false)
  const navigate = useNavigate();
  //const route = useSelector(state => state.user.route)
  useEffect(() => {
    dispatch(customersFetchThunk());
    console.log(customers);
    // refDialog.current.showModal();
  }, []);
  // useEffect(() => {
  // },[]);


  const existing = () => {
    debugger
    if (customers) {
      console.log(customers.find(x => x.email === customer.email && x.instituteName === customer.name));
      let c = customers.find(x => x.email === customer.email && x.instituteName === customer.name);
      console.log(c);
      let id = c?.instituteId;
      if (!c) {
        setNewCustomer(true)
      }
      else {
        setNewCustomer(false);
        navigate(`/home/${id}`);

      }

      //dispatch(findCustomerThunk({instituteId:id }));
      //  navigate("/home") 
    }
  }
  return <div className="inDiv" >
    <input className="logBut" type="text" value={customer.name} placeholder="insert name" onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
    <br />
    <br />
    <input className="logBut" type="email" value={customer.email} placeholder="insert email" onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />
    <br />
    <button className="login" onClick={() => { existing() }}>log in</button><br /><br />
    <a onClick={() => setNewCustomer(true)}>first visit? log on</a>
    {/* {route && navigate(route)} */}
    {newCustomer && navigate("/newCustomer")}
    {/*  <Stack direction="row" spacing={4}>
      <Button variant="contained" startIcon={<DeleteIcon />}>
        Delete
      </Button>
      <Button variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>
      <Button variant="contained" startIcon={<DeleteIcon />}>
        Delete
      </Button>
      <Button variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>
    </Stack> */}


  </div>
}
