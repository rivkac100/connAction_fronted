// // בס"ד
// import Face3OutlinedIcon from '@mui/icons-material/Face3Outlined';
// //import { useSelector } from 'react-redux'
// import './dayView.css'
// import { useDispatch } from 'react-redux'
// import { useEffect, useRef, useState } from 'react'
// //import { getAllStartAQueuesThunk } from '../../redux/slices/queueSlice/getAllStartAvialableQueue'
// import { useNavigate, useParams } from 'react-router-dom';

// export const DayView = () => {
//     // const { date, monthName  , setMonthName} = props
//     const daysAtHebrew = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'שבת']
//     // const aQ = useSelector(state => state.QueuesSlice.listStartAQueue)
//     //const fixedQueues = useSelector(state => state.QueuesSlice.listOfQueues)
//     //const allPatients = useSelector(state => state.PatientSlice.patientsList)
//     const parms=useParams()
//     console.log(parms.day+"//"+parms.month+"//"+parms.year);
//     const [date,setDate]=useState(new Date(parms.year,parms.month-1,parms.day))
//     const dispatch = useDispatch()
//     const [aqToday, setAqToday] = useState([])
//     const [fqToday, setFqToday] = useState([])
//     const navi = useNavigate()
//     const refDialog=useRef()
//     const monthNames = [
//         'ינואר', 'פבואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
//         'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
//     ];
//     let qType = 'o'
//     // useEffect(() => {
//     //     // setAqToday(aQ.filter(aq => new Date(aq.queue.date).toLocaleDateString() == date.toLocaleDateString()))
//     //     // setFqToday(fixedQueues.filter(fq => new Date(fq.date).toLocaleDateString() == date.toLocaleDateString()))
//     // }, [aQ, date])

//     useEffect(() => {
//         refDialog.current.showModal();
//         // alert(date.toLocaleDateString())
//         debugger
//        // dispatch(getAllStartAQueuesThunk())
//     }, [])

// //console.log(allPatients , 'allllllllllll');
//   const  back=()=>{
//     debugger
//     // alert(parms.id)
//     refDialog.current.close();
//     navi(`/home/${parms.id}/month`)
//   }
//     const hours = [
//         { hour: 0, hourString: "00:00" },
//         { hour: 1, hourString: "01:00" },
//         { hour: 2, hourString: "02:00" },
//         { hour: 3, hourString: "03:00" },
//         { hour: 4, hourString: "04:00" },
//         { hour: 5, hourString: "05:00" },
//         { hour: 6, hourString: "06:00" },
//         { hour: 7, hourString: "07:00" },
//         { hour: 8, hourString: "08:00" },
//         { hour: 9, hourString: "09:00" },
//         { hour: 10, hourString: "10:00" },
//         { hour: 11, hourString: "11:00" },
//         { hour: 12, hourString: "12:00" },
//         { hour: 13, hourString: "13:00" },
//         { hour: 14, hourString: "14:00" },
//         { hour: 15, hourString: "15:00" },
//         { hour: 16, hourString: "16:00" },
//         { hour: 17, hourString: "17:00" },
//         { hour: 18, hourString: "18:00" },
//         { hour: 19, hourString: "19:00" },
//         { hour: 20, hourString: "20:00" },
//         { hour: 21, hourString: "21:00" },
//         { hour: 22, hourString: "22:00" },
//         { hour: 23, hourString: "23:00" }]
//     //console.log(fixedQueues, 'oooooo');
//     const add = (q) => {
//         console.log(qType, "ttttttttyyyyyppppppeeee");
//         let q1 = JSON.stringify(q)
//         navi('/addQueue/' + q1 + "/" + qType)
//     }

//     return <dialog  className='dayView' ref={refDialog}>

//         <h1 className='h'>{monthNames[date.getMonth()]} {date.getFullYear()}</h1>

//         <section className='dayHead'>
//             <h2 className='dayNum'>יום {daysAtHebrew[(date.getDay())]}</h2>
//             <h2 className='dayNum'>{date.getDate()}</h2>
//         </section>
//         <header className='day'>
//             {hours && hours.map(h => {

//                     var coll = aqToday.find(q => q.queue.hour === h.hour)
//                     var col = coll != null ? 'salmon' : 'white'
//                     debugger
//                     var aq = aqToday.find(q => q.queue.hour === h.hour)
//                     var fixedQ = fqToday.find(fq => fq.startHour === h.hour)
//                 //     if (fixedQ)
//                 //         col = 'yellow'

//                 // }

//                 return <section className='rowHour'
//                     style={{ backgroundColor: col }}>
//                     {
//                         aq?.queue !== undefined ?
//                             <>
//                                 {aq?.queue !== undefined && aq?.flagWoman === true && <button onClick={() => { qType = 'w'; add(aq.queue) }} className='toAddQ'><Face3OutlinedIcon></Face3OutlinedIcon></button>}
//                                 {aq?.queue !== undefined && aq?.flagDouble === true && <button onClick={() => { qType = 'd'; add(aq.queue) }} className='toAddQ'>💢</button>}
//                                 <button className='toAddQ' onClick={() => add(aq.queue)}>+</button>
//                             </> : ""}
//                     {fixedQ?.id !== undefined ?
//                         <>

//                             {/* <p>{allPatients.find(p => p.id == fixedQ.idPatient)?.firstName} {allPatients.find(p => p.id == fixedQ.idPatient)?.lastName} {fixedQ.description}</p> */}

//                         </>
//                         : ""}

//                     <p className='hour' >{h.hourString}</p>
//                 </section>
//             })}

//         </header>
//         <button onClick={()=> {//setMonthName("");
//         back()}}>close</button>
//     </dialog>
// }
// בס"ד
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

// Icons
import Face3OutlinedIcon from '@mui/icons-material/Face3Outlined';
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import './dayView.css';
import { findManagerThunk } from '../../store/slices/managers/findManagerThunk';
import { managersFetchThunkById } from '../../store/slices/managers/managerFetchThunkById';

export const DayView = () => {
    const daysAtHebrew = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'שבת'];
    const parms = useParams();
    const [date, setDate] = useState(new Date(parms.year, parms.month - 1, parms.day));
    const dispatch = useDispatch();
    const [eventToday, setEventToday] = useState([]);
    //const [orderToDay, setOrderToday] = useState([]);
    const navi = useNavigate();
    const refDialog = useRef();
    const manager = useSelector((state) => state.manager.myManager);
    const events = useSelector((state) => state.manager.MyEvents);
    const monthNames = [
        'ינואר', 'פבואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
        'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
    ];

    let qType = 'o';

    useEffect(() => {
        debugger
        if (!manager.id) {
            dispatch(managersFetchThunkById({ id: parms.mid }));

            console.log(manager);
            console.log(events);
            const formattedDate = splitToDate(date.toLocaleDateString());
            setEventToday(events.filter(ev => ev.date === formattedDate));
            console.log(eventToday);
        }
        refDialog.current.showModal();

        // dispatch(getAllStartAQueuesThunk())
    }, []);
    const splitToDate = (d) => {
        const s = d.split("/");
        if (parseInt(s[0]) < 10)
            s[0] = "0" + s[0];
        if (parseInt(s[1]) < 10)
            s[1] = "0" + s[1];
        d = s[2] + "-" + s[0] + "-" + s[1];
        return d;
    };
   const splitToHour=(d)=>{
    const s = d.split(":");
        if (parseInt(s[0]) < 10)
            s[0] = "0" + s[0];
        if (parseInt(s[1]) < 10)
            s[1] = "0" + s[1];
        d = s[0] + ":" + s[1] + ":00";
        
        return parseInt(s[0]);
   }
    const back = () => {
        refDialog.current.close();
        navi(-1);
    };

    const hours = [
        { hour: 0, hourString: "00:00:00" },
        { hour: 1, hourString: "01:00:00" },
        { hour: 2, hourString: "02:00:00" },
        { hour: 3, hourString: "03:00:00" },
        { hour: 4, hourString: "04:00:00" },
        { hour: 5, hourString: "05:00:00" },
        { hour: 6, hourString: "06:00:00" },
        { hour: 7, hourString: "07:00:00" },
        { hour: 8, hourString: "08:00:00" },
        { hour: 9, hourString: "09:00:00" },
        { hour: 10, hourString: "10:00:00" },
        { hour: 11, hourString: "11:00:00" },
        { hour: 12, hourString: "12:00:00" },
        { hour: 13, hourString: "13:00:00" },
        { hour: 14, hourString: "14:00:00" },
        { hour: 15, hourString: "15:00:00" },
        { hour: 16, hourString: "16:00:00" },
        { hour: 17, hourString: "17:00:00" },
        { hour: 18, hourString: "18:00:00" },
        { hour: 19, hourString: "19:00:00" },
        { hour: 20, hourString: "20:00:00" },
        { hour: 21, hourString: "21:00:00" },
        { hour: 22, hourString: "22:00:00" },
        { hour: 23, hourString: "23:00:00" }
    ];

    const add = (q) => {
        console.log("ttttttttyyyyyppppppeeee");
        // let q1 = JSON.stringify(q);
        // navi('/addQueue/' + q1 + "/" + qType);
    };

    // Get current hour for time indicator
    const getCurrentHourPosition = () => {
        const now = new Date();
        
        //new time
       //הקצאת שעה חדש
       
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        // Calculate position percentage based on current time
        const hourIndex = hours.findIndex(h => h.hour === currentHour);
        if (hourIndex === -1) return null;

        const positionPercentage = (hourIndex * 60 + currentMinute) / (24 * 60) * 100;
        return positionPercentage;
    };

    // Check if the date is today
    const isToday = () => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };

    // Format current time for display
    const getCurrentTimeString = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    return (
        <dialog className="day-view-dialog" ref={refDialog}>
            {/* Header Section */}
            <div className="day-view-header">
                <div className="day-view-header-bg"></div>
                <h1 className="day-view-title">{monthNames[date.getMonth()]} {date.getFullYear()}</h1>
                <div className="day-view-subtitle">
                    <div className="day-number">{date.getDate()}</div>
                    <div className="day-name">יום {daysAtHebrew[(date.getDay())]}</div>
                </div>
            </div>

            {/* Hours Container */}
            <div className="hours-container">
                {/* Current time indicator (only shown if the date is today) */}
                {isToday() && (
                    <div
                        className="current-time-indicator"
                        style={{ top: `${getCurrentHourPosition()}%` }}
                    >
                        <span className="current-time-label">{getCurrentTimeString()}</span>
                    </div>
                )}

                {hours.map(h => {
                    // Find available queue for this hour
                    // const eventNow=eventToday.find(e => e.hour === h.hour);
                    // const aq = eventToday.find(q => q.queue.hour === h.hour);
                    // Find fixed queue for this hour
                    //const fixedQ = fqToday.find(fq => fq.startHour === h.hour);

                    const evnt = eventToday?.find(e =>  splitToHour(e.time) >= h.hour && splitToHour(e.time) < h.hour + 1);
                    console.log(evnt);
                    // Determine row class based on availability
                    // let rowClass = "hour-row";
                    // if (aq) rowClass += " available";
                    // if (evnt) rowClass += " booked";

                    return (
                        <div key={h.hour}  style={{backgroundColor: (evnt?.title !== undefined) ? "lightgreen" : "white"}} className="hour-row">
                            <div className="hour-time">{h.hourString}</div>

                            <div className="hour-content">
                                {/* Show patient info if there's a fixed queue */}
                                {evnt?.title !== undefined && (
                                    <div className="patient-info">
                                        {/* Patient name would go here */}
                                        {evnt?.description || "פגישה מתוכננת"}
                                    </div>
                                )}

                                {/* Show action buttons if there's an available queue */}
                                {/* {aq?.queue !== undefined && (
                                    <>
                                        
                                        <button 
                                            className="action-button" 
                                            onClick={() => add(aq.queue)}
                                            title="הוסף תור"
                                        >
                                            <AddCircleOutlineIcon fontSize="small" />
                                        </button>
                                        
                                        Woman queue button
                                        {aq?.flagWoman === true && (
                                            <button 
                                                className="action-button woman" 
                                                onClick={() => { qType = 'w'; add(aq.queue) }}
                                                title="תור לנשים"
                                            >
                                                <Face3OutlinedIcon fontSize="small" />
                                            </button>
                                        )}
                                        
                                        Double queue button
                                        {aq?.flagDouble === true && (
                                            <button 
                                                className="action-button double" 
                                                onClick={() => { qType = 'd'; add(aq.queue) }}
                                                title="תור כפול"
                                            >
                                                <span>💢</span>
                                            </button>
                                        )}
                                    </>
                                )} */}
                            </div>
                        </div>
                    );
                })}

                {/* Empty state if no hours available */}
                {hours.length === 0 && (
                    <div className="empty-state">
                        <EventBusyIcon className="empty-state-icon" />
                        <p className="empty-state-text">אין שעות זמינות ליום זה</p>
                    </div>
                )}
            </div>

            {/* Footer with close button */}
            <div className="day-view-footer"  >
                <button className="close-button" onClick={back} style={{ backgroundColor: 'pink', color: 'white', border: 'none' }}>
                    <CloseIcon fontSize="small" />
                    סגור
                </button>
            </div>
        </dialog>
    );
};
