// import React from 'react';
// import { 
//   Container, 
//   Typography, 
//   Box, 
//   Paper, 
//   Grid, 
//   Card, 
//   CardContent, 
//   CardMedia, 
//   Button, 
//   IconButton 
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import EventNoteIcon from '@mui/icons-material/EventNote';
// import ReceiptIcon from '@mui/icons-material/Receipt';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import { Logo } from '../common/Logo';
// import './About.css';

// export const About = () => {
//   const navigate = useNavigate();

//   const features = [
//     {
//       icon: <EventNoteIcon fontSize="large" />,
//       title: 'ניהול אירועים',
//       description: 'ניהול קל ונוח של כל האירועים שלך במקום אחד. הוספה, עריכה ומעקב אחר סטטוס האירועים.'
//     },
//     {
//       icon: <ReceiptIcon fontSize="large" />,
//       title: 'הפקת קבלות וחשבוניות',
//       description: 'הפקת קבלות וחשבוניות דיגיטליות בקלות ובמהירות, שמירה והפצה ללקוחות.'
//     },
//     {
//       icon: <CalendarMonthIcon fontSize="large" />,
//       title: 'יומן אירועים',
//       description: 'יומן אירועים אינטראקטיבי המאפשר תצוגה יומית, שבועית וחודשית של כל האירועים המתוכננים.'
//     },
//     {
//       icon: <BarChartIcon fontSize="large" />,
//       title: 'דוחות וניתוח נתונים',
//       description: 'הפקת דוחות מפורטים וניתוח נתונים לקבלת תובנות עסקיות חשובות לצמיחה והתפתחות.'
//     }
//   ];

//   return (
//     <Box className="about-page">
//       <Box className="about-header">
//         <Container maxWidth="lg">
//           <Box className="about-nav">
//             <IconButton 
//               className="back-button" 
//               onClick={() => navigate(-1)}
//             >
//               <ArrowBackIcon />
//             </IconButton>
//             <Logo size="medium" />
//           </Box>
          
//           <Box className="about-hero">
//             <Typography variant="h3" className="about-title">
//               המשרד הדיגיטלי המושלם למפיקות ומרצות
//             </Typography>
//             <Typography variant="h6" className="about-subtitle">
//               פלטפורמה מקצועית לניהול אירועים, הרצאות וסדנאות בצורה חכמה ויעילה
//             </Typography>
//             <Button 
//               variant="contained" 
//               size="large" 
//               className="about-cta-button"
//               onClick={() => navigate('/')}
//             >
//               התחילי עכשיו
//             </Button>
//           </Box>
//         </Container>
//       </Box>
      
//       <Container maxWidth="lg" className="about-content">
//         <Box className="about-section">
//           <Typography variant="h4" className="section-title">
//             מה אנחנו מציעים
//           </Typography>
//           <Typography variant="body1" className="section-description">
//             פלטפורמה מקיפה המספקת את כל הכלים הדרושים לניהול העסק שלך
//           </Typography>
          
//           <Grid container spacing={4} className="features-grid">
//             {features.map((feature, index) => (
//               <Grid item xs={12} sm={6} md={3} key={index}>
//                 <Card className="feature-card">
//                   <Box className="feature-icon">
//                     {feature.icon}
//                   </Box>
//                   <CardContent>
//                     <Typography variant="h6" className="feature-title">
//                       {feature.title}
//                     </Typography>
//                     <Typography variant="body2" className="feature-description">
//                       {feature.description}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>
        
//         <Box className="about-section">
//           <Typography variant="h4" className="section-title">
//             למה לבחור בנו
//           </Typography>
          
//           <Grid container spacing={4} alignItems="center">
//             <Grid item xs={12} md={6}>
//               <Box className="why-us-content">
//                 <Typography variant="h5" className="why-us-title">
//                   פתרון מקיף לכל צרכי הניהול שלך
//                 </Typography>
//                 <Typography variant="body1" className="why-us-description">
//                   המערכת שלנו מציעה פתרון כולל לניהול העסק שלך, החל מתיאום אירועים ועד להפקת דוחות וחשבוניות. אנו מאמינים שניהול עסק צריך להיות פשוט ויעיל, ולכן פיתחנו מערכת אינטואיטיבית שתחסוך לך זמן ומאמץ.
//                 </Typography>
//                 <Box className="why-us-points">
//                   <Typography variant="body1" className="why-us-point">
//                     ✓ ממשק ידידותי ונוח לשימוש
//                   </Typography>
//                   <Typography variant="body1" className="why-us-point">
//                     ✓ גישה מכל מקום ובכל זמן
//                   </Typography>
//                   <Typography variant="body1" className="why-us-point">
//                     ✓ אבטחת מידע ברמה הגבוהה ביותר
//                   </Typography>
//                   <Typography variant="body1" className="why-us-point">
//                     ✓ תמיכה טכנית זמינה 24/7
//                   </Typography>
//                 </Box>
//               </Box>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Box className="why-us-image-container">
//                 <img 
//                   src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
//                   alt="Professional woman working on laptop" 
//                   className="why-us-image"
//                 />
//               </Box>
//             </Grid>
//           </Grid>
//         </Box>
        
//         <Box className="about-section testimonials-section">
//           <Typography variant="h4" className="section-title">
//             מה לקוחותינו אומרים
//           </Typography>
          
//           <Grid container spacing={4}>
//             <Grid item xs={12} md={4}>
//               <Paper className="testimonial-card">
//                 <Typography variant="body1" className="testimonial-text">
//                   "המערכת שינתה לחלוטין את האופן שבו אני מנהלת את העסק שלי. היא חסכה לי שעות של עבודה אדמיניסטרטיבית ואפשרה לי להתמקד במה שאני אוהבת - להרצות ולהעביר סדנאות."
//                 </Typography>
//                 <Box className="testimonial-author">
//                   <Typography variant="subtitle1" className="author-name">
//                     מיכל לוי
//                   </Typography>
//                   <Typography variant="body2" className="author-title">
//                     מרצה ומנחת סדנאות
//                   </Typography>
//                 </Box>
//               </Paper>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <Paper className="testimonial-card">
//                 <Typography variant="body1" className="testimonial-text">
//                   "הפקת חשבוניות וקבלות הייתה תמיד כאב ראש גדול עבורי. עכשיו, בלחיצת כפתור, אני יכולה להפיק מסמכים מקצועיים ולשלוח אותם ישירות ללקוחות שלי. פשוט מדהים!"
//                 </Typography>
//                 <Box className="testimonial-author">
//                   <Typography variant="subtitle1" className="author-name">
//                     רונית כהן
//                   </Typography>
//                   <Typography variant="body2" className="author-title">
//                     מפיקת אירועים
//                   </Typography>
//                 </Box>
//               </Paper>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <Paper className="testimonial-card">
//                 <Typography variant="body1" className="testimonial-text">
//                   "היומן האינטראקטיבי הוא כלי מדהים! אני יכולה לראות בקלות את כל האירועים המתוכננים שלי, לערוך שינויים בלוח הזמנים ולקבל תזכורות חשובות. זה עזר לי להיות הרבה יותר מאורגנת."
//                 </Typography>
//                 <Box className="testimonial-author">
//                   <Typography variant="subtitle1" className="author-name">
//                     דנה ישראלי
//                   </Typography>
//                   <Typography variant="body2" className="author-title">
//                     מדריכת טיולים
//                   </Typography>
//                 </Box>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Box>
//       </Container>
      
//       <Box className="about-footer">
//         <Container maxWidth="lg">
//           <Box className="footer-content">
//             <Box className="footer-logo">
//               <Logo size="medium" />
//               <Typography variant="body2" className="footer-tagline">
//                 המשרד הדיגיטלי המושלם למפיקות ומרצות
//               </Typography>
//             </Box>
            
//             <Box className="footer-cta">
//               <Typography variant="h6" className="cta-text">
//                 מוכנה להתחיל?
//               </Typography>
//               <Button 
//                 variant="contained" 
//                 className="cta-button"
//                 onClick={() => navigate('/')}
//               >
//                 הירשמי עכשיו
//               </Button>
//             </Box>
//           </Box>
          
//           <Divider className="footer-divider" />
          
//           <Typography variant="body2" className="copyright-text">
//             © {new Date().getFullYear()} ProEvent. כל הזכויות שמורות.
//           </Typography>
//         </Container>
//       </Box>
//     </Box>
//   );
// };
