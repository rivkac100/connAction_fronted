// import { useEffect, useState } from "react";
// import "./login.css"
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { managersFetchThunk } from "../../store/slices/managers/managersFetch";
// // import { Button } from "@mui/material";
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import SendIcon from '@mui/icons-material/Send';
// // import Stack from '@mui/material/Stack';

// export const Login = () => {
//   const [manager, setManager] = useState({ name: "", email: "" });
//   const dispatch = useDispatch();
//   const managers= useSelector(state=>state.manager.managers)
//   const [newManager, setNewManager] = useState(false)
//   const navigate = useNavigate();
//   //const route = useSelector(state => state.user.route)
//   useEffect(() => {
//     dispatch(managersFetchThunk());
//     console.log(managers);
//     // refDialog.current.showModal();
//   }, []);
//   // useEffect(() => {
//   // },[]);


//   const existing = () => {
//     debugger
//     if (managers) {
//       console.log(managers.find(x => x.managerEmail === manager.email && x.managerName === manager.name));
//       let c = managers.find(x => x.managerEmail === manager.email && x.managerName === manager.name);
//       console.log(c);
//       let id = c?.id;
//       if (!c) {
//         setNewManager(true)
//       }
//       else {
//         setNewManager(false);
//         navigate(`/home/${id}`);

//       }

//       //dispatch(findCustomerThunk({instituteId:id }));
//       //  navigate("/home") 
//     }
//   }
//   return <div className="inDiv" >
//     <input className="logBut" type="text" value={manager.name} placeholder="insert name" onChange={(e) => setManager({ ...manager, name: e.target.value })} />
//     <br />
//     <br />
//     <input className="logBut" type="email" value={manager.email} placeholder="insert email" onChange={(e) => setManager({ ...manager, email: e.target.value })} />
//     <br />
//     <button className="login" onClick={() => { existing() }}>log in</button><br /><br />
//     <a onClick={() => setNewManager(true)}>first visit? log on</a>
//     {/* {route && navigate(route)} */}
//     {newManager && navigate("/newManager")}
//     {/*  <Stack direction="row" spacing={4}>
//       <Button variant="contained" startIcon={<DeleteIcon />}>
//         Delete
//       </Button>
//       <Button variant="contained" endIcon={<SendIcon />}>
//         Send
//       </Button>
//       <Button variant="contained" startIcon={<DeleteIcon />}>
//         Delete
//       </Button>
//       <Button variant="contained" endIcon={<SendIcon />}>
//         Send
//       </Button>
//     </Stack> */}


//   </div>
// }

import { useEffect, useState } from "react";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { managersFetchThunk } from "../../store/slices/managers/managersFetch";
import { 
  Container, 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  Link,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import { Logo } from '../logoDesign/logo';


export const Login = () => {
  const [manager, setManager] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const managers = useSelector(state => state.manager.managers);
  const [newManager, setNewManager] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(managersFetchThunk());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // Validate inputs
    if (!manager.name.trim() || !manager.email.trim()) {
      setError("יש למלא את כל השדות");
      setLoading(false);
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(manager.email)) {
      setError("כתובת אימייל לא תקינה");
      setLoading(false);
      return;
    }
    
    setTimeout(() => {
      existing();
      setLoading(false);
    }, 800); // Simulating network request
  };

  const existing = () => {
    if (managers) {
      const foundManager = managers.find(
        x => x.managerEmail === manager.email && x.managerName === manager.name
      );
      
      if (!foundManager) {
        setError("המשתמש לא נמצא במערכת");
        setNewManager(true);
      } else {
        setNewManager(false);
        navigate(`/home/${foundManager.id}`);
      }
    }
  };

  return (
    <Container maxWidth="sm" className="login-container">
      <Paper elevation={3} className="login-paper">
        <Box className="login-box">
          <Box className="login-header">
            <Logo />
            <Typography variant="h5" component="h1" className="login-title">
              כניסה למשרד הדיגיטלי
            </Typography>
          </Box>
          
          <form onSubmit={handleSubmit} className="login-form">
            <TextField
              fullWidth
              label="שם"
              variant="outlined"
              value={manager.name}
              onChange={(e) => setManager({ ...manager, name: e.target.value })}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              required
            />
            
            <TextField
              fullWidth
              label="אימייל"
              type="email"
              variant="outlined"
              value={manager.email}
              onChange={(e) => setManager({ ...manager, email: e.target.value })}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              required
            />
            
            {error && (
              <Typography color="error" variant="body2" className="error-message">
                {error}
              </Typography>
            )}
            
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              className="login-button"
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
              disabled={loading}
            >
              {loading ? "מתחבר..." : "התחברות"}
            </Button>
          </form>
          
          <Box className="login-footer">
            <Link 
              component="button" 
              variant="body2" 
              onClick={() => navigate("/newManager")} 
              className="signup-link"
            >
              משתמש חדש? הירשם עכשיו
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};
