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
import { 
  Button, Container, Typography, Box, Card, CardContent, CardMedia, 
  Chip, Avatar, Paper, Divider, IconButton, Tooltip, useMediaQuery, useTheme
} from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import InfoIcon from '@mui/icons-material/Info';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import ExploreIcon from '@mui/icons-material/Explore';
import EmailIcon from '@mui/icons-material/Email';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { managersFetchThunk } from '../../store/slices/managers/managersFetch';
import './home.css';

// קומפוננטת לוגו מודרנית עם אנימציה
const ModernLogo = ({ size = 'medium' }) => {
  const sizeMap = {
    small: { width: 120, height: 40, fontSize: '1rem', iconSize: 24 },
    medium: { width: 180, height: 60, fontSize: '1.5rem', iconSize: 32 },
    large: { width: 240, height: 80, fontSize: '2rem', iconSize: 40 }
  };
  
  const { width, height, fontSize, iconSize } = sizeMap[size];
  
  return (
    <Box 
      className="modern-logo" 
      sx={{
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        animation: 'fadeIn 1s ease-in-out'
      }}
    >
      <Box 
        className="logo-container" 
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <Box 
          className="logo-icon-container"
          sx={{
            bgcolor: 'rgba(175, 34, 99, 0.9)',
            borderRadius: '50%',
            width: iconSize * 1.5,
            height: iconSize * 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(175, 34, 99, 0.4)',
            animation: 'pulse 2s infinite'
          }}
        >
          <ExploreIcon 
            sx={{ 
              fontSize: iconSize,
              color: 'white',
              animation: 'spin 10s linear infinite'
            }} 
          />
        </Box>
        <Box 
          className="logo-text"
          sx={{
            display: 'flex',
            fontFamily: '"Poppins", "Heebo", sans-serif',
            fontWeight: 700,
            letterSpacing: 1
          }}
        >
          <Typography 
            className="logo-text-primary" 
            sx={{ 
              fontSize,
              color: '#333',
              mr: 0.5
            }}
          >
            Pro
          </Typography>
          <Typography 
            className="logo-text-secondary" 
            sx={{ 
              fontSize,
              color: '#af2263',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -2,
                left: 0,
                width: '100%',
                height: 3,
                bgcolor: '#af2263',
                borderRadius: 4
              }
            }}
          >
            Event
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

// קומפוננטת כפתור ניווט מודרנית
const NavButton = ({ icon, label, onClick, variant = "primary" }) => {
  const variantStyles = {
    primary: {
      bgcolor: '#af2263',
      '&:hover': {
        bgcolor: '#8e0443',
        transform: 'translateY(-5px)'
      }
    },
    secondary: {
      bgcolor: '#333',
      '&:hover': {
        bgcolor: '#555',
        transform: 'translateY(-5px)'
      }
    }
  };
  
  return (
    <Button
      variant="contained"
      startIcon={icon}
      onClick={onClick}
      fullWidth
      sx={{
        py: 1.5,
        px: 3,
        borderRadius: 2,
        fontWeight: 600,
        textTransform: 'none',
        fontSize: '1rem',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        ...variantStyles[variant]
      }}
    >
      {label}
    </Button>
  );
};

// קומפוננטת כרטיס מנהל מודרנית
const ManagerCard = ({ manager, onClick }) => {
  return (
    <Card 
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        border: '1px solid rgba(0,0,0,0.08)',
        '&:hover': {
          transform: 'translateY(-10px)',
          boxShadow: '0 20px 30px rgba(0,0,0,0.1)',
          '& .card-media': {
            transform: 'scale(1.05)'
          }
        }
      }}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="200"
          image={`https://localhost:7044/img/${manager.imgPath}`}
          alt={manager.compName}
          className="card-media"
          sx={{ 
            transition: 'transform 0.5s ease',
            objectFit: 'cover'
          }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=תמונה+לא+זמינה';
          }}
        />
        <Box 
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.7) 100%)'
          }}
        />
        <Chip 
          label={manager.kategoty} 
          icon={<VerifiedIcon sx={{ fontSize: 16 }} />}
          sx={{ 
            position: 'absolute', 
            top: 16, 
            right: 16,
            bgcolor: '#af2263',
            color: 'white',
            fontWeight: 'bold',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            '& .MuiChip-icon': {
              color: 'white'
            }
          }}
        />
        <Box 
          sx={{ 
            position: 'absolute',
            bottom: -30,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2
          }}
        >
          <Avatar 
            src={`https://localhost:7044/img/${manager.imgPath}`}
            sx={{ 
              width: 80,
              height: 80,
              border: '4px solid white',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
            }}
          />
        </Box>
      </Box>
      
      <CardContent 
        sx={{ 
          pt: 5,
          px: 3,
          pb: 3,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography 
          variant="h5" 
          sx={{ 
            textAlign: 'center',
            fontWeight: 'bold',
            mb: 1,
            color: '#333',
            fontSize: { xs: '1.2rem', md: '1.4rem' }
          }}
        >
          {manager.compName}
        </Typography>
        
        <Divider sx={{ my: 2, width: '40%', mx: 'auto', borderColor: '#af2263' }} />
        
        <Typography 
          variant="body2" 
          sx={{ 
            textAlign: 'center',
            mb: 3,
            color: '#666',
            flexGrow: 1,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            textOverflow: 'ellipsis'
          }}
        >
          {manager.description}
        </Typography>
        
        <Box 
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
            gap: 1
          }}
        >
          <EmailIcon sx={{ color: '#af2263', fontSize: 18 }} />
          <Typography 
            variant="body2" 
            sx={{ color: '#666' }}
          >
            {manager.managerEmail}
          </Typography>
        </Box>
        
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={onClick}
          sx={{ 
            mt: 'auto',
            bgcolor: '#af2263',
            '&:hover': {
              bgcolor: '#8e0443'
            },
            borderRadius: 8,
            py: 1,
            textTransform: 'none',
            fontWeight: 'bold'
          }}
        >
          צפה בפעילויות
        </Button>
      </CardContent>
    </Card>
  );
};

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
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
    <Box 
      className="home-container"
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #f8f9fa 100%)',
        pb: 8
      }}
    >
      {/* Header Section */}
      <Box 
        className="header-section"
        sx={{
          pt: { xs: 4, md: 6 },
          pb: { xs: 4, md: 6 },
          px: { xs: 2, sm: 4, md: 6 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            background: 'radial-gradient(circle at top right, rgba(175, 34, 99, 0.08), transparent 70%)',
            zIndex: -1
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <ModernLogo size="large" />
        </Box>
     
        <Typography 
          variant="h2" 
          className="welcome-title"
          sx={{
            fontWeight: 800,
            color: '#333',
            mb: 2,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            position: 'relative',
            display: 'inline-block',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -10,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '4px',
              bgcolor: '#af2263',
              borderRadius: '4px'
            }
          }}
        >
          ברוכים הבאים למשרד הדיגיטלי
        </Typography>
        
        <Typography 
          variant="h6" 
          className="welcome-subtitle"
          sx={{
            color: '#666',
            maxWidth: '800px',
            mx: 'auto',
            mb: 6,
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}
        >
          נהל את האירועים והפעילויות שלך בצורה חכמה ויעילה עם הפלטפורמה המתקדמת שלנו
        </Typography>
     
        {/* Navigation Buttons - Only show if not viewing managers */}
        
          <Box 
            className="navigation-section"
            sx={{
              maxWidth: '1200px',
              mx: 'auto',
              mb: 6
            }}
          >
            <Box 
              sx={{ 
                display: 'grid',
                gridTemplateColumns: { 
                  xs: '1fr', 
                  sm: 'repeat(2, 1fr)', 
                  md: isM !== -1 ? 'repeat(5, 1fr)' : 'repeat(4, 1fr)' 
                },
                gap: 2
              }}
            >
              <Box>
                <NavButton 
                  icon={<ListAltIcon />} 
                  label="הזמנה חדשה" 
                  onClick={() =>{setView(false);navigate(`newOrder`)}}
                />
              </Box>
              
              <Box>
                <NavButton 
                  icon={<WorkHistoryIcon />} 
                  label="היסטוריית הזמנות" 
                  onClick={() => {setView(false);navigate(`myOrders`)}}
                />
              </Box>
              
              <Box>
                <NavButton 
                  icon={<InfoIcon />} 
                  label="אודותינו" 
                  onClick={() => navigate(`/about`)}
                  variant="secondary"
                />
              </Box>
              
              {isM !== -1 && (
                <Box>
                  <NavButton 
                    icon={<EditCalendarIcon />} 
                    label="יומן אירועים" 
                    onClick={() => navigate(`month`)}
                    variant="secondary"
                  />
                </Box>
              )}
              
              <Box>
                <NavButton  
                  icon={<ExploreIcon />} 
                  label="פעילויות וטיולים" 
                  onClick={() => { setView(false); navigate(`activities`); }}
                />
              </Box>
            </Box>
          </Box>
        
      </Box>
     
      {/* Managers Grid */}
      <Container maxWidth="xl">
 
        <Box className="content-area">
          {view && (
            <Box className="managers-section">
              <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography 
                  variant="h4" 
                  className="section-title"
                  sx={{
                    fontWeight: 700,
                    color: '#333',
                    mb: 2,
                    position: 'relative',
                    display: 'inline-block',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -10,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '60px',
                      height: '3px',
                      bgcolor: '#af2263',
                      borderRadius: '3px'
                    }
                  }}
                >
                  הספקים המקצועיים שלנו
                </Typography>
                
                <Typography 
                  variant="body1"
                  sx={{
                    color: '#666',
                    maxWidth: '800px',
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  אנו מציעים מגוון רחב של ספקים מקצועיים לבחירתך, כל אחד מומחה בתחומו
                </Typography>
              </Box>
              
              {/* Grid עם 5 כרטיסים בשורה */}
              <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',                    // מסך קטן מאוד - כרטיס אחד בשורה
                  sm: 'repeat(2, 1fr)',         // מסך קטן - 2 כרטיסים בשורה
                  md: 'repeat(3, 1fr)',         // מסך בינוני - 3 כרטיסים בשורה
                  lg: 'repeat(5, 1fr)'          // מסך גדול - 5 כרטיסים בשורה
                },
                gap: { xs: 3, md: 2 },
                mt: 4
              }}>
                {managers.map((manager, index) => (
                  <ManagerCard 
                    key={manager.id} 
                    manager={manager}
                    onClick={() => {
                      setView(false);
                      navigate(`activities/${manager.id}`);
                    }}
                  />
                ))}
              </Box>
              
              {/* אם אין מנהלים, הצג הודעה */}
              {(!managers || managers.length === 0) && (
                <Paper 
                  elevation={0}
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    borderRadius: 4,
                    bgcolor: 'rgba(255,255,255,0.8)',
                    border: '1px dashed #ccc'
                  }}
                >
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    אין ספקים זמינו כרגע
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    נסה לרענן את הדף או לחזור מאוחר יותר
                  </Typography>
                </Paper>
              )}
            </Box>
          )}
          {!view &&
          <Outlet />}
        </Box> 
       
      </Container>
     
      
      {/* CSS גלובלי לאנימציות */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .home-container {
          animation: fadeIn 0.5s ease-in-out;
        }
        
        .manager-card {
          animation: fadeIn 0.5s ease-in-out;
          animation-fill-mode: both;
        }
        
        .manager-card:nth-child(1) { animation-delay: 0.1s; }
        .manager-card:nth-child(2) { animation-delay: 0.2s; }
        .manager-card:nth-child(3) { animation-delay: 0.3s; }
        .manager-card:nth-child(4) { animation-delay: 0.4s; }
        .manager-card:nth-child(5) { animation-delay: 0.5s; }
        .manager-card:nth-child(6) { animation-delay: 0.6s; }
        .manager-card:nth-child(7) { animation-delay: 0.7s; }
        .manager-card:nth-child(8) { animation-delay: 0.8s; }
        .manager-card:nth-child(9) { animation-delay: 0.9s; }
        .manager-card:nth-child(10) { animation-delay: 1s; }
      `}</style>
    </Box>
  );
};
