import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef, use } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Checkbox,
  TextField,
  styled,
  Typography,
  Box,
  Rating,
  Autocomplete,
  Paper,
  Chip,
  Divider,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from "@mui/material";

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {
  CheckCircle,
  Cancel,
  Person,
  CalendarToday,
  AccessTime,
  Badge,
  Psychology,
  Assignment,
  Lightbulb,
  EmojiPeople,
  SportsKabaddi,
  MedicalServices,
  Healing,
  MedicalInformation,
  PictureAsPdf,
  Edit,
  Save,
  Close
} from "@mui/icons-material";

import SignaturePad from 'signature_pad';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { reportByOIdThunk } from "../../store/slices/reports/reportByOIdThunk";
import { reportFetchThunkById } from "../../store/slices/reports/reportFetchThunkById";


// סגנון מותאם לדירוג כוכבים
const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ac2454',
  },
  '& .MuiRating-iconHover': {
    color: '#ac2454',
  },
  '& .MuiRating-iconEmpty': {
    color: '#ac245433',
  }
});

// סגנון מותאם לכפתורים
const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '25px',
  padding: '10px 20px',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 10px rgba(172, 36, 84, 0.3)',
  },
  '&:active': {
    transform: 'translateY(1px)',
  }
}));

// סגנון מותאם לשדות טקסט
const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: '#ac2454',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ac2454',
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#ac2454',
  },
});

export const Report = () => {
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const report1 = useSelector(state => state.report.myReport);
  const report2 = useSelector(state => state.order.myReport);
  //   const theTreatment = useSelector(state => state.report.curretntTreatment);
  //   const thePatient = useSelector(state => state.patient.currentPatient);
  //   const allActivities = useSelector(state => state.activity?.activitiesList || []);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [exportingPdf, setExportingPdf] = useState(false);
  const [report, setReport] = useState(param.oid?report1:report2);
  // State לחתימה הדיגיטלית
  const [signature, setSignature] = useState(null);
  const [signature1, setSignature1] = useState(null);

  const [signatureDialogOpen, setSignatureDialogOpen] = useState(false);
  const canvasRef = useRef(null);
  const signaturePadRef = useRef(null);
  const signaturePadRef1 = useRef(null);
  //   const [report, setTreatment] = useState({
  //     treatmentId: theTreatment?.treatmentId,
  //     treatmentDate: theTreatment?.treatmentDate,
  //     treatmentTime: theTreatment?.treatmentTime,
  //     pationtId: theTreatment?.pationtId,
  //     isComing: true,
  //     escort: theTreatment?.escort || "",
  //     cooperation: theTreatment?.cooperation || 3,
  //     nextMeetingPlanning: theTreatment?.nextMeetingPlanning || "",
  //     bePaid: theTreatment?.bePaid || false,
  //     userId: theTreatment?.userId,
  //   });

  //   const [aimActivities, setAimActivities] = useState({});
  //   const [activeAim, setActiveAim] = useState(null);
  const reportRef = useRef(null);
  const refDialog=useRef();

  // דוגמאות להצעות פעילויות
  //   const activitySuggestions = useSelector(state => state.activity.activitiesList);
  useEffect(() => {
    if (param.oid) {
      dispatch(reportByOIdThunk(param.oid));
      setReport(report1);
    }
    else {
      dispatch(reportFetchThunkById({id:report2.id}));
      setReport(report2);
    }
    // refDialog.current.showModal();
  }, []);
  // פתיחת דיאלוג החתימה
  const openSignatureDialog = () => {
    setSignatureDialogOpen(true);

    // אתחול ה-SignaturePad אחרי שהדיאלוג נפתח ומוצג
    setTimeout(() => {
      initSignaturePad();
    }, 300);
  };
  const initSignaturePad = () => {

    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // התאמת גודל הקנבס לגודל האמיתי שלו בדף
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // ניקוי הקנבס
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // יצירת אובייקט SignaturePad חדש
    signaturePadRef.current = new SignaturePad(canvas, {
      minWidth: 1,
      maxWidth: 3,
      penColor: 'black',
      backgroundColor: 'rgba(255, 255, 255, 0)'
    });

    // אם יש חתימה קיימת, טען אותה לקנבס
    if (signature && signaturePadRef.current) {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        // ניקוי הקנבס
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // חישוב גודל התמונה בקנבס תוך שמירה על יחס הגובה-רוחב
        const imgAspect = img.height / img.width;
        let drawWidth = canvas.width * 0.8;
        let drawHeight = drawWidth * imgAspect;

        // אם הגובה גדול מדי, התאם את הרוחב
        if (drawHeight > canvas.height * 0.8) {
          drawHeight = canvas.height * 0.8;
          drawWidth = drawHeight / imgAspect;
        }

        // חישוב מיקום מרכזי
        const x = (canvas.width - drawWidth) / 2;
        const y = (canvas.height - drawHeight) / 2;

        // ציור התמונה במרכז הקנבס
        ctx.drawImage(img, x, y, drawWidth, drawHeight);

        // עדכון ה-SignaturePad
        signaturePadRef.current.fromDataURL(canvas.toDataURL());
      };
      img.src = signature;
    }
  };

  // ניקוי החתימה
  const clearSignature = () => {
    if (!signaturePadRef.current) return;
    signaturePadRef.current.clear();
  };

  // שמירת החתימה
  const saveSignature = () => {
    if (!signaturePadRef.current) return;

    if (signaturePadRef.current.isEmpty()) {
      alert("אנא חתום לפני השמירה");
      return;
    }

    // שמירת החתימה כתמונת PNG עם רקע שקוף
    setSignature(signaturePadRef.current.toDataURL('image/png'));
    closeSignatureDialog();
  };

  // סגירת דיאלוג החתימה
  const closeSignatureDialog = () => {
    setSignatureDialogOpen(false);
  };

  // פונקציה מעודכנת לייצוא PDF - מבוססת על הקוד שעבד ב-showTreatmentReport.jsx
  const generateProfessionalPDF = () => {
    // אם אין חתימה, פתח את דיאלוג החתימה תחילה
    if (!signature) {
      alert("נא להוסיף חתימה לפני ייצוא ה-PDF");
      openSignatureDialog();
      return;
    }

    setExportingPdf(true);

    // יצירת אלמנט HTML נפרד לייצוא ה-PDF
    const pdfContainer = document.createElement('div');
    pdfContainer.className = 'pdf-export-container';
    pdfContainer.style.width = '210mm';
    pdfContainer.style.padding = '20mm';
    pdfContainer.style.backgroundColor = 'white';
    pdfContainer.style.fontFamily = 'Arial, sans-serif';
    pdfContainer.style.direction = 'rtl';
    pdfContainer.style.position = 'absolute';
    pdfContainer.style.left = '-9999px';

    // הוספת תוכן המסמך הרשמי
    pdfContainer.innerHTML = `
    <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #b60557; font-size: 28px; margin-bottom: 10px;">חשבונית עסקה</h1>
    <p style="font-size: 14px; color: #666;">מספר חשבונית: INV-${Date.now().toString().slice(-6)}</p>
    <p style="font-size: 14px; color: #666;">תאריך: ${new Date().toLocaleDateString('he-IL')}</p>
  </div>
  
  <div style="margin-bottom: 30px;">
    <h2 style="color: #b60557; font-size: 18px; margin-bottom: 15px;">פרטי לקוח</h2>
    <p style="font-size: 14px; margin: 5px 0;">שם: ${report.customerName || 'לא צוין'}</p>
    <p style="font-size: 14px; margin: 5px 0;">טלפון: ${report.customerTel || 'לא צוין'}</p>
    <p style="font-size: 14px; margin: 5px 0;">אימייל: ${report.customerEmail || 'לא צוין'}</p>
    <p style="font-size: 14px; margin: 5px 0;">עיר : ${report.customerCity || 'לא צוין'}</p>
  </div>
  
  <div style="margin-bottom: 30px;">
    <h2 style="color: #b60557; font-size: 18px; margin-bottom: 15px;">פרטי הזמנה</h2>
    <p style="font-size: 14px; margin: 5px 0;">פעילות: ${report.activityName   || 'לא צוין'}</p>
    <p style="font-size: 14px; margin: 5px 0;">תאריך: ${report.orderDate || 'לא צוין'}</p>
    <p style="font-size: 14px; margin: 5px 0;">שעה: ${report.orderTime || 'לא צוין'}</p>
    <p style="font-size: 14px; margin: 5px 0;">מספר משתתפים: ${report.amountOfParticipants || 0}</p>
  </div>
  
  <div style="margin-bottom: 30px;">
    <h2 style="color: #b60557; font-size: 18px; margin-bottom: 15px;">פרטי תשלום</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="border-bottom: 1px solid #ddd;">
          <th style="text-align: right; padding: 10px; font-size: 14px;">תיאור</th>
          <th style="text-align: right; padding: 10px; font-size: 14px;">כמות</th>
          <th style="text-align: right; padding: 10px; font-size: 14px;">מחיר ליחידה</th>
          <th style="text-align: right; padding: 10px; font-size: 14px;">סה"כ</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="text-align: right; padding: 10px; font-size: 14px;">${report.activityName  || 'פעילות'}</td>
          <td style="text-align: right; padding: 10px; font-size: 14px;">${report.amountOfParticipants || 0}</td>
          <td style="text-align: right; padding: 10px; font-size: 14px;">₪${report.activityPrice || 0}</td>
          <td style="text-align: right; padding: 10px; font-size: 14px;">₪${report.payment}</td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <div style="text-align: left; margin-bottom: 30px;">
    <h3 style="color: #b60557; font-size: 18px;">סה"כ לתשלום: ₪${report.payment}</h3>
  </div>
  
  <div style="text-align: center; margin-top: 50px;">
    <p style="font-size: 14px; color: #666;">תודה שבחרתם בנו!</p>
  </div>

   
    <div style="display: flex; justify-content: space-between; margin-top: 40px;">
      <div style="width: 45%;">
        <p style="font-size: 14px; margin-bottom: 5px;"><strong>חתימת המפיק/ה:</strong></p>

        <div style="height: 80px; display: flex; justify-content: center; align-items: center;">
          <img src="${param.mid?signature :""}" style="max-height: 70px; max-width: 100%;" />
        </div>
        <div style="border-bottom: 1px solid #000; height: 40px;"></div>
        <p style="font-size: 12px; margin-top: 5px;">שם המנהל/ת: ${localStorage.getItem('userName') || 'המנהל/ת'}</p>
      </div>
      
      <div style="width: 45%;">
        <p style="font-size: 14px; margin-bottom: 5px;"><strong>חתימת הלקוח/ה:</strong></p>
        <div style="height: 80px; display: flex; justify-content: center; align-items: center;">
        <img src="${param.id?signature :""}" style="max-height: 70px; max-width: 100%;" />
        </div>
        <div style="border-bottom: 1px solid #000; height: 40px;"></div>
        <p style="font-size: 12px; margin-top: 5px;">שם הלקוח/ת: ${''} ${''}</p>
      </div>
    </div>
    
    <div style="margin-top: 40px; text-align: center; font-size: 10px; color: #999;">
      <p>מסמך זה הופק באמצעות מערכת connAction. כל הזכויות שמורות © ${new Date().getFullYear()}</p>
      <p>המסמך נחתם דיגיטלית ומאושר לשימוש רשמי</p>
    </div>
  `;

    // הוספת האלמנט לדף
    document.body.appendChild(pdfContainer);

    // יצירת ה-PDF
    html2canvas(pdfContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      windowWidth: pdfContainer.scrollWidth,
      windowHeight: pdfContainer.scrollHeight
    }).then(canvas => {
      // הסרת האלמנט מהדף
      document.body.removeChild(pdfContainer);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);

      // הוספת מספור עמודים
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text(`עמוד 1 מתוך 1`, pdfWidth / 2, pdfHeight - 5, { align: 'center' });

      // שמירת הקובץ
      const patientName = `${report?.instituteName || ''} || ''}`;
      const fileName = `_סיכום הזמנה_${patientName}_${report.date || ''}.pdf`;
      pdf.save(fileName);

      setExportingPdf(false);
      // alert("ה-PDF נוצר בהצלחה!");
    }).catch(error => {
      console.error('שגיאה ביצירת ה-PDF:', error);
      alert('אירעה שגיאה ביצירת קובץ ה-PDF. אנא נסה שוב מאוחר יותר.');
      setExportingPdf(false);
    });
  };



  return (
    // <dialog ref={refDialog} className="order-dialog">
    <Box
      className="report-report-container"
      sx={{
        maxWidth: 1000,
        margin: '0 auto',
        padding: { xs: 2, md: 4 },
        direction: 'rtl'
      }}
    >
      <Paper
        ref={reportRef}  // הוספת ה-ref כאן
        elevation={5}
        className="report-report-paper"
        sx={{
          padding: { xs: 2, md: 4 },
          borderRadius: 4,
          border: '1px solid #ac2454',
          position: 'relative',
          // overflow: 'hidden',
          background: 'linear-gradient(to bottom, #fff, #fdf5f8)'
        }}
      >
        {/* המשך הקוד הקיים */}

        <Box sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '12px',
          height: '100%',
          background: 'linear-gradient(to bottom, #ac2454, #d4447c)'
        }} />

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }} className="title-container">
          <MedicalServices sx={{ color: '#ac2454', fontSize: 32, mr: 1 }} className="title-icon" />
          <Typography variant="h4" component="h1" sx={{
            color: '#ac2454',
            fontWeight: 'bold',
            textAlign: 'center',
            fontFamily: 'Rubik, Arial, sans-serif'
          }} className="title-text">
            {report.isOk == "true" ? "סיכום הזמנה" : "דרישה לתשלום"}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card
              className="patient-card card-hover"
              elevation={3}
              sx={{
                height: '100%',
                borderRadius: 3,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 20px rgba(172, 36, 84, 0.2)'
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Person sx={{ color: '#ac2454', mr: 1 }} />
                  <Typography variant="h6" sx={{ color: '#ac2454', fontWeight: 'bold' }}>
                    פרטי עסק
                  </Typography>
                </Box>

                <Divider sx={{ mb: 2, backgroundColor: '#ac245433' }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Badge sx={{ color: '#ac2454', mr: 1 }} />
                    <Typography component="span" sx={{ fontWeight: 'bold', color: '#ac2454', ml: 1 }}>
                      מספר עסק:
                    </Typography>
                    <Typography component="span">
                      {report?.compNumber}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Person sx={{ color: '#ac2454', mr: 1 }} />
                    <Typography component="span" sx={{ fontWeight: 'bold', color: '#ac2454', ml: 1 }}>
                      שם העסק:
                    </Typography>
                    <Typography component="span">
                      {report?.compName} 
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarToday sx={{ color: '#ac2454', mr: 1 }} />
                    <Typography component="span" sx={{ fontWeight: 'bold', color: '#ac2454', ml: 1 }}>
                      תאריך:
                    </Typography>
                    <Typography component="span">
                      {report?.date}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTime sx={{ color: '#ac2454', mr: 1 }} />
                    <Typography component="span" sx={{ fontWeight: 'bold', color: '#ac2454', ml: 1 }}>
                      קטגוריה
                    </Typography>
                    <Typography component="span">
                      {report?.kategory}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Person sx={{ color: '#ac2454', mr: 1 }} />
                  <Typography variant="h6" sx={{ color: '#ac2454', fontWeight: 'bold' }}>
                    פרטי לקוח
                  </Typography>
                </Box>

                <Divider sx={{ mb: 2, backgroundColor: '#ac245433' }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Badge sx={{ color: '#ac2454', mr: 1 }} />
                    <Typography component="span" sx={{ fontWeight: 'bold', color: '#ac2454', ml: 1 }}>
                      מספר לקוח:
                    </Typography>
                    <Typography component="span">
                      {report?.customerId}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Person sx={{ color: '#ac2454', mr: 1 }} />
                    <Typography component="span" sx={{ fontWeight: 'bold', color: '#ac2454', ml: 1 }}>
                      שם מוסד:
                    </Typography>
                    <Typography component="span">
                      {report?.customerName}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarToday sx={{ color: '#ac2454', mr: 1 }} />
                    <Typography component="span" sx={{ fontWeight: 'bold', color: '#ac2454', ml: 1 }}>
                      אימייל:
                    </Typography>
                    <Typography component="span">
                      {report?.customerEmail}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarToday sx={{ color: '#ac2454', mr: 1 }} />
                    <Typography component="span" sx={{ fontWeight: 'bold', color: '#ac2454', ml: 1 }}>
                      טל:
                    </Typography>
                    <Typography component="span">
                      {report?.customerTel}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarToday sx={{ color: '#ac2454', mr: 1 }} />
                    <Typography component="span" sx={{ fontWeight: 'bold', color: '#ac2454', ml: 1 }}>
                      עיר:
                    </Typography>
                    <Typography component="span">
                      {report?.customerCity}
                    </Typography>
                  </Box>
              
                </Box>
              </CardContent>
              
             
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              className="patient-card card-hover"
              elevation={3}
              sx={{
                height: '100%',
                borderRadius: 3,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 20px rgba(172, 36, 84, 0.2)'
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Person sx={{ color: '#ac2454', mr: 1 }} />
                  <Typography variant="h6" sx={{ color: '#ac2454', fontWeight: 'bold' }}>
                    פרטי פעילות
                  </Typography>
                </Box>

                <Divider sx={{ mb: 2, backgroundColor: '#ac245433' }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Badge sx={{ color: '#ac2454', mr: 1 }} />
                    <Typography component="span" sx={{ fontWeight: 'bold', color: '#ac2454', ml: 1 }}>
                      קוד פעילות:
                    </Typography>
                    <Typography component="span">
                      {report?.activityId}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Person sx={{ color: '#ac2454', mr: 1 }} />
                    <Typography component="span" sx={{ fontWeight: 'bold', color: '#ac2454', ml: 1 }}>
                      שם פעילות:
                    </Typography>
                    <Typography component="span">
                      {report?.activityName}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarToday sx={{ color: '#ac2454', mr: 1 }} />
                    <Typography component="span" sx={{ fontWeight: 'bold', color: '#ac2454', ml: 1 }}>
                      תיאור:
                    </Typography>
                    <Typography component="span">
                      {report?.activityDescription}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarToday sx={{ color: '#ac2454', mr: 1 }} />
                    <Typography component="span" sx={{ fontWeight: 'bold', color: '#ac2454', ml: 1 }}>
                      מחיר:
                    </Typography>
                    <Typography component="span">
                      {report?.activityPrice}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarToday sx={{ color: '#ac2454', mr: 1 }} />
                    <Typography component="span" sx={{ fontWeight: 'bold', color: '#ac2454', ml: 1 }}>
                      מחיר לילה:
                    </Typography>
                    <Typography component="span">
                      {report?.activityNightPrice}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarToday sx={{ color: '#ac2454', mr: 1 }} />
                    <Typography component="span" sx={{ fontWeight: 'bold', color: '#ac2454', ml: 1 }}>
                      אורך :
                    </Typography>
                    <Typography component="span">
                      {report?.lenOfActivity}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
               <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Person sx={{ color: '#ac2454', mr: 1 }} />
                  <Typography variant="h6" sx={{ color: '#ac2454', fontWeight: 'bold' }}>
                    פרטי הזמנה
                  </Typography>
                </Box>

                <Divider sx={{ mb: 2, backgroundColor: '#ac245433' }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Badge sx={{ color: '#ac2454', mr: 1 }} />
                    <Typography component="span" sx={{ fontWeight: 'bold', color: '#ac2454', ml: 1 }}>
                      מספר הזמנה:
                    </Typography>
                    <Typography component="span">
                      {report?.orderId}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Person sx={{ color: '#ac2454', mr: 1 }} />
                    <Typography component="span" sx={{ fontWeight: 'bold', color: '#ac2454', ml: 1 }}>
                      כמות ממשתפים:
                    </Typography>
                    <Typography component="span">
                      {report?.amountOfParticipants}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarToday sx={{ color: '#ac2454', mr: 1 }} />
                    <Typography component="span" sx={{ fontWeight: 'bold', color: '#ac2454', ml: 1 }}>
                      שעה:
                    </Typography>
                    <Typography component="span">
                      {report?.orderTime}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarToday sx={{ color: '#ac2454', mr: 1 }} />
                    <Typography component="span" sx={{ fontWeight: 'bold', color: '#ac2454', ml: 1 }}>
                      תאריך:
                    </Typography>
                    <Typography component="span">
                      {report?.orderDate}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarToday sx={{ color: '#ac2454', mr: 1 }} />
                    <Typography component="span" sx={{ fontWeight: 'bold', color: '#ac2454', ml: 1 }}>
                      מחיר:
                    </Typography>
                    <Typography component="span">
                      {report?.customerCity}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarToday sx={{ color: '#ac2454', mr: 1 }} />
                    <Typography component="span" sx={{ fontWeight: 'bold', color: '#ac2454', ml: 1 }}>
                      שולם:
                    </Typography>
                    <Typography component="span">
                      {report?.isPayment==1?"שולם":"לא שולם"}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
              <CardContent>
                
        
         

                <Divider sx={{ mb: 2, backgroundColor: '#ac245433' }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>



                  <Box
                    className={`payment-status ${report.isOk ? 'paid' : 'unpaid'}`}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: report.isOk ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 152, 0, 0.1)',
                      borderRadius: 2,
                      padding: 1,
                      transition: 'background-color 0.3s ease'
                    }}
                  >
                    <CheckCircle sx={{ color: report.isPayment ? '#4caf50' : '#d60141', mr: 1 }} />
                    <Typography sx={{ color: report.isPayment ? '#4caf50' : '#d60141', mr: 1, fontWeight: 'bold' }}>
                    {report?.isPayment==1?"שולם":"לא שולם"}
                     
                    </Typography>

                  </Box>
                </Box>
              </CardContent>
              {param.mid && <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Edit sx={{ color: '#ac2454', mr: 1 }} />
                  <Typography variant="h6" sx={{ color: '#ac2454', fontWeight: 'bold' }}>
                    חתימה דיגיטלית
                  </Typography>
                </Box>

                <Divider sx={{ mb: 2, backgroundColor: '#ac245433' }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  {signature ? (
                    <Box sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      border: '1px dashed #ac2454',
                      borderRadius: 2,
                      padding: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.7)'
                    }}>
                      <img
                        src={signature}
                        alt="חתימה דיגיטלית"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100px',
                          marginBottom: '10px'
                        }}
                      />
                      <Typography variant="caption" sx={{ color: '#666', mb: 1 }}>
                        החתימה נשמרה בהצלחה
                      </Typography>
                      <StyledButton
                        variant="outlined"
                        size="small"
                        onClick={openSignatureDialog}
                        startIcon={<Edit />}
                        sx={{
                          color: '#ac2454',
                          borderColor: '#ac2454',
                          '&:hover': { borderColor: '#8e1c44', color: '#8e1c44' },
                          fontSize: '0.8rem'
                        }}
                      >
                        שינוי חתימה
                      </StyledButton>
                    </Box>
                  ) : (
                    <Box sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      border: '1px dashed #ac2454',
                      borderRadius: 2,
                      padding: 3,
                      backgroundColor: 'rgba(255, 255, 255, 0.7)'
                    }}>
                      <Typography sx={{ color: '#666', mb: 2, textAlign: 'center' }}>
                        לא נמצאה חתימה. אנא הוסף חתימה דיגיטלית לפני ייצוא ה-PDF.
                      </Typography>
                      <StyledButton
                        variant="contained"
                        onClick={()=>{openSignatureDialog()}}
                        startIcon={<Edit />}
                        sx={{
                          backgroundColor: '#ac2454',
                          color: 'white',
                          '&:hover': { backgroundColor: '#8e1c44' },
                          fontSize: '0.9rem'
                        }}
                      >
                        הוספת חתימה
                      </StyledButton>
                    </Box>
                  )}
                </Box>
              </CardContent>}
            </Card>
          </Grid>

          {/* חלק החתימה הדיגיטלית */}
          {param.id && 
          <Grid item xs={12} md={6}>
            <Card
              className="signature-card card-hover"
              elevation={3}
              sx={{
                height: '100%',
                borderRadius: 3,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 20px rgba(172, 36, 84, 0.2)'
                }
              }}
            >
             <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Edit sx={{ color: '#ac2454', mr: 1 }} />
                  <Typography variant="h6" sx={{ color: '#ac2454', fontWeight: 'bold' }}>
                    חתימה דיגיטלית
                  </Typography>
                </Box>

                <Divider sx={{ mb: 2, backgroundColor: '#ac245433' }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  {signature  ? (
                    <Box sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      border: '1px dashed #ac2454',
                      borderRadius: 2,
                      padding: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.7)'
                    }}>
                      <img
                        src={signature}
                        alt="חתימה דיגיטלית"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100px',
                          marginBottom: '10px'
                        }}
                      />
                      <Typography variant="caption" sx={{ color: '#666', mb: 1 }}>
                        החתימה נשמרה בהצלחה
                      </Typography>
                      <StyledButton
                        variant="outlined"
                        size="small"
                        onClick={openSignatureDialog}
                        startIcon={<Edit />}
                        sx={{
                          color: '#ac2454',
                          borderColor: '#ac2454',
                          '&:hover': { borderColor: '#8e1c44', color: '#8e1c44' },
                          fontSize: '0.8rem'
                        }}
                      >
                        שינוי חתימה
                      </StyledButton>
                    </Box>
                  ) : (
                    <Box sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      border: '1px dashed #ac2454',
                      borderRadius: 2,
                      padding: 3,
                      backgroundColor: 'rgba(255, 255, 255, 0.7)'
                    }}>
                      <Typography sx={{ color: '#666', mb: 2, textAlign: 'center' }}>
                        לא נמצאה חתימה. אנא הוסף חתימה דיגיטלית לפני ייצוא ה-PDF.
                      </Typography>
                      <StyledButton
                        variant="contained"
                        onClick={openSignatureDialog}
                        startIcon={<Edit />}
                        sx={{
                          backgroundColor: '#ac2454',
                          color: 'white',
                          '&:hover': { backgroundColor: '#8e1c44' },
                          fontSize: '0.9rem'
                        }}
                      >
                        הוספת חתימה
                      </StyledButton>
                    </Box>
                 )}
                </Box>
              </CardContent>
            </Card>
          </Grid>}
        </Grid>









        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }} className="actions-container">
          <StyledButton
            variant="contained"
            onClick={generateProfessionalPDF}
            disabled={saving || exportingPdf}
            sx={{
              backgroundColor: '#ac2454',
              color: 'white',
              '&:hover': { backgroundColor: '#8e1c44' },
              minWidth: 150,
              fontSize: '1rem'
            }}
            startIcon={exportingPdf ? <CircularProgress size={20} color="inherit" /> : <PictureAsPdf />}
            className="pdf-button button-hover"
          >
            {exportingPdf ? 'מייצא...' : 'ייצוא דוח מקצועי'}
          </StyledButton>

        

          <StyledButton
            variant="outlined"
            onClick={() => {navigate(-1)}}
            disabled={saving || exportingPdf}
            sx={{
              color: '#ac2454',
              borderColor: '#ac2454',
              '&:hover': { borderColor: '#8e1c44', color: '#8e1c44' },
              minWidth: 150,
              fontSize: '1rem'
            }}
            startIcon={<Cancel />}
            className="cancel-button button-hover"
          >
            ביטול
          </StyledButton>
        </Box>

        {/* דיאלוג החתימה */}
        <Dialog
          open={signatureDialogOpen}
          onClose={closeSignatureDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ backgroundColor: '#ac2454', color: 'white', textAlign: 'center' }}>
            חתימה דיגיטלית
            <IconButton
              aria-label="close"
              onClick={closeSignatureDialog}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'white',
              }}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ padding: 3 }}>
            <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
              נא לחתום במסגרת למטה
            </Typography>
            <Box
              sx={{
                border: '1px solid #ccc',
                borderRadius: 2,
                height: 200,
                backgroundColor: 'white',
                boxShadow: 'inset 0 0 5px rgba(0,0,0,0.1)'
              }}
            >
              <canvas
                ref={canvasRef}
                style={{ width: '100%', height: '100%', touchAction: 'none' }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ padding: 2, justifyContent: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={clearSignature}
              startIcon={<Cancel />}
              sx={{ borderColor: '#ac2454', color: '#ac2454' }}
            >
              נקה
            </Button>
            <Button
              variant="contained"
              onClick={saveSignature}
              startIcon={<Save />}
              sx={{ backgroundColor: '#ac2454', '&:hover': { backgroundColor: '#8e1c44' } }}
            >
              שמור חתימה
            </Button>
          </DialogActions>
        </Dialog>

        {/* אנימציית טעינה בזמן ייצוא PDF */}
        {exportingPdf && (
          <Box
            className="exporting-overlay"
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 9999,
              flexDirection: 'column'
            }}
          >
            <CircularProgress size={60} sx={{ color: '#ac2454' }} />
            <Typography variant="h6" sx={{ mt: 2, color: '#ac2454', fontWeight: 'bold' }}>
              מייצא דוח מקצועי...
            </Typography>
          </Box>
        )}

      </Paper>

      {/* דיאלוג החתימה הדיגיטלית */}
      <Dialog
        open={signatureDialogOpen}
        onClose={closeSignatureDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 2,
            background: 'linear-gradient(to bottom, #fff, #fdf5f8)'
          }
        }}
      >
        <DialogTitle sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#ac2454',
          fontWeight: 'bold'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Edit sx={{ mr: 1 }} />
            חתימה דיגיטלית
          </Box>
          <IconButton onClick={closeSignatureDialog} size="small" sx={{ color: '#ac2454' }}>
            <Close />
          </IconButton>
        </DialogTitle>

        <Divider sx={{ backgroundColor: '#ac245433' }} />

        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2, color: '#666', textAlign: 'center' }}>
            אנא חתום במסגרת למטה באמצעות העכבר או מסך מגע
          </Typography>

          <Box sx={{
            border: '2px dashed #ac2454',
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            height: 200,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            // overflow: 'hidden'
          }}>
            <canvas
              ref={canvasRef}
              style={{
                width: '100%',
                height: '100%',
                touchAction: 'none',
                cursor: 'crosshair'
              }}
            />
            {!signaturePadRef.current && (
              <Typography
                variant="body2"
                sx={{
                  position: 'absolute',
                  color: '#ac245466',
                  pointerEvents: 'none'
                }}
              >
                חתום כאן
              </Typography>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
          <StyledButton
            onClick={clearSignature}
            variant="outlined"
            startIcon={<Cancel />}
            sx={{
              color: '#666',
              borderColor: '#666',
              '&:hover': { borderColor: '#444', color: '#444' }
            }}
          >
            נקה
          </StyledButton>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <StyledButton
              onClick={closeSignatureDialog}
              variant="outlined"
              sx={{
                color: '#ac2454',
                borderColor: '#ac2454',
                '&:hover': { borderColor: '#8e1c44', color: '#8e1c44' }
              }}
            >
              ביטול
            </StyledButton>

            <StyledButton
              onClick={saveSignature}
              variant="contained"
              startIcon={<Save />}
              sx={{
                backgroundColor: '#ac2454',
                color: 'white',
                '&:hover': { backgroundColor: '#8e1c44' }
              }}
            >
              שמור חתימה
            </StyledButton>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
    // </dialog>
  );
};

