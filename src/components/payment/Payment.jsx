import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, Paper, Typography, Box, TextField, Button, 
  Grid, Divider, Stepper, Step, StepLabel, Alert, Snackbar,
  FormControlLabel, Checkbox, CircularProgress
} from '@mui/material';
import {
  CreditCard as CreditCardIcon,
  CheckCircle as CheckCircleIcon,
  ArrowBack as ArrowBackIcon,
  Lock as LockIcon
} from '@mui/icons-material';
import './Payment.css';

export const Payment = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });
  
  // פרטי כרטיס אשראי
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    id: '',
    saveCard: false
  });
  
  // שגיאות ולידציה
  const [errors, setErrors] = useState({});
  
  // טעינת פרטי ההזמנה מהלוקל סטורג'
  useEffect(() => {
    // טעינת פרטי ההזמנה מהלוקל סטורג'
    const storedOrder = localStorage.getItem('pendingOrder');
    console.log('Stored order from localStorage:', storedOrder);
    
    if (storedOrder) {
      try {
        const parsedOrder = JSON.parse(storedOrder);
        setOrderDetails(parsedOrder);
        console.log('Order details loaded successfully:', parsedOrder);
      } catch (error) {
        console.error('Error parsing order details:', error);
        setSnackbar({
          open: true,
          message: 'שגיאה בטעינת פרטי ההזמנה',
          severity: 'error'
        });
        // אל תנווט חזרה במקרה של שגיאה, רק הצג הודעת שגיאה
      }
    } else {
      console.warn('No pending order found in localStorage');
      setSnackbar({
        open: true,
        message: 'לא נמצאו פרטי הזמנה',
        severity: 'warning'
      });
      // השהה את הניווט כדי לאפשר למשתמש לראות את ההודעה
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  }, [navigate]);
  
  // בדיקת תקינות מספר כרטיס אשראי (אלגוריתם Luhn)
  const validateCreditCard = (number) => {
    // הסרת רווחים ומקפים
    number = number.replace(/\s+/g, '').replace(/-/g, '');
    
    if (!/^\d+$/.test(number)) return false;
    if (number.length < 13 || number.length > 19) return false;
    
    let sum = 0;
    let double = false;
    
    // אלגוריתם Luhn
    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number.charAt(i));
      
      if (double) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      
      sum += digit;
      double = !double;
    }
    
    return sum % 10 === 0;
  };
  
  // בדיקת תקינות תאריך תפוגה
  const validateExpiry = (month, year) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // getMonth מחזיר 0-11
    
    const expYear = parseInt(year, 10) + 2000; // הנחה שהשנה היא בפורמט קצר (23 במקום 2023)
    const expMonth = parseInt(month, 10);
    
    if (isNaN(expYear) || isNaN(expMonth)) return false;
    if (expMonth < 1 || expMonth > 12) return false;
    
    // בדיקה שהתאריך לא עבר
    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;
    
    return true;
  };
  
  // בדיקת תקינות CVV
  const validateCVV = (cvv) => {
    return /^\d{3,4}$/.test(cvv);
  };
  
  // בדיקת תקינות תעודת זהות ישראלית
  const validateIsraeliID = (id) => {
    id = id.trim();
    if (!/^\d{9}$/.test(id)) return false;
    
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      let digit = parseInt(id.charAt(i), 10);
      
      if (i % 2 === 0) {
        sum += digit;
      } else {
        digit *= 2;
        if (digit > 9) digit -= 9;
        sum += digit;
      }
    }
    
    return sum % 10 === 0;
  };
  
  // בדיקת תקינות כל השדות
  const validateForm = () => {
    const newErrors = {};
    
    // בדיקת מספר כרטיס
    if (!cardDetails.cardNumber) {
      newErrors.cardNumber = 'נא להזין מספר כרטיס';
    } else if (!validateCreditCard(cardDetails.cardNumber)) {
      newErrors.cardNumber = 'מספר כרטיס לא תקין';
    }
    
    // בדיקת שם בעל הכרטיס
    if (!cardDetails.cardName) {
      newErrors.cardName = 'נא להזין שם בעל הכרטיס';
    } else if (cardDetails.cardName.length < 2) {
      newErrors.cardName = 'שם קצר מדי';
    }
    
    // בדיקת תאריך תפוגה
    if (!cardDetails.expiryMonth || !cardDetails.expiryYear) {
      newErrors.expiry = 'נא להזין תאריך תפוגה';
    } else if (!validateExpiry(cardDetails.expiryMonth, cardDetails.expiryYear)) {
      newErrors.expiry = 'תאריך תפוגה לא תקין';
    }
    
    // בדיקת CVV
    if (!cardDetails.cvv) {
      newErrors.cvv = 'נא להזין קוד אבטחה';
    } else if (!validateCVV(cardDetails.cvv)) {
      newErrors.cvv = 'קוד אבטחה לא תקין';
    }
    
    // בדיקת תעודת זהות
    if (!cardDetails.id) {
      newErrors.id = 'נא להזין תעודת זהות';
    } else if (!validateIsraeliID(cardDetails.id)) {
      newErrors.id = 'תעודת זהות לא תקינה';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // טיפול בשינויים בשדות הטופס
  const handleInputChange = (field, value) => {
    setCardDetails(prev => ({
      ...prev,
      [field]: value
    }));
    
    // ניקוי שגיאה אם קיימת
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };
  
  // פורמט מספר כרטיס אשראי עם רווחים
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  
  // שליחת התשלום
  const processPayment = () => {
    if (!validateForm()) return;
    
    setLoading(true);
    
    // סימולציה של תהליך תשלום
    setTimeout(() => {
      setLoading(false);
      setActiveStep(1);
      
      // סימולציה של תהליך אישור תשלום
      setTimeout(() => {
        setSuccess(true);
        
        // שליחת אימייל אישור (סימולציה)
        sendConfirmationEmail();
        
        // ניקוי נתוני ההזמנה מהלוקל סטורג'
        localStorage.removeItem('pendingOrder');
      }, 1500);
    }, 2000);
  };
  
  // שליחת אימייל אישור (סימולציה)
  const sendConfirmationEmail = () => {
    // בפרויקט אמיתי, כאן היינו שולחים בקשה לשרת לשליחת אימייל
    console.log('Sending confirmation email to customer');
    
    setSnackbar({
      open: true,
      message: 'אימייל אישור נשלח ללקוח',
      severity: 'success'
    });
    // בדף התשלום, אחרי תשלום מוצלח:
    localStorage.setItem('paymentStatus', 'success');

// אם המשתמש בוחר לשלם באפשרות אחרת:
     localStorage.setItem('paymentStatus', 'alternative');
  };
  
  // חזרה לדף הקודם
  const goBack = () => {
    navigate(-1);
  };
  
  // סגירת הודעת Snackbar
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  
  // מעבר לדף הבית
  const goToHome = () => {
    navigate('/');
  };
  
  if (!orderDetails) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress sx={{ color: '#b60557' }} />
      </Box>
    );
  }
  
  return (
    <Container className="payment-container">
      <Paper className="payment-paper">
        <Box className="payment-header">
          <Typography variant="h4" className="payment-title">
            תשלום עבור הזמנה
          </Typography>
          
          <Stepper activeStep={activeStep} alternativeLabel className="payment-stepper">
            <Step>
              <StepLabel>פרטי תשלום</StepLabel>
            </Step>
            <Step>
              <StepLabel>אישור תשלום</StepLabel>
            </Step>
          </Stepper>
        </Box>
        
        <Divider className="payment-divider" />
        
        {activeStep === 0 && (
          <>
            <Box className="order-summary">
              <Typography variant="h6" className="summary-title">
                פרטי ההזמנה
              </Typography>
              
              <Grid container spacing={2} className="summary-details">
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    <strong>פעילות:</strong> {orderDetails.activityName}
                  </Typography>
                  <Typography variant="body1">
                    <strong>תאריך:</strong> {orderDetails.date}
                  </Typography>
                  <Typography variant="body1">
                    <strong>שעה:</strong> {orderDetails.activeHour}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    <strong>מספר משתתפים:</strong> {orderDetails.amountOfParticipants}
                  </Typography>
                  <Typography variant="body1">
                    <strong>קוד לקוח:</strong> {orderDetails.customerId}
                  </Typography>
                  <Typography variant="h6" className="total-price">
                    <strong>סה"כ לתשלום:</strong> ₪{orderDetails.totalPrice}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            
            <Box className="payment-form">
              <Typography variant="h6" className="form-title">
                <CreditCardIcon className="form-icon" />
                פרטי כרטיס אשראי
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="מספר כרטיס אשראי"
                    variant="outlined"
                    value={cardDetails.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                    error={!!errors.cardNumber}
                    helperText={errors.cardNumber}
                    inputProps={{ maxLength: 19 }}
                    className="card-field"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="שם בעל הכרטיס"
                    variant="outlined"
                    value={cardDetails.cardName}
                    onChange={(e) => handleInputChange('cardName', e.target.value)}
                    error={!!errors.cardName}
                    helperText={errors.cardName}
                    className="card-field"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box className="expiry-fields">
                    <TextField
                      label="חודש"
                      variant="outlined"
                      value={cardDetails.expiryMonth}
                      onChange={(e) => handleInputChange('expiryMonth', e.target.value.slice(0, 2))}
                      error={!!errors.expiry}
                      inputProps={{ maxLength: 2 }}
                      className="expiry-field"
                    />
                    <Typography variant="h6" className="expiry-separator">/</Typography>
                    <TextField
                      label="שנה"
                      variant="outlined"
                      value={cardDetails.expiryYear}
                      onChange={(e) => handleInputChange('expiryYear', e.target.value.slice(0, 2))}
                      error={!!errors.expiry}
                      inputProps={{ maxLength: 2 }}
                      className="expiry-field"
                    />
                  </Box>
                  {errors.expiry && (
                    <Typography variant="caption" color="error" className="error-text">
                      {errors.expiry}
                    </Typography>
                  )}
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="קוד אבטחה (CVV)"
                    variant="outlined"
                    value={cardDetails.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value.slice(0, 4))}
                    error={!!errors.cvv}
                    helperText={errors.cvv}
                    inputProps={{ maxLength: 4 }}
                    className="card-field"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="תעודת זהות"
                    variant="outlined"
                    value={cardDetails.id}
                    onChange={(e) => handleInputChange('id', e.target.value.slice(0, 9))}
                    error={!!errors.id}
                    helperText={errors.id}
                    inputProps={{ maxLength: 9 }}
                    className="card-field"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={cardDetails.saveCard}
                        onChange={(e) => handleInputChange('saveCard', e.target.checked)}
                        color="primary"
                      />
                    }
                    label="שמור כרטיס לרכישות עתידיות"
                  />
                </Grid>
              </Grid>
              
              <Box className="security-note">
                <LockIcon className="lock-icon" />
                <Typography variant="body2">
                  פרטי התשלום שלך מאובטחים. אנו משתמשים בהצפנה מתקדמת להגנה על המידע האישי שלך.
                </Typography>
              </Box>
            </Box>
            
            <Box className="payment-actions">
              <Button
                variant="contained"
                className="pay-button"
                onClick={processPayment}
                disabled={loading}
                style={{ backgroundColor: '#b60557', color: 'white' }}
              >
                {loading ? (
                  <CircularProgress size={24} className="button-progress" />
                ) : (
                  <>שלם ₪{orderDetails.totalPrice}</>
                )}
              </Button>
              
              <Button
                variant="outlined"
                className="back-button"
                onClick={goBack}
                startIcon={<ArrowBackIcon />}
                disabled={loading}
                style={{ borderColor: '#b60557', color: '#b60557' }}
              >
                חזור להזמנה
              </Button>
            </Box>
          </>
        )}
        
        {activeStep === 1 && (
          <Box className="confirmation-container">
            {success ? (
              <>
                <Box className="success-animation">
                  <CheckCircleIcon className="success-icon" />
                </Box>
                
                <Typography variant="h5" className="confirmation-title">
                  התשלום בוצע בהצלחה!
                </Typography>
                
                <Typography variant="body1" className="confirmation-message">
                  הזמנתך התקבלה ואושרה. אימייל עם פרטי ההזמנה נשלח לכתובת המייל שלך.
                </Typography>
                
                <Box className="confirmation-details">
                  <Typography variant="body1">
                    <strong>מספר אישור:</strong> {Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}
                  </Typography>
                  <Typography variant="body1">
                    <strong>תאריך:</strong> {new Date().toLocaleDateString('he-IL')}
                  </Typography>
                  <Typography variant="body1">
                    <strong>סכום:</strong> ₪{orderDetails.totalPrice}
                  </Typography>
                </Box>
                
                <Button
                  variant="contained"
                  className="home-button"
                  onClick={goToHome}
                  style={{ backgroundColor: '#b60557', color: 'white' }}
                >
                  חזור לדף הבית
                </Button>
              </>
            ) : (
              <Box className="processing-payment">
                <CircularProgress size={60} className="processing-icon" />
                <Typography variant="h6" className="processing-text">
                  מעבד את התשלום...
                </Typography>
                <Typography variant="body2" className="processing-subtext">
                  אנא המתן, אנו מעבדים את פרטי התשלום שלך
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Paper>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};