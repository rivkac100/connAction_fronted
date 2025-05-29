// // בס"ד

// import { DayView } from "../DayView/dayView";
// import { Week } from "./Week";
// import { useEffect, useState } from 'react'
// import './calendar.css'
// import { Outlet, useNavigate, useParams } from 'react-router-dom';
// // import { useSelector, useDispatch } from "react-redux";
// // import { eventFetchThunk } from '../../store/slices/eventFetchThunk';

// import { Button } from '@mui/material';
// import StarsIcon from '@mui/icons-material/Stars';
// import IconButton from '@mui/material/IconButton';
// import TimerSharpIcon from '@mui/icons-material/TimerSharp';
// import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
// import AddPhotoAlternateSharpIcon from '@mui/icons-material/AddPhotoAlternateSharp';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import DateRangeIcon from '@mui/icons-material/DateRange';
// import { useDispatch, useSelector } from "react-redux";
// import { eventFetchThunk } from "../../store/slices/events/eventFetchThunk";
// import { customersFetchThunkById } from "../../store/slices/customers/customerFetchThunkById";
// import { ordersFetchThunk } from "../../store/slices/orders/ordersFetch";

// export const Month = ({ }) => {
//     debugger
//     const parms = useParams();
//     const navigate = useNavigate();
//     const [currentDate, setCurrentDate] = useState(new Date());
//     const [myView, setMyView] = useState("תצוגה חודשית")
//     const [notview, setNotView] = useState("תצוגה שבועית")
//     const [dayView, setDayView] = useState(0)
//     const myOrders = useSelector(state => state.customer.MyOrders);
//     const orders = useSelector(state => state.order.orders)
//     // 'month' or 'week'
//     const [dayDate, setDayDate] = useState(new Date(2025, 2, 24))
//     //const patients = useSelector(state => state.PatientSlice.patientsList)
//     const [monthName, setMonthName] = useState("")
//     const dispatch = useDispatch();
//     // const username = useSelector(state => state.user.userName)
//     const events = useSelector(state => state.events.events);

//     useEffect(() => {
//         if (events?.length == 0) dispatch(eventFetchThunk())
//     }, [events])
//     useEffect(() => {
//         if (myOrders?.length == 0) dispatch(customersFetchThunkById({ id: parseInt(parms.id) }))
//     }, [myOrders])
//     useEffect(() => {
//         if (orders?.length == 0) dispatch(ordersFetchThunk())
//     }, [orders])
//     const goToNextMonth = () => {
//         setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
//     };

//     const goToPrevMonth = () => {
//         setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
//     };
//     const newEvent = () => {

//         navigate(`/home/${parms.id}/event`)
//     };
//     const newOrder = () => {
//         navigate(`/newOrder`)
//     }
//     // const goToNextWeek = () => {
//     //     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7));
//     // };

//     // const goToPrevWeek = () => {
//     //     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7));
//     // };
//     const changeView = (view) => {
//         if (view === 'תצוגה שבועית') {
//             setMyView('תצוגה חודשית')
//             setNotView('תצוגה שבועית')
//         }
//         else {
//             setMyView('תצוגה שבועית')
//             setNotView('תצוגה חודשית')
//         }
//     }
//     const toDay = () => {
//         // setCount(0)
//         // myDate()
//         setCurrentDate(new Date());
//     }
//     const openDayWiew = (day) => {
//         // setDayView(day)
//         // if(dayView===day){
//         //     navigate(`day/${day.getDate()}/${day.getMonth()+1}/${day.getFullYear()}`)
//         // }
//         navigate(`/home/${parms.id}/day/${day.getDate()}/${day.getMonth() + 1}/${day.getFullYear()}`)

//     }

//     const splitToDate = (d) => {
//         const s = d.split("/");
//         console.log(s);
//         if (parseInt(s[0]) < 10)
//             s[0] = "0" + s[0];
//         if (parseInt(s[1]) < 10)
//             s[1] = "0" + s[1];
//         d = s[2] + "-" + s[0] + "-" + s[1];
//         console.log(d);
//         return d;
//     }
//     const renderMonthDays = () => {

//         // Get the first day of the month
//         const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

//         // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
//         const firstDayWeekday = firstDayOfMonth.getDay();

//         // Calculate the number of days in the month
//         const daysInMonth = new Date(
//             currentDate.getFullYear(),
//             currentDate.getMonth() + 1,
//             0
//         ).getDate();

//         const weekDays = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

//         // Create calendar cells array
//         const calendarCells = [];
//         // const eventToDay=[]
//         // Add weekday headers
//         weekDays.forEach(day => {
//             calendarCells.push(
//                 <div key={`header-${day}`} style={{

//                     // backgroundColor: '#4CAF50',
//                     color: 'white',
//                     height: '4vh',
//                     padding: "10px",
//                     textAlign: 'center',
//                     fontWeight: 'bold',
//                     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                     borderRadius: '5px'
//                 }}>
//                     {day}
//                     {/* {eventToDay} */}
//                 </div>
//             );
//         });

//         // Add empty cells for days before the first day of the month
//         for (let i = 0; i < firstDayWeekday; i++) {
//             calendarCells.push(
//                 <div key={`empty-${i}`} style={{
//                     border: "1px solid #eee",
//                     padding: "10px",
//                     height: '4vh',
//                     textAlign: 'center',
//                     borderRadius: '5px',
//                     backgroundColor: '#f9f9f9'
//                 }}></div>
//             );
//         }

//         // Add cells for each day of the month
//         const today = new Date();
//         for (let day = 1; day <= daysInMonth; day++) {
//             debugger
//             const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
//             const isToday =
//                 date.getDate() === today.getDate() &&
//                 date.getMonth() === today.getMonth() &&
//                 date.getFullYear() === today.getFullYear();
//             debugger
//             const eventToday = []
//             const ordersToday = []
//             const otherOrders=[]
//             events.forEach(ev => {
//                 ev.date === splitToDate(date.toLocaleDateString()) &&
//                 eventToday.push(
//                     <div key={ev.id} style={{
//                         border: "solid 2px black"
//                     }}>
//                         {ev.time}
//                         <br />
//                         {ev.time}
//                     </div>
//                 )
//             })
//             myOrders.forEach(o => {
//                 o.date === splitToDate(date.toLocaleDateString()) &&
//                 ordersToday.push(
//                     <div key={o.orderId} style={{
//                         border: "solid 2px black"
//                     }}>
//                         {o.activeHour}
//                         <br />
//                         {o.activityName}
//                         <br />
//                         {o.customerName}
//                           {/* <IconButton  aria-label="edit" size='large' >
//                         <StarsIcon htmlColor=' #3b3a3d' />
//                     </IconButton> */}
//                     </div>
//                 )
//             })
//             orders.forEach(o => {
//                 (o.date === splitToDate(date.toLocaleDateString()) && o.customerId!==parseInt(parms.id) )&&
//                 otherOrders.push(
//                     <div key={o.orderId} style={{
//                         border: "solid 2px black"
//                     }}>
//                         {o.activeHour}
//                         <br />
//                         {o.activityName}
//                         <br />
//                         {o.customerName}
//                           {/* <IconButton  aria-label="edit" size='large' >
//                         <StarsIcon htmlColor=' #3b3a3d' />
//                     </IconButton> */}
//                     </div>
//                 )
//             })
//             calendarCells.push(

//                 <div onClick={() => { setDayDate(date); setMonthName(monthNames[date.getMonth()]); openDayWiew(date); }}
//                     key={`day-${day}`} style={{
//                         border: "1px solid #ccc",
//                         padding: "10px",
//                         textAlign: 'center',
//                         height: '4vh',
//                         borderRadius: '5px',
//                         color: isToday ? 'white' : 'black',
//                         backgroundColor: isToday ? '#764ba2' : 'white'
//                     }}>
//                     {day}
//                     <></>{( ordersToday?.length >0) &&
//                     <IconButton  aria-label="edit" size='small' >
//                         <StarsIcon htmlColor={isToday?'white':'goldenrod'} />
//                     </IconButton>}
//                     {(eventToday?.length>0 || otherOrders?.length >0) &&
//                     <IconButton  aria-label="edit" size='small' >
//                         <PlaylistAddCheckCircleIcon htmlColor={isToday?'white':'silver'} />
//                     </IconButton>}
//                     {/* {eventToday}
//                     {ordersToday} */}
//                     {/* {alert(day)} */}


//                     <div>

//                     </div>
//                 </div>
//             );
//         }







//         return (

//             <div style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(7, 1fr)",
//                 gap: "5px"
//             }}>

//                 {calendarCells}
//             </div>
//         );
//     };

//     const monthNames = [
//         'ינואר', 'פבואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
//         'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
//     ];

//     return (<>


//         {myView === 'תצוגה חודשית' && <>
//             <Button variant="contained" className='button' onClick={() => {
//                 changeView(myView); //navigate(`home/${param.id}/calandar`) 
//             }} endIcon={<DateRangeIcon />}>{notview}
//             </Button>
//             <Button variant="contained" onClick={() => newEvent()} className='button cal-button' endIcon={<AddPhotoAlternateSharpIcon />}>
//                 ארוע חדש
//             </Button>

//             <Button variant="contained" onClick={() => goToPrevMonth()} className='button cal-button' endIcon={<ArrowBackIosIcon />}>

//             </Button>
//             <Button variant="contained" onClick={() => goToNextMonth()} className='button cal-button' endIcon={<ArrowForwardIosIcon />}>

//             </Button>

//             <Button variant="contained" onClick={() => toDay()} className='button cal-button' endIcon={<TimerSharpIcon />}>
//                 לתאריך הנוכחי
//             </Button>
//             <div style={{
//                 padding: "20px",
//                 border: "3px solid #764ba2",
//                 height: "55vh",
//                 margin: "5% 20%",
//                 width: "60%",
//                 borderRadius: "10px",
//                 // boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
//             }}>
//                 <h2 style={{ textAlign: 'center' }}>
//                     {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
//                 </h2>

//                 {renderMonthDays()}

//             </div></>
//         }
//         {myView === "תצוגה שבועית" &&
//             navigate(`/home/${parms.id}/week`)
//         }
//         <div><Outlet></Outlet></div>
//     </>
//     );
// };

import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { eventFetchThunk } from "../../store/slices/events/eventFetchThunk";
import { customersFetchThunkById } from "../../store/slices/customers/customerFetchThunkById";
import { ordersFetchThunk } from "../../store/slices/orders/ordersFetch";
import { DayView } from "../DayView/dayView";
import { Week } from "./Week";



// MUI Components
import {
    Button,
    IconButton,
    Paper,
    Typography,
    Tooltip,
    Box,
    Divider,
    Container,
    Grid,
    Badge,
    Card,
    CardContent,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Fab,
    Zoom,
    useMediaQuery,
    useTheme,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,

} from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AddPhotoAlternateSharpIcon from '@mui/icons-material/AddPhotoAlternateSharp';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TimerSharpIcon from '@mui/icons-material/TimerSharp';
import StarsIcon from '@mui/icons-material/Stars';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


import './calendar.css';
import { managersFetchThunkById } from "../../store/slices/managers/managerFetchThunkById";
import { ordersByMangerIdThunk } from "../../store/slices/managers/ordersByMangerIdThunk";

export const Month = () => {
    const parms = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // State variables
    const [currentDate, setCurrentDate] = useState(new Date());
    const [myView, setMyView] = useState("תצוגה חודשית");
    const [notview, setNotView] = useState("תצוגה שבועית");
    const [dayView, setDayView] = useState(0);
    const [dayDate, setDayDate] = useState(new Date(2025, 2, 24));
    const [monthName, setMonthName] = useState("");
    const [isAnimating, setIsAnimating] = useState(false);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [eventView, setEventView] = useState(false);
    const [orderView, setOrderView] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    // Redux selectors
    const manager = useSelector(state => state.manager.myManager);
    const myOrders = useSelector(state => state.manager.MyOrders);
    // const orders = useSelector(state => state.order.orders);
    const events = useSelector(state => state.manager.MyEvents);


    // Fetch data on component mount


    useEffect(() => {
        if (myOrders?.length == 0) dispatch(ordersByMangerIdThunk({ id: parseInt(parms.mid) }));
    }, [myOrders.length == 0, dispatch, parms.mid]);

    // useEffect(() => {
    //     // if(orders?.length == 0) dispatch(ordersFetchThunk());
    // }, [orders, dispatch]);

    // Navigation functions
    const handleMenuOpen = (event) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };
    const goToNextMonth = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
            setIsAnimating(false);
        }, 300);
    };

    const goToPrevMonth = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
            setIsAnimating(false);
        }, 300);
    };

    const toDay = () => {
        setCurrentDate(new Date());
    };

    // View change functions
    const changeView = (view) => {
        if (view === 'תצוגה שבועית') {
            setMyView('תצוגה חודשית');
            setNotView('תצוגה שבועית');
        } else {
            setMyView('תצוגה שבועית');
            setNotView('תצוגה חודשית');
        }
    };

    // Action functions
    const newEvent = () => {
        navigate(`newEvent`);
    };

    const openDayWiew = (day) => {
        navigate(`day/${day.getDate()}/${day.getMonth() + 1}/${day.getFullYear()}`);
    };

    // Helper functions
    const splitToDate = (d) => {
        const s = d.split("/");
        if (parseInt(s[0]) < 10)
            s[0] = "0" + s[0];
        if (parseInt(s[1]) < 10)
            s[1] = "0" + s[1];
        d = s[2] + "-" + s[0] + "-" + s[1];
        return d;
    };

    // Export to PDF function using browser's print functionality
    const exportToPDF = () => {
        // Create a new window for printing
        const printWindow = window.open('', '_blank');

        // Generate calendar HTML for printing
        const monthNames = [
            'ינואר', 'פבואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
            'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
        ];

        const weekDays = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

        // Calculate days in month
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const firstDayWeekday = firstDayOfMonth.getDay();
        const daysInMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
        ).getDate();

        // Generate calendar HTML
        let calendarHTML = `
            <html dir="rtl">
            <head>
                <title>לוח שנה - ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    .calendar-title { text-align: center; margin-bottom: 20px; }               
                                display: grid; 
                                grid-template-columns: repeat(7, 1fr);
                                gap: 8px;
                                border: 1px solid #e0e0e0;
                            }
                            .weekday-header { 
                                background-color: #f5f5f5; 
                                padding: 8px; 
                                text-align: center;
                                font-weight: bold;
                                border-bottom: 1px solid #e0e0e0;
                            }
                            .calendar-day { 
                                min-height: 80px; 
                                padding: 8px; 
                                border: 1px solid #f0f0f0;
                                text-align: right;
                            }
                            .day-number { font-weight: bold; }
                            .today { background-color: rgba(0, 188, 212, 0.1); border: 1px solid #b60557; }
                            .event-marker { 
                                display: inline-block;
                                width: 10px;
                                height: 10px;
                                border-radius: 50%;
                                margin-right: 5px;
                            }
                            .my-order { background-color: #b60557; }
                            .event { background-color: #757575; }
                            .other-order { background-color: #e0e0e0; }
                            .legend { 
                                display: flex;
                                justify-content: center;
                                gap: 20px;
                                margin-top: 20px;
                            }
                            .legend-item {
                                display: flex;
                                align-items: center;
                                gap: 5px;
                            }
                            @media print {
                                body { font-size: 12px; }
                                .calendar-grid { page-break-inside: avoid; }
                            }
                        </style>
                    </head>
                    <body>
                        <h1 class="calendar-title">לוח שנה - ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}</h1>
                        <div class="calendar-grid">
                `;

        // Add weekday headers
        weekDays.forEach(day => {
            calendarHTML += `<div class="weekday-header">${day}</div>`;
        });

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDayWeekday; i++) {
            calendarHTML += `<div class="calendar-day"></div>`;
        }

        // Add cells for each day of the month
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const isToday =
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear();

            const formattedDate = splitToDate(date.toLocaleDateString());

            // Check for events and orders
            const hasMyOrders = myOrders.some(o => o.date === formattedDate);
            const hasEvents = events.some(ev => ev.date === formattedDate);
            // const hasOtherOrders = orders.some(o => o.date === formattedDate && o.customerId !== parseInt(parms.id));

            calendarHTML += `
                        <div class="calendar-day ${isToday ? 'today' : ''}">
                            <div class="day-number">${day}</div>
                            <div>
                                ${hasMyOrders ? '<span class="event-marker my-order"></span>' : ''}
                                ${hasEvents ? '<span class="event-marker event"></span>' : ''}
                                ${/* hasOtherOrders ? '<span class="event-marker other-order"></span>' : '' */''}
                            </div>
                        </div>
                    `;
        }

        calendarHTML += `
                        </div>
                        <div class="legend">
                            <div class="legend-item">
                                <span class="event-marker my-order"></span>
                                <span>הזמנות שלי</span>
                            </div>
                            <div class="legend-item">
                                <span class="event-marker event"></span>
                                <span>אירועים</span>
                            </div>
                            <div class="legend-item">
                                <span class="event-marker other-order"></span>
                                <span>הזמנות אחרות</span>
                            </div>
                        </div>
                    </body>
                    </html>
                `;

        // Write HTML to the new window
        printWindow.document.open();
        printWindow.document.write(calendarHTML);
        printWindow.document.close();

        // Wait for content to load then print
        printWindow.onload = function () {
            printWindow.print();
        };
    };

    // Render calendar days
    const renderMonthDays = () => {
        // Get the first day of the month
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
        const firstDayWeekday = firstDayOfMonth.getDay();
        // Calculate the number of days in the month
        const daysInMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
        ).getDate();

        const weekDays = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
        const calendarCells = [];

        // Add weekday headers
        weekDays.forEach(day => {
            calendarCells.push(
                <div key={`header-${day}`} className="weekday-header">
                    {day}
                </div>
            );
        });

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDayWeekday; i++) {
            calendarCells.push(
                <div key={`empty-${i}`} className="calendar-day empty"></div>
            );
        }

        // Add cells for each day of the month
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const isToday =
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear();

            // Check for events and orders on this day
            const formattedDate = splitToDate(date.toLocaleDateString());
            const eventsToday = events.filter(ev => ev.date === formattedDate);
            const ordersToday = myOrders.filter(o => o.date === formattedDate);
            // const otherOrdersToday = orders?.filter(o => o.date === formattedDate && o.customerId !== parseInt(parms.id));

            calendarCells.push(
                <div
                    onClick={() => {
                        setDayDate(date);
                        setMonthName(monthNames[date.getMonth()]);
                        // openDayWiew(date);
                    }}
                    key={`day-${day}`}
                    className={`calendar-day ${isToday ? 'today' : ''}`}
                >
                    <div className="day-number">
                        {day}
                        <div>
                            {ordersToday.length > 0 && (
                                <StarsIcon style={{
                                    fontSize: '0.9rem',
                                    color: '#b60557',
                                    marginLeft: '2px'
                                }} 
                                onClick={()=>{setOrderView(true);setOpenDialog(true)}}/>
                               
                            )}
                            {eventsToday.length > 0 && (
                                <PlaylistAddCheckCircleIcon style={{
                                    fontSize: '0.9rem',
                                    color: '#757575',
                                    marginLeft: '2px'
                                }} 
                                onClick={()=>{setEventView(true);setOpenDialog(true)}}/>
                            )}
                           {eventView && < Dialog
                                open={openDialog}
                                onClose={() => setOpenDialog(false)}
                            >
                                <DialogTitle>אירועים ליום זה 

                                </DialogTitle>
                                { eventsToday.map((o)=>{
                                       
                                       <div 
                                       // key={`event-${event.id}`}
                                       className={ 'today' }
                                     
                                   >
                                       <div className="time">{o.title}</div>
                                       <div className="title">{o.description}</div>
                                   </div>
                                    })}
                                <DialogContent>
                                <DialogContentText>
                                      { eventsToday.map((o)=>{
                                       
                                        <div 
                                        // key={`event-${event.id}`}
                                        className={ 'today' }
                                      
                                    >
                                        <div className="time">{o.title}</div>
                                        <div className="title">{o.description}</div>
                                    </div>
                                     })}
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                 
                                    <Button onClick={() => setOpenDialog(false)} color="primary">
                                        ביטול
                                    </Button>
                                  
                                </DialogActions>
                            </Dialog>}
                            {orderView &&<Dialog
                                open={openDialog}
                                onClose={() => setOpenDialog(false)}
                            >
                                <DialogTitle>הזמנות ליום זה  </DialogTitle>
                                { ordersToday.map((o)=>{
                                        <div 
                                        // key={`event-${event.id}`}
                                        className={ 'today' }
                                      
                                    >
                                        <div className="time">{o.activityName}</div>
                                        <div className="title">{o.customerName}</div>
                                    </div>
                                     })}
                                <DialogContent>
                                    <DialogContentText>
                                      { ordersToday.map((o)=>{
                                        <div 
                                        // key={`event-${event.id}`}
                                        className={ 'today' }
                                      
                                    >
                                        <div className="time">{o.activityName}</div>
                                        <div className="title">{o.customerName}</div>
                                    </div>
                                     })}
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                               
                                    <Button onClick={() => setOpenDialog(false)} color="primary">
                                       חזור
                                    </Button>
                                    {/* <Button onClick={handleDeleteConfirm} color="error" autoFocus>
                                        מחיקה
                                    </Button> */}
                                </DialogActions>
                            </Dialog>}
                        </div>
                    </div>

                    <div className="day-content">
                        {ordersToday.length > 0 && (
                            <div className="event-indicator my-order"></div>
                        )}
                        {eventsToday.length > 0 && (
                            <div className="event-indicator event"></div>
                        )}
                        {/* {otherOrdersToday.length > 0 && (
                                    <div className="event-indicator other-order"></div>
                                )} */}
                    </div>
                </div>
            );
        }

        return (
            <div className={`calendar-grid ${isAnimating ? 'fade-exit-active' : 'fade-enter-active'}`}>
                {calendarCells}
            </div>
        );
    };

    const monthNames = [
        'ינואר', 'פבואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
        'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
    ];

    return (
        <div className="calendar-container">
            {/* Menu Bar */}
            <div className="menu-bar">
                <div className="menu-title">
                    <CalendarMonthIcon />
                    <span>לוח שנה</span> | מערכת הזמנת תוכניות והפקות
                </div>
                <div className="menu-actions">
                    {/* <button className="menu-button" onClick={() => navigate(`/home/${parms.id}`)}>
                                <MenuIcon />
                                תפריט ראשי
                            </button> */}
                    <button className="menu-button primary" onClick={newEvent}>
                        <AddPhotoAlternateSharpIcon />
                        אירוע חדש
                    </button>
                    <button className="menu-button primary" onClick={() => navigate("newOrder")}>
                        <AddPhotoAlternateSharpIcon />
                        הזמנה חדשה
                    </button>
                    <IconButton
                        aria-label="more options"
                        onClick={handleMenuOpen}
                        sx={{
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            color: 'white'

                        }}
                    >
                        <MoreVertIcon />
                    </IconButton>

                    <Menu
                        anchorEl={menuAnchorEl}
                        open={Boolean(menuAnchorEl)}
                        onClose={handleMenuClose}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={() => { handleMenuClose(); navigate(`/profile/${parms.id}`); }}>
                            <ListItemIcon>
                                <PersonIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="פרופיל" />
                        </MenuItem>
                        <MenuItem onClick={() => { handleMenuClose(); navigate(`/settings/${parms.id}`); }}>
                            <ListItemIcon>
                                <SettingsIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="הגדרות" />
                        </MenuItem>
                        <MenuItem onClick={() => { handleMenuClose(); navigate(`/help`); }}>
                            <ListItemIcon>
                                <HelpOutlineIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="עזרה" />
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={() => { handleMenuClose(); exportToPDF(); }}>
                            <ListItemIcon>
                                <FileDownloadIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="ייצוא PDF" />
                        </MenuItem>
                    </Menu>
                </div>
            </div>

            {myView === 'תצוגה חודשית' && (
                <div className="calendar-paper">
                    {/* Calendar Header */}
                    <div className="calendar-header">
                        <h2 className="calendar-title">
                            {monthNames[currentDate.getMonth()]} <span>{currentDate.getFullYear()}</span>
                        </h2>

                        <div>
                            <button className={`nav-button ${myView === 'תצוגה חודשית' ? 'active' : ''}`} onClick={() => changeView(myView)}>
                                <DateRangeIcon />
                                {notview}
                            </button>
                            <button className="nav-button" onClick={exportToPDF}>
                                <FileDownloadIcon />
                                ייצוא PDF
                            </button>
                        </div>
                    </div>

                    {/* Calendar Navigation */}
                    <div className="calendar-nav">
                        <button className="arrow-button" onClick={goToPrevMonth}>
                            <ArrowBackIosIcon style={{ fontSize: '1rem' }} />
                        </button>

                        <button className="nav-button today" onClick={toDay}>
                            <TimerSharpIcon />
                            היום
                        </button>

                        <button className="arrow-button" onClick={goToNextMonth}>
                            <ArrowForwardIosIcon style={{ fontSize: '1rem' }} />
                        </button>
                    </div>

                    {/* Calendar Grid */}
                    {renderMonthDays()}

                    {/* Legend */}
                    <div className="calendar-legend">
                        <div className="legend-item">
                            <div className="legend-color my-order"></div>
                            <span>הזמנות שלי</span>
                        </div>
                        <div className="legend-item">
                            <div className="legend-color event"></div>
                            <span>אירועים</span>
                        </div>
                        <div className="legend-item">
                            <div className="legend-color other-order"></div>
                            <span>הזמנות אחרות</span>
                        </div>
                    </div>
                    <Button variant='contained' className='nav-button' onClick={() => navigate(`/manager/${parms.mid}`)}>back</Button>

                </div>
            )}

            {myView === "תצוגה שבועית" && navigate(`/manager/${parms.mid}/week`)}

            <div><Outlet></Outlet></div>
        </div>
    );
};


