
import { useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";
// import { FaEye, FaEyeSlash, Facustomer, FaIdCard, FaPhone, FaEnvelope, FaStethoscope, FaLock } from "react-icons/fa";
import "./logonManager.css";
// import { r } from "framer-motion/dist/types.d-DSjX-LJB";
import { addManagerThunk } from "../../store/slices/managers/addManagerThunk";

import {
    Box, Container, Typography, Paper, Grid, Card, CardContent, CardMedia, CardActions,
    Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, IconButton,
    InputAdornment, Divider, Chip, Tooltip, Snackbar, Alert, FormControl, InputLabel,
    Select, MenuItem, CircularProgress, TablePagination
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import UploadIcon from '@mui/icons-material/Upload';
import InventoryIcon from '@mui/icons-material/Inventory';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';

export const LogonManager = () => {
    const dispatch = useDispatch();
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });
    const [manager, setManager] = useState({
        managerName: "",
        pass: "",
        compName: "",
        managerEmail: "",
        managerPhone: "",
        managerFax: "",
        managerTel: "",
        address: "",
        city: "",
        mOrP: "",
        numOfComp: "",
        bank: "",
        bankBranch: "",
        accountNum: "",
        kategoty: "",
        description: "",
        imgPath: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const dialogRef = useRef(null);
    const navigate = useNavigate();
    const israeliCities = [
        "ירושלים", "תל אביב", "חיפה", "ראשון לציון", "פתח תקווה", "אשדוד", "נתניה",
        "באר שבע", "חולון", "בני ברק", "רמת גן", "אשקלון", "רחובות", "בת ים", "הרצליה",
        "כפר סבא", "מודיעין", "רעננה", "רמלה", "לוד", "נצרת", "קריית אתא", "אילת", "כרמיאל", "אור עקיבא", "בית שמש", "ערד", "חצור", "דימונה"
    ];

    const kategoties = [
        "טיולים", "מופעים אור קוליים", "הרצאות", "פעילויות בטבע", "פעילויות מוזיקליות", "סדנאות", "סיפורים אישיים", "קליקרים וטריוויה", "תוכניות במה קהל ", "מופעים והצגות"
    ]
    useEffect(() => {
        dialogRef.current.showModal();

        // אנימציה לפתיחת הדיאלוג
        dialogRef.current.animate(
            [
                { opacity: 0, transform: 'scale(0.9)' },
                { opacity: 1, transform: 'scale(1)' }
            ],
            { duration: 300, easing: 'ease-out' }
        );
    }, []);
    useEffect(() => {
        console.log("Current manager data:", manager);
    }, [manager]);
    const validateStep1 = () => {
        const newErrors = {};



        if (!manager.managerName.trim()) {
            newErrors.managerName = "יש להזין שם ";
        }
        if (!manager.managerEmail.trim()) {
            newErrors.managerEmail = "יש להזין כתובת אימייל";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(manager.managerEmail)) {
            newErrors.managerEmail = "יש להזין כתובת אימייל תקינה";
        }
        if (!manager.managerPhone.trim()) {
            newErrors.managerPhone = "יש להזין מספר פלאפון";
        } else if (!/^0\d{9}$/.test(manager.managerPhone)) {
            newErrors.managerPhone = "יש להזין מספר טלפון תקין (10 ספרות המתחיל ב-0)";
        }
        // if (!manager.mobile.trim()) {
        //     newErrors.mobile = "יש להזין מספר טלפון";
        // } else if (!/^0\d{8}$/.test(manager.mobile)) {
        //     newErrors.mobile = "יש להזין מספר טלפון תקין (10 ספרות המתחיל ב-0)";
        // }
        // if (!manager.fax.trim()) {
        //     newErrors.fax = "יש להזין מספר פקס";
        // } else if (!/^0\d{8}$/.test(manager.fax)) {
        //     newErrors.fax = "יש להזין מספר פקס תקין (10 ספרות המתחיל ב-0)";
        // }
        if (!manager.city.trim()) {
            newErrors.city = "יש להזין  עיר ";
        }
        if (!manager.address.trim()) {
            newErrors.address = "יש להזין  קהילה ";
        }

        // if (!manager.customerId.trim()) {
        //     newErrors.customerId = "יש להזין מספר זהות";
        // } else if (!/^\d{9}$/.test(manager.customerId)) {
        //     newErrors.customerId = "מספר זהות חייב להכיל 9 ספרות";
        // }



        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};


        if (!manager.compName.trim()) {
            newErrors.compName = "יש להזין שם ";
        }
        if (!manager.numOfComp.trim()) {
            newErrors.numOfComp = "יש להזין מספר עסק ";
        }
        if (!manager.kategoty.trim()) {
            newErrors.kategoty = "יש להזין קטגוריה ";
        }
        if (!manager.description.trim()) {
            newErrors.description = "יש להזין תיאור העסק ";
        }


        // } else if (!/^05\d{8}$/.test(manager.mobile)) {
        //     newErrors.mobile = "יש להזין מספר טלפון תקין (10 ספרות המתחיל ב-05)";
        // }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const validateStep3 = () => {
        const newErrors = {};


        if (!manager.bank.trim()) {
            newErrors.bank = "יש להזין שם בנק ";
        }
        if (!manager.bankBranch.trim()) {
            newErrors.bankBranch = "יש להזין מספר סניף ";
        }
        if (!manager.accountNum.trim()) {
            newErrors.accountNum = "יש להזין  מספר חשבון ";
        }


        // } else if (!/^05\d{8}$/.test(manager.mobile)) {
        //     newErrors.mobile = "יש להזין מספר טלפון תקין (10 ספרות המתחיל ב-05)";
        // }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const validateStep4 = () => {
        const newErrors = {};

        if (!manager.pass) {
            newErrors.pass = "יש להזין סיסמא";
        } else if (manager.pass.length < 6) {
            newErrors.pass = "הסיסמא חייבת להכיל לפחות 6 תווים";
        }

        if (!manager.confirmPassword) {
            newErrors.confirmPassword = "יש לאשר את הסיסמה";
        } else if (manager.pass !== manager.confirmPassword) {
            newErrors.confirmPassword = "הסיסמאות אינן תואמות";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNextStep = () => {
        console.log(currentStep);
        console.log("Current step data:", manager);
        if (currentStep === 1 && validateStep1()) {
            setCurrentStep(2);
        } else if (currentStep === 2 && validateStep2()) {
            setCurrentStep(3);
        } else if (currentStep === 3 && validateStep3()) {
            setCurrentStep(4);
        }
    };

    const handlePrevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    // const handleRegister = async () => {
       
    //     debugger
       
    //     if (!validateStep4()) return;

    //     setIsLoading(true);

    //     try {
    //         // הסרת שדה confirmPassword לפני שליחה לשרת
    //         const imageUrl = await uploadImage();
            
    //         setManager({ ...manager, imgPath: imageUrl });
    //         setManager({ ...manager, numOfComp: parseInt(manager.numOfComp) });
    //         setManager({ ...manager, accountNum: parseInt(manager.accountNum) });
    //         setManager({ ...manager, bankBranch: parseInt(manager.bankBranch) });

    //         const { confirmPassword, ...managerToRegister } = manager;
    //         // const { password, ...customerToSend } = customerToRegister;


    //         // Add product with image URL
    //         // const activityToAdd = {
    //         //   ...newActivity,
    //         //   imgPath: imageUrl
    //         // };
    //         console.log("Data being sent to server:", managerToRegister);
    //         console.log(managerToRegister);
    //         setSelectedImage(null);
    //         if (!imageUrl) return;
    //         await dispatch(addManagerThunk({ details: managerToRegister }));

    //         setRegistrationSuccess(true);

    //         // אנ
    //         // אנימציה להצלחת הרישום
    //         setTimeout(() => {
    //             const animation = dialogRef.current.animate(
    //                 [
    //                     { opacity: 1, transform: 'scale(1)' },
    //                     { opacity: 0, transform: 'scale(1.1)' }
    //                 ],
    //                 { duration: 300, easing: 'ease-in-out' }
    //             );

    //             animation.onfinish = () => {
    //                 navigate(`login`);
    //             };
    //         }, 1500);
    //     } catch (error) {
    //         console.error("שגיאה ברישום:", error);
    //         setErrors({ submit: "אירעה שגיאה בתהליך הרישום. אנא נסה שנית." });
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };
    const handleImageSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const handleRegister = async () => {
        if (!validateStep4()) return;
        setIsLoading(true);
    
        try {
            // קבל את כתובת התמונה קודם
            const imageUrl = await uploadImage();
            if (!imageUrl) {
                setIsLoading(false);
                return;
            }
    
            // צור אובייקט מנהל חדש עם כל ההמרות הנדרשות
            const managerToRegister = {
                ...manager,
                imgPath: imageUrl,
                numOfComp: parseInt(manager.numOfComp),
                accountNum: parseInt(manager.accountNum),
                bankBranch: parseInt(manager.bankBranch),
                mOrP:manager.mOrP===""?0:1
               
            };
    
            // הסר את confirmPassword מהאובייקט
            delete managerToRegister.confirmPassword;
    
            console.log("Data being sent to server:", managerToRegister);
            
            // שלח את הפעולה עם הנתונים המוכנים
            await dispatch(addManagerThunk({ details: managerToRegister }));
    
            setSelectedImage(null);
            setRegistrationSuccess(true);
    
            // אנימציה להרשמה מוצלחת
            setTimeout(() => {
                const animation = dialogRef.current.animate(
                    [
                        { opacity: 1, transform: 'scale(1)' },
                        { opacity: 0, transform: 'scale(1.1)' }
                    ],
                    { duration: 300, easing: 'ease-in-out' }
                );
    
                animation.onfinish = () => {
                    navigate(`login`);
                };
            }, 1500);
        } catch (error) {
            console.error("שגיאה ברישום:", error);
            setErrors({ submit: "אירעה שגיאה בתהליך הרישום. אנא נסה שנית." });
        } finally {
            setIsLoading(false);
        }
    };
    
    const uploadImage = async () => {
        debugger
        if (!selectedImage) {
            setSnackbar({
                open: true,
                message: 'אנא בחר תמונה',
                severity: 'warning'
            });
            return null;
        }

        setUploadingImage(true);

        const formData = new FormData();
        formData.append('file', selectedImage);

        try {
            const response = await fetch('https://localhost:7044/api/Img/upload', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error(`שגיאת שרת: ${response.status}`);
            }
            debugger
            const data = await response.json();
            console.log("תגובת השרת להעלאת תמונה:", data); // לוג מפורט של התגובה
            // setUploadingImage(false);

        

            // בדוק אם יש נתיב תמונה בתגובה
            if (data.imageUrl) {
                // setSnackbar({
                //     open: true,
                //     message: 'התמונה הועלתה בהצלחה',
                //     severity: 'success'
                // });
                console.log("נתיב התמונה שהתקבל:", data.imageUrl);
                return data.imageUrl;
            } else {
                console.error("לא התקבל נתיב תמונה בתגובה:", data);
                return null;
            }
        } catch (error) {
            console.error("שגיאה בהעלאת תמונה:", error);
            setUploadingImage(false);
            setSnackbar({
                open: true,
                message: 'שגיאה בהעלאת התמונה',
                severity: 'error'
            });
            return null;
        }
    };
    const closeDialog = () => {
        // אנימציה לסגירת הדיאלוג
        const animation = dialogRef.current.animate(
            [
                { opacity: 1, transform: 'scale(1)' },
                { opacity: 0, transform: 'scale(0.9)' }
            ],
            { duration: 200, easing: 'ease-in' }
        );

        animation.onfinish = () => {
            navigate(`../`);
        };
    };

    // רנדור תוכן הדיאלוג בהתאם לשלב הנוכחי
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <motion.div
                        className="step-content"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className="step-title">פרטים אישיים</h3>

                        <div className="input-group">
                            <div className="input-icon">
                                {/* <Facustomer /> */}
                            </div>
                            <input
                                type="text"
                                className={`auth-input ${errors.managerName ? 'input-error' : ''}`}
                                placeholder="שם משתמש"
                                value={manager.managerName || ""}
                                onChange={e => setManager({ ...manager, managerName: e.target.value })}
                            />
                        </div>
                        {errors.managerName && <div className="error-text">{errors.managerName}</div>}
                        {/*                         
                        <div className="input-group">
                            <div className="input-icon">
                                <Facustomer />
                            </div>
                            <input 
                                type="text" 
                                className={`auth-input ${errors.lastName ? 'input-error' : ''}`}
                                placeholder="שם משפחה"
                                value={manager.lastName}
                                onChange={e => setManager({ ...manager, lastName: e.target.value })}
                            />
                        </div> */}
                        {/* {errors.lastName && <div className="error-text">{errors.lastName}</div>} */}

                        <div className="input-group">
                            <div className="input-icon">
                                {/* <FaIdCard /> */}
                            </div>
                            <input
                                type="text"
                                className={`auth-input ${errors.managerPhone ? 'input-error' : ''}`}
                                placeholder=" מספר פלאפון"
                                value={manager.managerPhone || ""}
                                onChange={e => setManager({ ...manager, managerPhone: e.target.value })}
                            />
                        </div>
                        {errors.managerPhone && <div className="error-text">{errors.managerPhone}</div>}
                        <div className="input-group">
                            <div className="input-icon">
                                {/* <FaEnvelope /> */}
                            </div>
                            <input
                                type="email"
                                className={`auth-input ${errors.managerEmail ? 'input-error' : ''}`}
                                placeholder="כתובת אימייל"
                                value={manager.managerEmail}
                                onChange={e => setManager({ ...manager, managerEmail: e.target.value })}
                            />
                        </div>
                        {errors.managerEmail && <div className="error-text">{errors.managerEmail}</div>}
                        <div className="input-group">
                            <div className="input-icon">
                                {/* <FaPhone /> */}
                            </div>
                            <input
                                type="tel"
                                className={`auth-input ${errors.managerTel ? 'input-error' : ''}`}
                                placeholder='מספר טלפון'
                                value={manager.managerTel}
                                onChange={e => setManager({ ...manager, managerTel: e.target.value })}
                            />
                        </div>
                        {/* {errors.fax && <div className="error-text">{errors.fax}</div>}   */}
                        <div className="input-group">
                            <div className="input-icon">
                                {/* <FaPhone /> */}
                            </div>
                            <input
                                type="tel"
                                className={`auth-input ${errors.managerFax ? 'input-error' : ''}`}
                                placeholder='פקס'
                                value={manager.managerFax}
                                onChange={e => setManager({ ...manager, managerFax: e.target.value })}
                            />
                        </div>
                        {/* {errors.fax && <div className="error-text">{errors.fax}</div>}   */}
                        <div className="input-group">
                            <div className="input-icon">
                                {/* <FaPhone /> */}
                            </div>
                            <input
                                type="text"
                                className={`auth-input ${errors.address ? 'input-error' : ''}`}
                                placeholder="כתובת "
                                value={manager.address}
                                onChange={e => setManager({ ...manager, address: e.target.value })}
                            />
                        </div>
                        {errors.address && <div className="error-text">{errors.address}</div>}
                        <div className="input-group">
                            <div className="input-icon">
                                {/* <FaStethoscope /> */}
                            </div>
                            <select
                                className={`auth-input ${errors.city ? 'input-error' : ''}`}
                                value={manager.city}
                                onChange={e => setManager({ ...manager, city: e.target.value })}
                            >
                                <option value="" disabled> עיר</option>
                                {israeliCities.map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        {errors.city && <div className="error-text">{errors.city}</div>}
                        <div className="info-box">
                            <p>פרטי ההתקשרות שלך ישמשו לשליחת עדכונים ותזכורות לגבי הפגישות שלך.</p>
                        </div>
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div
                        className="step-content"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className="step-title">פרטי העסק</h3>

                        <div className="input-group">
                            <div className="input-icon">
                                {/* <FaEnvelope /> */}
                            </div>
                            <input
                                type="text"
                                className={`auth-input ${errors.compName ? 'input-error' : ''}`}
                                placeholder="שם העסק"
                                value={manager.compName}
                                onChange={e => setManager({ ...manager, compName: e.target.value })}
                            />
                        </div>
                        {errors.compName && <div className="error-text">{errors.compName}</div>}

                        {/* <div className="input-group">
                            <div className="input-icon">
                               <FaPhone /> 
                            </div>
                            <input 
                                type="tel" 
                                className={`auth-input ${errors.phone ? 'input-error' : ''}`}
                                placeholder="טלפון נייד"
                                value={manager.phone}
                                onChange={e => setManager({ ...manager, phone: e.target.value })}
                            />
                        </div>
                        {errors.phone && <div className="error-text">{errors.phone}</div>} */}
                        <div className="input-group">
                            <div className="input-icon">
                                {/* <FaPhone /> */}
                            </div>
                            <input
                                type="text"
                                className={`auth-input ${errors.numOfComp ? 'input-error' : ''}`}
                                placeholder='מספר עסק  '
                                value={manager.numOfComp}
                                onChange={e => setManager({ ...manager, numOfComp: e.target.value })}
                            />
                        </div>
                        {errors.numOfComp && <div className="error-text">{errors.numOfComp}</div>}
                        <div className="input-group">
                            <div className="input-icon">
                                {/* <FaEnvelope /> */}
                            </div>
                            <input
                                type="text"
                                className={`auth-input ${errors.description ? 'input-error' : ''}`}
                                placeholder="תיאור העסק"
                                value={manager.description}
                                onChange={e => setManager({ ...manager, description: e.target.value })}
                            />
                        </div>
                        {errors.description && <div className="error-text">{errors.description}</div>}
                        <div className="input-group">
                            <div className="input-icon">
                                {/* <FaStethoscope /> */}
                            </div>
                            <select
                                className={`auth-input ${errors.kategoty ? 'input-error' : ''}`}
                                value={manager.kategoty}
                                onChange={e => setManager({ ...manager, kategoty: e.target.value })}
                            >
                                <option value="" disabled> קטגוריה</option>
                                {kategoties.map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        {errors.kategoty && <div className="error-text">{errors.kategoty}</div>}
                        <div className="remember-me">
                            <input type="checkbox" id="remember-me" onChange={e => setManager({ ...manager, mOrP: e.target.value == true ? 1 : 0 })} />
                            <label htmlFor="remember-me"> עוסק מורשה</label>
                        </div>
                        <Grid item xs={12}>
                            <Box sx={{ border: '1px dashed', borderColor: 'primary.main', borderRadius: 2, p: 3, textAlign: 'center' }}>
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="product-image-upload"
                                    type="file"
                                    onChange={handleImageSelect}
                                />
                                <label htmlFor="product-image-upload">
                                    <Button
                                        variant="outlined"
                                        component="span"
                                        startIcon={<UploadIcon />}
                                        sx={{ mb: 2 }}
                                    >
                                        בחר תמונה למוצר
                                    </Button>
                                </label>
                                {selectedImage && (
                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="body2" gutterBottom>
                                            נבחרה תמונה: {selectedImage.name}
                                        </Typography>
                                        <Box
                                            component="img"
                                            src={URL.createObjectURL(selectedImage)}
                                            alt="תצוגה מקדימה"
                                            sx={{
                                                maxHeight: 200,
                                                maxWidth: '100%',
                                                objectFit: 'contain',
                                                mt: 1,
                                                borderRadius: 1
                                            }}
                                        />
                                    </Box>
                                )}
                            </Box>
                        </Grid>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div
                        className="step-content"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className="step-title">פרטי חשבון בעל העסק</h3>

                        <div className="input-group">
                            <div className="input-icon">
                                {/* <FaEnvelope /> */}
                            </div>
                            <input
                                type="text"
                                className={`auth-input ${errors.bank ? 'input-error' : ''}`}
                                placeholder="שם  הבנק"
                                value={manager.bank}
                                onChange={e => setManager({ ...manager, bank: e.target.value })}
                            />
                        </div>
                        {errors.bank && <div className="error-text">{errors.bank}</div>}
                        <div className="input-group">
                            <div className="input-icon">
                                {/* <FaEnvelope /> */}
                            </div>
                            <input
                                type="text"
                                className={`auth-input ${errors.bankBranch ? 'input-error' : ''}`}
                                placeholder="מס'  סניף"
                                value={manager.bankBranch}
                                onChange={e => setManager({ ...manager, bankBranch: e.target.value })}
                            />
                        </div>

                        {errors.bankBranch && <div className="error-text">{errors.bankBranch}</div>}
                        <div className="input-group">
                            <div className="input-icon">
                                {/* <FaEnvelope /> */}
                            </div>
                            <input
                                type="text"
                                className={`auth-input ${errors.accountNum ? 'input-error' : ''}`}
                                placeholder="מס' חשבון  "
                                value={manager.accountNum}
                                onChange={e => setManager({ ...manager, accountNum: e.target.value })}
                            />
                        </div>
                        {errors.accountNum && <div className="error-text">{errors.accountNum}</div>}
                        {/* <div className="info-box">
                            <p>פרטי ההתקשרות שלך ישמשו לשליחת עדכונים ותזכורות לגבי הפגישות שלך.</p>
                        </div> */}
                    </motion.div>
                );
            case 4:
                return (
                    <motion.div
                        className="step-content"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className="step-title">הגדרת סיסמה</h3>

                        <div className="input-group">
                            <div className="input-icon">
                                {/* <FaLock /> */}
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                className={`auth-input ${errors.pass ? 'input-error' : ''}`}
                                placeholder="בחר סיסמה"
                                value={manager.pass}
                                onChange={e => setManager({ ...manager, pass: e.target.value })}
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "הסתר סיסמה" : "הצג סיסמה"}
                            >
                                {/* {showPassword ? <FaEyeSlash /> : <FaEye />} */}
                            </button>
                        </div>
                        {errors.password && <div className="error-text">{errors.password}</div>}

                        <div className="input-group">
                            <div className="input-icon">
                                {/* <FaLock /> */}
                            </div>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className={`auth-input ${errors.confirmPassword ? 'input-error' : ''}`}
                                placeholder="אימות סיסמה"
                                value={manager.confirmPassword}
                                onChange={e => setManager({ ...manager, confirmPassword: e.target.value })}
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                aria-label={showConfirmPassword ? "הסתר סיסמה" : "הצג סיסמה"}
                            >
                                {/* {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} */}
                            </button>
                        </div>
                        {errors.confirmPassword && <div className="error-text">{errors.confirmPassword}</div>}

                        <div className="password-strength">
                            <div className="strength-label">חוזק הסיסמה:</div>
                            <div className="strength-meter">
                                <div
                                    className={`strength-indicator ${!manager.password ? 'empty' :
                                        manager.password.length < 6 ? 'weak' :
                                            manager.password.length < 8 ? 'medium' : 'strong'
                                        }`}
                                    style={{
                                        width: !manager.password ? '0%' :
                                            manager.password.length < 6 ? '33%' :
                                                manager.password.length < 8 ? '66%' : '100%'
                                    }}
                                ></div>
                            </div>
                            <div className="strength-text">
                                {!manager.password ? '' :
                                    manager.password.length < 6 ? 'חלשה' :
                                        manager.password.length < 8 ? 'בינונית' : 'חזקה'}
                            </div>
                        </div>

                        <div className="info-box">
                            <p>מומלץ להשתמש בסיסמה הכוללת אותיות, מספרים וסימנים מיוחדים.</p>
                        </div>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <dialog className="auth-dialog register-dialog" ref={dialogRef}>
            <div className="auth-container">
                <div className="auth-header">
                    <h2 className="auth-title">הרשמה למערכת</h2>
                    <button
                        className="close-button"
                        onClick={closeDialog}
                        aria-label="סגור"
                    >
                        ×
                    </button>
                </div>

                <div className="auth-content">
                    <div className="logo-container1">
                        <img src={process.env.PUBLIC_URL + "/start.jpg"} alt="לוגו " className="auth-logo" />
                    </div>

                    <div className="form-container">
                        <AnimatePresence mode="wait">
                            {registrationSuccess ? (
                                <motion.div
                                    className="success-message"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="success-icon">✓</div>
                                    <h3>ההרשמה הושלמה בהצלחה!</h3>
                                    <p>מיד תועבר למסך ההתחברות...</p>
                                </motion.div>
                            ) : (
                                <>
                                    <div className="steps-indicator">
                                        {[1, 2, 3,4].map(step => (
                                            <div
                                                key={step}
                                                className={`step-dot ${currentStep >= step ? 'active' : ''} ${currentStep === step ? 'current' : ''}`}
                                                onClick={() => {
                                                    if (step < currentStep) {
                                                        setCurrentStep(step);
                                                    }
                                                }}
                                            >
                                                {step}
                                            </div>
                                        ))}
                                    </div>

                                    <AnimatePresence mode="wait">
                                        {renderStepContent()}
                                    </AnimatePresence>

                                    {errors.submit && (
                                        <div className="error-message">{errors.submit}</div>
                                    )}

                                    <div className="form-buttons">
                                        {currentStep > 1 && (
                                            <motion.button
                                                className="secondary-button1"
                                                onClick={handlePrevStep}
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                            >
                                                הקודם
                                            </motion.button>
                                        )}

                                        {currentStep < 4 ? (
                                            <motion.button
                                                className="auth-button"
                                                onClick={handleNextStep}
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                            >
                                                הבא
                                            </motion.button>
                                        ) : (
                                            <motion.button
                                                className="auth-button"
                                                onClick={handleRegister}
                                                disabled={isLoading}
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                            >
                                                {isLoading ? (
                                                    <div className="loader"></div>
                                                ) : (
                                                    "הירשם"
                                                )}
                                            </motion.button>
                                        )}
                                    </div>
                                </>
                            )}
                        </AnimatePresence>

                        {!registrationSuccess && (
                            <div className="auth-links">
                                <p>כבר רשום למערכת?</p>
                                <motion.button
                                    className="link-button"
                                    onClick={() => navigate(`/login`)}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    התחבר עכשיו
                                </motion.button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </dialog>
    );
};