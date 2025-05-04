import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Box, Container, Paper, Typography, Button, TextField,
  Tab, Tabs, InputAdornment, IconButton, ThemeProvider, 
  createTheme, CssBaseline
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Icons
import {
  Person as PersonIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  Business as BusinessIcon
} from '@mui/icons-material';

import "./start.css";

// יצירת ערכת נושא מותאמת אישית
const theme = createTheme({
  palette: {
    primary: {
      main: '#00bcd4', // תורכיז במקום כתום
      light: '#4dd0e1',
      dark: '#0097a7',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#333333', // שחור/אפור כהה
      light: '#555555',
      dark: '#111111',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8f8f8',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Heebo", "Roboto", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: '2.2rem',
    },
    subtitle1: {
      fontSize: '1.1rem',
    },
    button: {
      fontWeight: 600,
      fontSize: '1.1rem',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          padding: '12px 24px',
          minHeight: '56px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: '1.1rem',
          minHeight: '56px',
        },
        input: {
          padding: '16px 14px',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: '1.1rem',
          minHeight: '72px',
        },
      },
    },
  },
});

// סטיילינג מותאם אישית לקומפוננטות
const LoginContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  padding: theme.spacing(4),
  direction: 'rtl',
}));

const LoginCard = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: '550px', // הגדלה משמעותית
  padding: theme.spacing(6), // הגדלה משמעותית
  borderRadius: theme.shape.borderRadius * 1.5,
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  zIndex: 1,
  textAlign: 'center',
  borderTop: `5px solid ${theme.palette.primary.main}`,
}));

const LoginForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4), // הגדלה משמעותית
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const LoginButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  height: '60px', // הגדלה משמעותית
  fontSize: '1.2rem',
}));

const FooterLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(4),
  marginTop: theme.spacing(4),
}));

export const Start = () => {
  const navigate = useNavigate();
  
  // State for tab selection (admin/customer)
  const [tabValue, setTabValue] = useState(0);
  
  // State for form inputs
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    instituteId: ""
  });
  
  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setError("");
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (tabValue === 0) { // Admin login
      if (!formData.username || !formData.password) {
        setError("נא למלא שם משתמש וסיסמה");
        return;
      }
    } else { // Customer login
      if (!formData.instituteId || !formData.email) {
        setError("נא למלא מזהה מוסד ואימייל");
        return;
      }
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (tabValue === 0) {
        // Admin login logic
        if (formData.username === "admin" && formData.password === "admin") {
          navigate("/customers");
        } else {
          setError("שם משתמש או סיסמה שגויים");
        }
      } else {
        // Customer login logic
        navigate("/home");
      }
    } catch (err) {
      setError("אירעה שגיאה בהתחברות. נסה שוב מאוחר יותר.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LoginContainer>
        {/* אלמנטים דקורטיביים */}
        <div className="decorative-circle"></div>
        
        {/* כרטיס התחברות */}
        <LoginCard elevation={3}>
          <Typography variant="h4" gutterBottom>
            ברוכים הבאים
          </Typography>
          
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            מערכת הזמנת תוכניות והפקות
          </Typography>
          
          {/* לשוניות */}
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ mb: 4, mt: 3 }}
          >
            <Tab 
              icon={<AdminPanelSettingsIcon sx={{ fontSize: 28 }} />} 
              label="מנהל" 
              iconPosition="start"
              sx={{ fontSize: '1.1rem' }}
            />
            <Tab 
              icon={<BusinessIcon sx={{ fontSize: 28 }} />} 
              label="לקוח" 
              iconPosition="start"
              sx={{ fontSize: '1.1rem' }}
            />
          </Tabs>
          
          {/* טופס התחברות */}
          <LoginForm onSubmit={handleSubmit}>
            {tabValue === 0 ? (
              // טופס מנהל
              <>
                <TextField
                  name="username"
                  label="שם משתמש"
                  variant="outlined"
                  fullWidth
                  value={formData.username}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ fontSize: 24 }} />
                      </InputAdornment>
                    ),
                  }}
                />
                
                <TextField
                  name="password"
                  label="סיסמה"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  fullWidth
                  value={formData.password}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ fontSize: 24 }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          edge="end"
                          aria-label="toggle password visibility"
                          size="large"
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </>
            ) : (
              // טופס לקוח
              <>
                <TextField
                  name="instituteId"
                  label="מזהה מוסד"
                  variant="outlined"
                  fullWidth
                  value={formData.instituteId}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BusinessIcon sx={{ fontSize: 24 }} />
                      </InputAdornment>
                    ),
                  }}
                />
                
                <TextField
                  name="email"
                  label="אימייל"
                  type="email"
                  variant="outlined"
                  fullWidth
                  value={formData.email}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ fontSize: 24 }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </>
            )}
            
            {error && (
              <Typography color="error" sx={{ mt: -1, fontSize: '1rem' }}>
                {error}
              </Typography>
            )}
            
            <LoginButton
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={isLoading}
            >
              {isLoading ? "מתחבר..." : "התחברות"}
            </LoginButton>
          </LoginForm>
          
          <FooterLinks>
            <Button variant="text" color="secondary" size="large">שכחתי סיסמה</Button>
            <Button variant="text" color="secondary" size="large">צור קשר</Button>
          </FooterLinks>
        </LoginCard>
      </LoginContainer>
    </ThemeProvider>
  );
};
