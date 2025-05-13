/**
 * Home Component Documentation
 * 
 * @description
 * This is the main landing page component for a digital office/service booking application.
 * It provides a responsive, user-friendly interface with navigation buttons for different functionalities.
 * 
 * @features
 * - Responsive design using Material-UI Grid and Stack components
 * - Conditional rendering based on user roles (customer/manager)
 * - Navigation buttons for various actions:
 *   1. New Order
 *   2. Order History
 *   3. About Us
 *   4. Calendar (for managers)
 *   5. Activities/Trips
 * 
 * @dependencies
 * - React Router (useNavigate, useParams, Outlet)
 * - Redux (useDispatch, useSelector)
 * - Material-UI components
 * - Custom Logo component
 * 
 * @state
 * - Uses Redux selectors to manage user roles and events
 * - Dispatches eventFetchThunk on component mount
 * 
 * @styling
 * - Responsive layout with mobile and desktop views
 * - Uses a clean, modern design with black, white, and accent colors
 * - Utilizes Material-UI's responsive design system
 * 
 * @navigation
 * Buttons navigate to different routes:
 * - /newOrder
 * - /myOrders
 * - /month (manager only)
 * - /activites
 * 
 * @accessibility
 * - Icons accompany each navigation button
 * - Responsive design ensures usability across devices
 */
// No changes needed as the selection was empty and the instruction was in Hebrew which translates to "Continue, this looks good!!!!"

// The existing code documentation in the file already provides comprehensive details about the Home component
// import { Outlet, useNavigate, useParams } from 'react-router-dom'
// import './home.css'
// import { Button, Stack } from '@mui/material';
// //import { Button } from "@mui/material";
// import DeleteIcon from '@mui/icons-material/Delete';
// import SendIcon from '@mui/icons-material/Send';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { eventFetchThunk } from '../../store/slices/events/eventFetchThunk';
// //import Stack from '@mui/material/Stack';
// import { useSelector } from 'react-redux';
// import ListAltIcon from '@mui/icons-material/ListAlt';
// import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
// import HowToRegIcon from '@mui/icons-material/HowToReg';
// import EditCalendarIcon from '@mui/icons-material/EditCalendar';
// import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

// export const Home = () => {

//   const navigate = useNavigate();
//   const dispatch=useDispatch()
//   const event =useSelector(state=>state.events.events);
//   const params = useParams();
//   const id = params.id;

//   useEffect(()=>{
//   dispatch(eventFetchThunk())
//   },[])


//   return <div>
//     {/* <button type="text" >להזמנה</button>
// <button type="text" onClick={()=>navigate(`/myOrders/${id}`)}>הסטורית הזמנות</button>
// <button type="text">.........עלינו</button>
// <button type="text">להזמנות הקרובות שלך</button>
// <button type="text">יומן </button> */}
//     <Stack direction="row" spacing={5}>
//       <Button variant="contained" className='button' onClick={()=>navigate(`newOrder`)} endIcon={<ListAltIcon />}>
//         להזמנה
//       </Button>
//       <Button variant="contained" className='button'  endIcon={<WorkHistoryIcon />} onClick={() => navigate(`myOrders`)}>
//         הסטורית הזמנות
//       </Button>
//       <Button variant="contained" className='button' endIcon={<HowToRegIcon />}>
//         .....עלינו
//       </Button>
//       <Button variant="contained" className='button' endIcon={<EditCalendarIcon />} onClick={() => navigate(`month`)}>
//         יומן
//       </Button>
//       <Button variant="contained" className='button' endIcon={<HourglassBottomIcon />}>
//         להזמנות הקרובות שלך
//       </Button>
//     </Stack>
//     <div><Outlet></Outlet></div>
//   </div>
// }
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Typography, Box, Grid, Card, CardContent, CardMedia, Chip, Avatar } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import InfoIcon from '@mui/icons-material/Info';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import ExploreIcon from '@mui/icons-material/Explore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { managersFetchThunk } from '../../store/slices/managers/managersFetch';
import './home.css';

// חדש: קומפוננטת לוגו מודרנית בלי Framer Motion
const ModernLogo = ({ size = 'medium' }) => {
  const sizeMap = {
    small: { width: 120, height: 40, fontSize: '1rem', iconSize: 24 },
    medium: { width: 180, height: 60, fontSize: '1.5rem', iconSize: 32 },
    large: { width: 240, height: 80, fontSize: '2rem', iconSize: 40 }
  };
  
  const { width, height, fontSize, iconSize } = sizeMap[size];
  
  return (
    <div className="modern-logo" style={{ width, height }}>
      <div className="logo-container">
        <div className="logo-icon-container">
          <div className="logo-icon">
            <ExploreIcon style={{ fontSize: iconSize }} />
          </div>
        </div>
        <div className="logo-text">
          <span className="logo-text-primary" style={{ fontSize }}>Pro</span>
          <span className="logo-text-secondary" style={{ fontSize }}>Event</span>
        </div>
      </div>
    </div>
  );
};

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const managers = useSelector(state => state.manager.managers);
  const isC = useSelector(state => state.customer.isC);
  const isM = useSelector(state => state.manager.isM);
  const [view, setView] = useState(true);
  
  useEffect(() => {
    if (managers?.length === 0) {
      dispatch(managersFetchThunk());
    }
  }, []);

  return (
    <Container maxWidth={false} className="home-container">
      {/* Header Section */}
      <Box className="header-section">
        <ModernLogo size="large" />
        
        <Typography variant="h3" className="welcome-title">
          ברוכים הבאים למשרד הדיגיטלי
        </Typography>
        <Typography variant="h6" className="welcome-subtitle">
          נהל את האירועים והפעילויות שלך בצורה חכמה ויעילה
        </Typography>
      </Box>

      {/* Navigation Buttons - Only show if not viewing managers */}
      {view && (
        <Box className="navigation-section">
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <Button
                variant="contained"
                className="nav-button new-order"
                fullWidth
                onClick={() => navigate(`newOrder`)}
                startIcon={<ListAltIcon />}
              >
                הזמנה חדשה
              </Button>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <Button
                variant="contained"
                className="nav-button order-history"
                fullWidth
                onClick={() => navigate(`myOrders`)}
                startIcon={<WorkHistoryIcon />}
              >
                היסטוריית הזמנות
              </Button>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <Button
                variant="contained"
                className="nav-button about-us"
                fullWidth
                onClick={() => navigate(`/about`)}
                startIcon={<InfoIcon />}
              >
                אודותינו
              </Button>
            </Grid>
            
            {isM !== -1 && (
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <Button
                  variant="contained"
                  className="nav-button calendar"
                  fullWidth
                  onClick={() => navigate(`month`)}
                  startIcon={<EditCalendarIcon />}
                >
                  יומן אירועים
                </Button>
              </Grid>
            )}
            
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <Button
                variant="contained"
                className="nav-button activities"
                fullWidth
                onClick={() => navigate(`activities`)}
                startIcon={<ExploreIcon />}
              >
                פעילויות וטיולים
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Managers Grid */}
      <Box className="content-area">
        {view && (
          <Box className="managers-section">
            <Typography variant="h4" className="section-title">
            אנו מציעים מגוון רחב של ספקים מקצועיים לבחירתך
            </Typography>
            
            
            <Grid container spacing={3} className="managers-grid">
              {managers.map((manager, index) => (
                <Grid item xs={12} sm={6} md={4} key={manager.id}>
                  <Card className="manager-card">
                    <Box className="card-media-container">
                      <CardMedia
                        component="img"
                        height="180"
                        image={`https://localhost:7044/img/${manager.imgPath}`}
                        alt={manager.compName}
                        className="card-media"
                      />
                      {/* <Box className="card-overlay" /> */}
                      <Chip 
                        label={manager.kategoty} 
                        className="category-chip"
                        color="primary"
                      />
                    </Box>
                    
                    <CardContent className="card-content">
                      <Box className="manager-avatar-container">
                        <Avatar 
                          src={`https://localhost:7044/img/${manager.imgPath}`} 
                          className="manager-avatar"
                        />
                      </Box>
                      
                      <Typography variant="h5" className="manager-name">
                        {manager.compName}
                      </Typography>
                      
                      <Typography variant="body2" className="manager-description">
                        {manager.description}
                      </Typography>
                      
                      <Box className="manager-contact">
                        <Typography variant="body2" className="manager-email">
                          {manager.managerEmail}
                        </Typography>
                      </Box>
                      
                      <Button
                        variant="contained"
                        className="enter-button"
                        fullWidth
                        onClick={() => {
                          setView(false);
                          navigate(`activities/${manager.id}`);
                        }}
                      >
                        צפה בפעילויות
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        <Outlet />
      </Box>
    </Container>
  );
};
