import { use, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
// import { customersFetchThunk } from "../../store/slices/customers/customersFetch";
// import { managersFetchThunk } from "../../store/slices/managers/managersFetch";

// Icons
import {
  Person as PersonIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  Business as BusinessIcon,

  Email as EmailIcon,
  Google as GoogleIcon,
  Facebook as FacebookIcon
} from '@mui/icons-material';

import "./auto.css";
import { editIsC } from "../../store/slices/customers/customersSlice";
import { editIsM } from "../../store/slices/managers/managersSlice";
import { findUserByPassId } from "../../store/slices/users/findUserByPassId";
// import { managersFetchThunkById } from "../../store/slices/managers/managerFetchThunkById";
// import { t } from "framer-motion/dist/types.d-DSjX-LJB";

export const Start = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [view, setView] = useState(true);

  // State for tab selection (admin/customer)
  const [tabValue, setTabValue] = useState(0);

  // State for form inputs
  const [formData, setFormData] = useState({

    password: "",

  });


  // const managers = useSelector(state => state.manager.managers);
  // const customers = useSelector(state => state.customer.customers);
  const user = useSelector(state => state.user.myUser);
  const isMng = useSelector(state => state.manager.isM);
  const isCst = useSelector(state => state.customer.isC);

  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState(false);

  useEffect(() => {
    dispatch(editIsC(-1))
    dispatch(editIsM(-1))
  }, [])


  // useEffect(() => {
  //   if (tabValue === 1) {
  //     if (customers?.length === 0) dispatch(customersFetchThunk());
  //   }
  //   else if (tabValue === 0) {
  //     if (managers?.length === 0) dispatch(managersFetchThunk());
  //   }
  // }, [tabValue]);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);


    setError("");
  };

  const check = () => {


    setIsLoading(true);


    setTimeout(async () => {
      debugger
      await dispatch(findUserByPassId({ pass: formData.password }));
      // const c= JSON.parse( sessionStorage.getItem('customers'));
      // const customer = c?.find(customer => customer.email === formData.email);
      // const manager = managers.find(manager => manager.id ===parseInt(formData.password));
      debugger
      console.log(user);

      if (user) {
        if (user.userType === "manager"){
          navigate(`/manager/${user.id}`);
        }
        else if (user.userType === "customer"){
          navigate(`/home/${user.instituteId}`);
        }
      }
      else {
        setError("המשתמש אינו קיים");
        setIsLoading(false);
        setNewUser(true)
        return;
      }
    }, 1000); // סימולציה של זמן טעינה
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user types
    if (error) setError("");
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    check();
  };

  return (

    <div className="auth-dialog login-dialog" style={{ position: 'fixed', margin: 'auto', top: '10%', right: '25%' }}>
      {view && <div className="auth-container">
        <div className="auth-header">
          <h2 className="auth-title">ברוכים הבאים</h2>
          <button className="close-button" onClick={() => navigate('/')} aria-label="סגור">×</button>
        </div>

        <div className="auth-content">
          <div className="logo-container1">
            <img src={process.env.PUBLIC_URL + "/start.jpg"} alt="לוגו המערכת" className="auth-logo" />
          </div>

          <div className="form-container">
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>

              <p style={{ color: '#666', marginBottom: '20px', fontSize: '1.1rem' }}>
                מערכת הזמנת תוכניות והפקות

              </p>

              {/* לשוניות */}
              {/* <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <div
                  onClick={() => handleTabChange(null, 0,)}
                  style={{
                    padding: '10px 20px',
                    cursor: 'pointer',
                    backgroundColor: tabValue === 0 ? '#b60557' : '#f1f1f1',
                    color: tabValue === 0 ? 'white' : '#666',
                    borderRadius: '8px 0 0 8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',

                    transition: 'all 0.3s ease',
                    fontWeight: tabValue === 0 ? '600' : 'normal'
                  }}
                >

                  <AdminPanelSettingsIcon style={{ fontSize: '1.2rem' }} />
                  <span>מנהל</span>
                </div>
                <div
                  onClick={() => handleTabChange(null, 1,)}
                  style={{
                    padding: '10px 20px',
                    cursor: 'pointer',
                    backgroundColor: tabValue === 1 ? '#b60557' : '#f1f1f1',
                    color: tabValue === 1 ? 'white' : '#666',
                    borderRadius: '0 8px 8px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',

                    transition: 'all 0.3s ease',
                    fontWeight: tabValue === 1 ? '600' : 'normal'
                  }}
                >

                  <BusinessIcon style={{ fontSize: '1.2rem' }} />
                  <span>לקוח</span>
                </div>
              </div> */}
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <>
                {/* <div className="input-group">
                    <div className="input-icon">
                      <PersonIcon />
                    </div>
                    <input
                      type="text"
                      name="username"
                      className="auth-input"
                      placeholder="שם משתמש"
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                  </div> */}

                <div className="input-group">
                  <div className="input-icon">
                    <LockIcon />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="auth-input"
                    placeholder="סיסמה"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </button>
                </div>
              </>


              <div className="remember-me">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">זכור אותי</label>
              </div>
              {newUser &&
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                  <button
                    type="submit"
                    className="auth-button"
                    style={{width:"55%"}}
                    onClick={() => navigate("logon")}

                  >                  
                      לקוח חדש             
                  </button>
                  <button
                    type="submit"
                    className="auth-button"
                    style={{width:"55%",marginLeft:"10px"}}
                    onClick={() => navigate("logonManager")}
                  >

                    {/* <div className="loader"></div> */}
                    מנהל חדש
                  </button>
                </div>
              }
              <button
                type="submit"
                className="auth-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="loader"></div>
                ) : (
                  "התחברות"
                )}
              </button>
            </form>

            <div className="auth-links">
              <button className="link-button forgot-password">
                שכחתי סיסמה
              </button>
            </div>
           
            {/* <div className="social-login">
              <span className="social-login-text">או התחבר באמצעות</span>
            </div>
            
            <div className="social-buttons">


              <div className="social-button google">
                <GoogleIcon style={{ fontSize: '1.2rem' }} />
              </div>
              <div className="social-button facebook">
                <FacebookIcon style={{ fontSize: '1.2rem' }} />
              </div>
            </div> */}
          </div>
        </div>
      </div>}
      <Outlet />
    </div>
  );
};