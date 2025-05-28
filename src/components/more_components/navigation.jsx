import React, { use, useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Box, 
  Divider, 
  Avatar, 
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ListAltIcon from '@mui/icons-material/ListAlt';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, useParams } from 'react-router-dom';

import ExploreIcon from '@mui/icons-material/Explore';

import './navigation.css';


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
              color: '#bf2263',
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
export const Navigation = ({ managerId, managerName }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const param= useParams();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { text: 'להזמנה', icon: <ListAltIcon />, path: `/manager/${param.mid}/newOrder` },
    { text: 'הסטורית הזמנות', icon: <WorkHistoryIcon />, path: `/manager/${param.mid}/myOrders` },
    { text: 'יומן', icon: <EditCalendarIcon />, path: `/manager/${param.mid}/month` },
    { text: ' לקוחות', icon: <HourglassBottomIcon />, path: `/manager/${param.id}/myCustomers` },
    { text: 'עלינו', icon: <HowToRegIcon />, path: `/about` },
  ];
  
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const handleLogout = () => {
    // Implement logout logic here
    navigate('/');
  };

  const drawerContent = (
    <Box className="drawer-content" role="presentation">
      <Box className=" #b60557">
        <Avatar className="user-avatar">
          {managerName ? managerName.charAt(0).toUpperCase() : 'U'}
        </Avatar>
        <Typography variant="h6" className="user-name">
          {managerName || 'משתמש'}
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            onClick={() => handleNavigation(item.path)}
            className="drawer-list-item"
          >
            <ListItemIcon className="drawer-list-icon">
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => handleNavigation(`/profile/${managerId}`)} className="drawer-list-item">
          <ListItemIcon className="drawer-list-icon">
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="פרופיל" />
        </ListItem>
        <ListItem button onClick={handleLogout} className="drawer-list-item logout">
          <ListItemIcon className="drawer-list-icon">
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="התנתקות" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" className="app-bar">
        <Toolbar>
          <IconButton
            edge="start"
            color="white"
            size='large'
            aria-label="menu"
            onClick={toggleDrawer(true)}
            className="menu-button"
          >
            <MenuIcon />
          </IconButton>
          {/* <Box className="app-bar-logo" onClick={() => navigate(`/home/${managerId}`)}>
            <Logo size="small" />
           </Box> */}
         {/* <Box className="header-section">
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
              borderRadius: '4px',
              alignSelf: 'center'
            }
          }}
        >
          ברוכים הבאים למשרד הדיגיטלי
        </Typography>
        <br />
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
        
       </Box> */
       }
       <Box 
        className="header-sec"
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
        
        
        
      </Box>
     
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        className="navigation-drawer"
      >
        {drawerContent}
      </Drawer>
    </>
  );
};
