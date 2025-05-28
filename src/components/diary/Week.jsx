// import { useEffect, useRef, useState } from 'react'
// import './calendar.css'
// import { Outlet, useNavigate, useParams } from 'react-router-dom';
// import { useSelector, useDispatch } from "react-redux";
// import { eventFetchThunk } from '../../store/slices/events/eventFetchThunk';

// import { Button } from '@mui/material';
// import TimerSharpIcon from '@mui/icons-material/TimerSharp';
// import AddPhotoAlternateSharpIcon from '@mui/icons-material/AddPhotoAlternateSharp';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import DateRangeIcon from '@mui/icons-material/DateRange';
// import { Month } from './Month';
// import { ordersFetchThunk } from '../../store/slices/orders/ordersFetch';
// import { customersFetchThunkById } from '../../store/slices/customers/customerFetchThunkById';
// // import { deleteEventThunk } from '../store/slices/deleteEventThunk';

// export const Week = () => {
//     const [menu, setMenu] = useState(false);
//     const [week, setWeek] = useState([]);
//     const param = useParams();
//     const [Day, setDay] = useState(new Date());
//     const [thisDay, setThisDay] = useState(new Date());
//     const [count, setCount] = useState(0);
//     const [y, setY] = useState()
//     const [x, setX] = useState()

//     // const token = useSelector(state => state.customer.token);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     // const username = useSelector(state => state.user.userName)
//     const events = useSelector(state => state.events.events);
//     const myOrders = useSelector(state => state.customer.MyOrders);
//     const orders = useSelector(state => state.order.orders)
    
//     const [eventToEdit, setEventToEdit] = useState();
//     const [eventToEditId, setEventToEditId] = useState();
//     const [menuEvent, setmenuEvent] = useState(false);
//     const [name, setName] = useState('');
//     const [view, setView] = useState('תצוגה שבועית')
//     const [notview, setNotView] = useState('תצוגה חודשית')

//     const [manager, setManager] = useState(false);
//     // const [openEvent,setOpenEvent]=
//     let s = new Date();
//     const refDialog = useRef();

//     useEffect(() => {
//         myDate();
//         window.addEventListener('contextmenu', rightClick);
//         return () => {
//             window.removeEventListener('contextmenu', rightClick)
//         }

//     }, [])

//     useEffect(() => {
//         if (events?.length === 0) dispatch(eventFetchThunk())
//     }, [events])
//     useEffect(() => {
//         if (myOrders?.length === 0) dispatch(customersFetchThunkById({id: parseInt(param.id)}))
//     }, [orders])
//     const newEvent = () => {

//         navigate(`/home/${param.id}/event`)
//     };
//     const newOrder = () => {
//         navigate(`/newOrder`)
//     }

//     const newEventnow = () => {
//         let f = new Date(Day);
//         f = (f.toLocaleDateString());
//         navigate(`event/${f}`);
//     };

//     const rightClick = (event) => {
//         event.preventDefault();
//     };

//     const right = () => {
//         if (view === 'תצוגה שבועית') {
//             setCount(count + 1)
//             myDate(count + 1)
//         }

//     };

//     const left = () => {
//         if (view === 'תצוגה שבועית') {
//             setCount(count - 1)
//             myDate(count - 1)
//         }
//     }

//     const toDay = async () => {
//         setCount(0)
//         myDate()
//     }

//     const myDate = (count = 0) => {
//         const str = thisDay.toDateString();
//         let myday = thisDay.getDay();
//         let itsDay = thisDay.getDate();
//         let thisWeek = [];
//         for (let i = 0; i < 7; i++) {
//             let newd = new Date(str);
//             let elemntDay
//             if (i < myday) {
//                 //הימים שעברו
//                 elemntDay = (itsDay + 7 * count - (myday - i))
//             }
//             else
//                 elemntDay = itsDay + 7 * count + ((i - myday))
//             newd.setDate(elemntDay);
//             let newdstr = newd.toDateString();
//             thisWeek.push(newdstr);
//         }
//         setWeek(thisWeek);
//     }

//     // const searchEvent = () => {
//     //     if (!token) {
//     //         navigate(`/login`)
//     //     }
//     //     else
//     //         navigate(`/search`)
//     // }

//     // const deleteEvent = async () => {
//     //     setmenuEvent(false)
//     //     setMenu(false)
//     //     await dispatch(deleteEventThunk({ token, eventId: eventToEditId }))
//     // };

//     const edit = () => {
//         // let event = events.filter(e => e.id === eventToEditId)[0]
//         // let date = new Date(event.date)
//         // console.log(date);
//         // console.log(`/event/${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}/${event.id}`);
//         // navigate(`/event/${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}/${event.id}`)
//     }
//     const changeView = (view) => {
//         if (view === 'תצוגה שבועית') {
//             setView('תצוגה חודשית')
//             setNotView('תצוגה שבועית')
//         }
//         else {
//             setView('תצוגה שבועית')
//             setNotView('תצוגה חודשית')
//         }
//     }
//     return <div>
//         {/* {openEvent && < Event ></Event>} */}
//         <div className='cal-title'>
//             {/* <div style={{ width: '50%' }}>
//                 <div className='cal-user'>
//                     !יומן להזמנות מצא את התאריכים הפנויים שלך
//                 </div>
//             </div> */}
//             {/* <div style={{ width: '50%' }} className="login-img">
//         <img className='cal-img' src={process.env.PUBLIC_URL + "/pic/logo5.jpg"} alt="" />
//     </div> */}
//         </div>

//         <div className='cal'>

//             {/* <button onClick={() => searchEvent()} className='cal-button'>חיפוש ארוע</button> */}


//             {/*
//                 {menuEvent && <div
//                     style={{ position: "absolute", top: y, left: x, }}>
//                     <button className='menuButton' onClick={() => edit()} >עריכה</button>
//                     <br />
//                     <button className='menuButton' onClick={() => deleteEvent()}>מחיקה</button>
//                 </div>} */}
//             {view === 'תצוגה שבועית' ? (<>
//                 {menu && <div
//                     style={{ position: "absolute", top: y, left: x, fontSize: "5px" }}>
//                     <button className='menuButton' onClick={() => newEventnow()}>להזמנה  חדשה</button>
//                     <br />
//                     {manager && <><button className='menuButton' onClick={() => newEventnow()}>לארוע  חדש</button><br /></>}
//                     <button className='menuButton' onClick={() => toDay()}>לתאריך הנוכחי</button>
//                 </div>}
//                 <Button variant="contained" className='button' onClick={() => {
//                     changeView(view); //navigate(`home/${param.id}/calandar`) 
//                 }} endIcon={<DateRangeIcon />}>{notview}</Button>
//                 <Button variant="contained" onClick={() => newEvent()} className='button cal-button' endIcon={<AddPhotoAlternateSharpIcon />}>
//                     ארוע חדש
//                 </Button>

//                 <Button variant="contained" onClick={() => left()} className='button cal-button' endIcon={<ArrowBackIosIcon />}>

//                 </Button>
//                 <Button variant="contained" onClick={() => right()} className='button cal-button' endIcon={<ArrowForwardIosIcon />}>

//                 </Button>

//                 <Button variant="contained" onClick={() => toDay()} className='button cal-button' endIcon={<TimerSharpIcon />}>
//                     לתאריך הנוכחי
//                 </Button>
//                 <table className='dairyTable'>
//                     <thead>
//                         <tr>
//                             {week.map((d) => <><td onContextMenu={event => {
//                                 console.log(view);
//                                 setDay(d);
//                                 setX(event.clientX);
//                                 setY(event.clientY);
//                                 //setmenuEvent(false);
//                                 setMenu(true);
//                             }} onDoubleClick={() => {setMenu(false); }} className={d === s.toDateString() ? "th-toDay" : "th-notToDay"}>{d}</td>
//                                 <td className='cal-white'></td>
//                             </>)}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>

//                             {week.map((d) => <><td
//                                 className={d === s.toDateString() ? "toDay" : "notToDay"}>
//                                 {events && <>
//                                     {events.filter((e) => {
//                                         console.log(new Date(e.date).toDateString()); if (new Date(e.date).toDateString() === d)
//                                             return e;
//                                     }).map(e => <div className={new Date(e.date).toDateString() === s.toDateString() ? "event event-td" : "event event-ntd"} onContextMenu={event => {
//                                         setX(event.clientX);
//                                         setY(event.clientY);
//                                         setEventToEdit(e);
//                                         setEventToEditId(e.id);
//                                         // setmenuEvent(true);
//                                         setMenu(false);
//                                     }} onDoubleClick={() => {
//                                         // setmenuEvent(false);
//                                     }}>
//                                         {e.time}
//                                         <br />
//                                         {e.title}
//                                     </div>)}
//                                     {myOrders && <>
//                                      {myOrders.filter((o)=>{
//                                         //if(new Date(o.date).toDateString()===d && o.customerId===param.id)
//                                         if(new Date(o.date).toDateString()===d )
//                                         return o
//                                      }).map(o=> <div  className={new Date(o.date).toDateString() === s.toDateString() ? "event event-td" : "event event-ntd"}>
//                                          {o.activityName}
//                                          <br />
//                                          {o.customerName}
//                                          <br />
//                                          {o.activeHour}
//                                      </div>


//                                      )}
//                                     </>}
//                                 </>}

//                             </td>
//                                 <td className='cal-white'></td>
//                             </>)}
//                         </tr>
//                     </tbody>
//                 </table></>) : (<>{() => console.log(view)
//                 }
//                     <Month />

//                 </>
//                 // {view==='תצוגה חודשית' && 
//             )}
//             < div style={{ width: '50%' }} >
//                 {/* <img className='sen-img' src={process.env.PUBLIC_URL + "/pic/sen.jpg"} alt="" /> */}
//             </div>
//         </div><div><Outlet></Outlet></div>

//     </div>
// }
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { eventFetchThunk } from '../../store/slices/events/eventFetchThunk';
import { ordersFetchThunk } from '../../store/slices/orders/ordersFetch';
import { customersFetchThunkById } from '../../store/slices/customers/customerFetchThunkById';
import { Month } from './Month';
import { Button } from '@mui/material';


// Icons
import TimerSharpIcon from '@mui/icons-material/TimerSharp';
import AddPhotoAlternateSharpIcon from '@mui/icons-material/AddPhotoAlternateSharp';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import MenuIcon from '@mui/icons-material/Menu';

import './week.css';
import { managersFetchThunkById } from '../../store/slices/managers/managerFetchThunkById';

export const Week = () => {
    // State variables
    const [menu, setMenu] = useState(false);
    const [week, setWeek] = useState([]);
    const [Day, setDay] = useState(new Date());
    const [thisDay, setThisDay] = useState(new Date());
    const [count, setCount] = useState(0);
    const [y, setY] = useState();
    const [x, setX] = useState();
    const [eventToEdit, setEventToEdit] = useState();
    const [eventToEditId, setEventToEditId] = useState();
    const [menuEvent, setmenuEvent] = useState(false);
    const [view, setView] = useState('תצוגה שבועית');
    const [notview, setNotView] = useState('תצוגה חודשית');
    const [manager, setManager] = useState(false);
    
    // Router hooks
    const param = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // Redux selectors
    const myManager = useSelector(state => state.manager.myManager);
    const myOrders = useSelector(state => state.manager.MyOrders);
    // const orders = useSelector(state => state.order.orders);
    const events = useSelector(state => state.manager.MyEvents);
    
    // Current date for today highlighting
    const today = new Date();
    const todayString = today.toDateString();
    
    // Initialize week view on component mount
    useEffect(() => {
        myDate();
        
        // Prevent default context menu
        const handleContextMenu = (event) => {
            event.preventDefault();
        };
        
        window.addEventListener('contextmenu', handleContextMenu);
        return () => {
            window.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);
    
    // Fetch data from Redux store

    
    useEffect(() => {
        if (myOrders?.length === 0) dispatch(managersFetchThunkById({id: parseInt(param.mid)}));
    }, [myOrders, dispatch, param.id]);
    

    
    // Navigation functions
    const newEvent = () => {
        navigate(`/home/${param.id}/event`);
    };
    
    const newEventnow = () => {
        let f = new Date(Day);
        f = (f.toLocaleDateString());
        navigate(`event/${f}`);
    };
    
    // Week navigation
    const goToNextWeek = () => {
        setCount(count + 1);
        myDate(count + 1);
    };
    
    const goToPrevWeek = () => {
        setCount(count - 1);
        myDate(count - 1);
    };
    
    const toDay = async () => {
        setCount(0);
        myDate();
    };
    
    // Calculate week dates
    const myDate = (count = 0) => {
        const str = thisDay.toDateString();
        let myday = thisDay.getDay();
        let itsDay = thisDay.getDate();
        let thisWeek = [];
        
        for (let i = 0; i < 7; i++) {
            let newd = new Date(str);
            let elemntDay;
            
            if (i < myday) {
                // Days that passed
                elemntDay = (itsDay + 7 * count - (myday - i));
            } else {
                elemntDay = itsDay + 7 * count + ((i - myday));
            }
            
            newd.setDate(elemntDay);
            let newdstr = newd.toDateString();
            thisWeek.push(newdstr);
        }
        
        setWeek(thisWeek);
    };
    
    // Toggle between week and month views
    const changeView = (view) => {
        if (view === 'תצוגה שבועית') {
            setView('תצוגה חודשית');
            setNotView('תצוגה שבועית');
        } else {
            setView('תצוגה שבועית');
            setNotView('תצוגה חודשית');
        }
    };
    
    // Format date for display
    const formatDateHeader = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const dayName = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'][date.getDay()];
        
        return (
            <div>
                <div>{dayName}</div>
                <div>{day}/{month}</div>
            </div>
        );
    };
    
    // Get week range for title
  
//=========================
    // Get week range for title
    const getWeekRangeTitle = () => {
        if (week.length === 0) return '';
        
        const startDate = new Date(week[0]);
        const endDate = new Date(week[6]);
        
        const startDay = startDate.getDate();
        const startMonth = startDate.getMonth() + 1;
        const endDay = endDate.getDate();
        const endMonth = endDate.getMonth() + 1;
        
        // If same month
        if (startMonth === endMonth) {
            return `${startDay}-${endDay}/${startMonth}`;
        }
        
        return `${startDay}/${startMonth} - ${endDay}/${endMonth}`;
    };
    
    // Render events for a specific day
    const renderEvents = (dayString) => {
        const dayEvents = events.filter(e => new Date(e.date).toDateString() === dayString);
        const dayOrders = myOrders.filter(o => new Date(o.date).toDateString() === dayString);
        
        return (
            <>
                {dayEvents.map(event => (
                    <div 
                        key={`event-${event.id}`}
                        className={`week-event ${dayString === todayString ? 'today' : ''}`}
                        onContextMenu={e => {
                            e.preventDefault();
                            setX(e.clientX);
                            setY(e.clientY);
                            setEventToEdit(event);
                            setEventToEditId(event.id);
                            setmenuEvent(true);
                            setMenu(false);
                        }}
                    >
                        <div className="time">{event.time}</div>
                        <div className="title">{event.title}</div>
                    </div>
                ))}
                
                {dayOrders.map(order => (
                    <div 
                        key={`order-${order.id}`}
                        className={`week-event my-order ${dayString === todayString ? 'today' : ''}`}
                    >
                        <div className="time">{order.activeHour}</div>
                        <div className="title">{order.activityName}</div>
                        <div className="customer">{order.customerName}</div>
                    </div>
                ))}
            </>
        );
    };
    
    // If view is changed to month view, render Month component
    if (view === 'תצוגה חודשית') {
        navigate(`/home/${param.id}/month`);
    }
    
    return (
        <div className="week-container">
            {/* Menu Bar */}
            <div className="week-menu-bar">
                <div className="week-menu-title">
                    <CalendarViewWeekIcon />
                    <span>תצוגה שבועית</span> | מערכת הזמנת תוכניות והפקות
                </div>
                <div className="week-menu-actions">
                    <button className="week-menu-button" onClick={() => navigate(`/home/${param.id}`)}>
                        <MenuIcon />
                        תפריט ראשי
                    </button>
                    <button className="week-menu-button primary" onClick={newEvent}>
                        <AddPhotoAlternateSharpIcon />
                        אירוע חדש
                    </button>
                </div>
            </div>
            
            {/* Context Menu */}
            {menu && (
                <div className="context-menu" style={{ top: y, left: x }}>
                    <button className="context-menu-button" onClick={() => { newEventnow(); setMenu(false); }}>
                        להזמנה חדשה
                    </button>
                    {manager && (
                        <button className="context-menu-button" onClick={() => { newEvent(); setMenu(false); }}>
                            לאירוע חדש
                        </button>
                    )}
                    <button className="context-menu-button" onClick={() => { toDay(); setMenu(false); }}>
                        לתאריך הנוכחי
                    </button>
                </div>
            )}
            
            {/* Event Context Menu */}
            {menuEvent && (
                <div className="context-menu" style={{ top: y, left: x }}>
                    <button className="context-menu-button" onClick={() => { setmenuEvent(false); }}>
                        עריכה
                    </button>
                    <button className="context-menu-button" onClick={() => { setmenuEvent(false); }}>
                        מחיקה
                    </button>
                </div>
            )}
            
            <div className="week-paper">
                {/* Week Header */}
                <div className="week-header">
                    <h2 className="week-title">
                        שבוע <span>{getWeekRangeTitle()}</span> {new Date(week[0]).getFullYear()}
                    </h2>
                    
                    <div>
                        <button 
                            className="week-nav-button"
                            onClick={() => changeView(view)}
                        >
                            <DateRangeIcon />
                            {notview}
                        </button>
                    </div>
                </div>
                
                {/* Week Navigation */}
                <div className="week-nav">
                    <button className="week-arrow-button" onClick={goToPrevWeek}>
                        <ArrowForwardIosIcon style={{ fontSize: '1rem' }} />
                    </button>
                    
                    <button className="week-nav-button today" onClick={toDay}>
                        <TimerSharpIcon />
                        היום
                    </button>
                    
                    <button className="week-arrow-button" onClick={goToNextWeek}>
                        <ArrowBackIosIcon style={{ fontSize: '1rem' }} />
                    </button>
                </div>
                
                {/* Week Table */}
                <table className="week-table">
                    <thead>
                        <tr>
                            {week.map((dayString, index) => (
                                <>
                                    <th 
                                        key={`header-${index}`}
                                        className={dayString === todayString ? 'today' : 'th-nottoDay'}
                                        onContextMenu={e => {
                                            e.preventDefault();
                                            setDay(dayString);
                                            setX(e.clientX);
                                            setY(e.clientY);
                                            setMenu(true);
                                        }}
                                    >
                                        {formatDateHeader(dayString)}
                                    </th>
                                    {index < 6 && <th key={`spacer-${index}`} className="spacer"></th>}
                                </>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {week.map((dayString, index) => (
                                <>
                                    <td 
                                        key={`day-${index}`}
                                        className={dayString === todayString ? 'today' : 'notToDay'}
                                        onContextMenu={e => {
                                            e.preventDefault();
                                            setDay(dayString);
                                            setX(e.clientX);
                                            setY(e.clientY);
                                            setMenu(true);
                                        }}
                                        onDoubleClick={() => setMenu(false)}
                                    >
                                        {renderEvents(dayString)}
                                    </td>
                                    {index < 6 && <td key={`day-spacer-${index}`} className="spacer"></td>}
                                </>
                            ))}
                        </tr>
                    </tbody>
                </table>
                <Button  variant='contained' className='button' onClick={() => navigate(-1)}>back</Button>

            </div>
            
            <div><Outlet /></div>
        </div>
    );
};
