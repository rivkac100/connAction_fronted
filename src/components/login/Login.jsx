import { useEffect, useState } from "react";
import "./login.css"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { managersFetchThunk } from "../../store/slices/managers/managersFetch";
// import { Button } from "@mui/material";
// import DeleteIcon from '@mui/icons-material/Delete';
// import SendIcon from '@mui/icons-material/Send';
// import Stack from '@mui/material/Stack';

export const Login = () => {
  const [manager, setManager] = useState({ name: "", email: "" });
  const dispatch = useDispatch();
  const managers= useSelector(state=>state.manager.managers)
  const [newManager, setNewManager] = useState(false)
  const navigate = useNavigate();
  //const route = useSelector(state => state.user.route)
  useEffect(() => {
    dispatch(managersFetchThunk());
    console.log(managers);
    // refDialog.current.showModal();
  }, []);
  // useEffect(() => {
  // },[]);


  const existing = () => {
    debugger
    if (managers) {
      console.log(managers.find(x => x.managerEmail === manager.email && x.managerName === manager.name));
      let c = managers.find(x => x.managerEmail === manager.email && x.managerName === manager.name);
      console.log(c);
      let id = c?.id;
      if (!c) {
        setNewManager(true)
      }
      else {
        setNewManager(false);
        navigate(`/home/${id}`);

      }

      //dispatch(findCustomerThunk({instituteId:id }));
      //  navigate("/home") 
    }
  }
  return <div className="inDiv" >
    <input className="logBut" type="text" value={manager.name} placeholder="insert name" onChange={(e) => setManager({ ...manager, name: e.target.value })} />
    <br />
    <br />
    <input className="logBut" type="email" value={manager.email} placeholder="insert email" onChange={(e) => setManager({ ...manager, email: e.target.value })} />
    <br />
    <button className="login" onClick={() => { existing() }}>log in</button><br /><br />
    <a onClick={() => setNewManager(true)}>first visit? log on</a>
    {/* {route && navigate(route)} */}
    {newManager && navigate("/newManager")}
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
