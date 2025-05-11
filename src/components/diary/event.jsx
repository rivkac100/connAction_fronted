// import { useEffect, useRef, useState } from 'react'
// // import './style.css'
// import { addEventThunk } from '../../store/slices/events/addEventThunk';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { editEventThunk } from '../../store/slices/events/editEventThunk';
// import { findEventThunkById } from '../../store/slices/events/findEvenThunkById';
// // import Input from '@mui/joy/Input';

// export const Event = () => {

//     const navigate = useNavigate();
//     // const token = useSelector(state => state.user.token);
//     // const events = useSelector(state => state.events.events);
//     const evnt=useSelector(state=> state.events.evnt)
//     const dispatch = useDispatch();
//     const {id, month, day, year, eventId } = useParams();
//     const [thisDay, setThisDay] = useState(new Date());
//     const [thisEvent, setThisEvent] = useState({})
//     const [title, settitle] = useState(" ");
//     const [date, setDate] = useState(thisDay);
//     const [time, setTime] = useState(new Date().getTime());
//     const [description, setDescription] = useState(" ");
//     const [lenOfEvent, setLenOfEvent] = useState(" ");
//     // const [id, setId] = useState()
//     const refDialog = useRef();


//     useEffect(() => {
//         refDialog.current.showModal();
//     }, [])

//     useEffect(() => {
//         if (day && !eventId) {
//             let s = `${year}-${day}-${month}`

//             if (month < 10)
//                 s = `${year}-0${day}-${month}`
//             if (day < 10)
//                 s = `${year}-${day}-0${month}`
//             if (month < 10 && day < 10)
//                 s = `${year}-0${day}-0${month}`

//             //setDetails({ ...details, date: s })
//             setThisEvent({...thisEvent,date:s})
//         }
//         if (eventId) {
//            // let i = events.filter(x => x.id === eventId)[0]
//             dispatch(findEventThunkById({eventId:parseInt(eventId)}))
//             console.log(evnt);
//             setThisEvent(evnt);
//             //let x = { "title": i.title, "date": i.date, "time": i.time, "description": i.description,"lenOfEvent":i.lenOfEvent }
//             //setDetails(x);
//             // if (i) {
//             //     console.log(i.title + ',' + i.date + ',' + i.time + ',' + i.description + '\n id--' + i.id);
//             //     console.log(thisEvent.title + ',' + thisEvent.date + ',' + thisEvent.time + ',' + thisEvent.description + '\n id--' + thisEvent.id);
//             //     setId(i.id)
//             //     settitle(i.title)
//             //     setDate(i.date)
//             //     setTime(i.time)
//             //     setDescription(i.description)
//             //     setDetails(i);
//             //     setLenOfEvent(i);
//             //     console.log(details.title + '*' + details.date + '*' + details.time + '*' + details.description);
//             // }
//         }
//     }, [eventId, day])

//     const cancele = () => {
//         refDialog.current.close();
//         navigate(`/home/${id}/month`)
//     }

//     const saveEvent = async () => {

//       if(thisEvent.date && thisEvent.title)
//         if(eventId){
       
//             dispatch(editEventThunk({details:thisEvent}));
//         }
//         else{
//             dispatch(addEventThunk({details:thisEvent}))
//         }
//         refDialog.current.close();
//         navigate(`/home/${id}/calandar`)

//     }

//     const saveEditEvent = async () => {
//         dispatch(editEventThunk({ event: { title: title, date: date, time: time, description: description, id: eventId,lenOfEvent:lenOfEvent }}))
//         refDialog.current.close();
//         navigate(`/home/${id}/calandar`)

//     }

//     return <dialog ref={refDialog} classtitle='event-dialog'>

//         <div style={{ width: '20%', alignItems: 'center', marginRight: '250px' }} classtitle="login-img">
//             <img classtitle='eve-img' src={process.env.PUBLIC_URL + "/pic/444.jpg"} alt="" />
//         </div>

//         {/* {!eventId && <div>
//             <input type="text" placeholder="eventHeader" onChange={(e) => setDetails({ ...details, title: e.target.value })} />
//             {day && <input type="text" value={`${month}-${day}-${year}`} placeholder="event date" />}
//             {!day && <input type="date" placeholder="event date" onChange={(e) => setDetails({ ...details, date: e.target.value })} />}
//             <input type="time" placeholder="event time" onChange={(e) => setDetails({ ...details, time: e.target.value })} />
//             <br />
//             <textarea title="" id="" cols="30" rows="5" onChange={(e) => setDetails({ ...details, description: e.target.value })}></textarea>
//             <br />
//             <input type="number" placeholder="lenOfEvent" onChange={(e) => setDetails({ ...details, lenOfEvent: e.target.value })} />

//             <button classtitle="b-event" onClick={() => saveEvent()}>save </button>
//             <button classtitle="b-event" onClick={() => cancele()}>cancele</button>
//         </div>}

//         {eventId && <div>
//             <input type="text" value={`${title}`} onChange={(e) =>
//                 settitle(e.target.value)} />
//             <input type="text" value={`${date}`} placeholder="event date" onChange={(e) => setDate(e.target.value)
//             } />
//             <input type="time" value={`${time}`} placeholder="event time" onChange={(e) => setTime(e.target.value)
//             } />
//             <br />
//             <textarea value={`${description}`} title="" id="" cols="30" rows="5" onChange={(e) => setDescription(e.target.value)
//             }></textarea>
//             <br />
//             <button classtitle="b-event" onClick={() => saveEditEvent()}>save </button>
//             <button classtitle="b-event" onClick={() => cancele()}>cancele</button>
//         </div>
//         } */}
//         <br />
//         <div>
//         <button  className="login" onClick={() => { saveEvent() }}>save</button> 
//         <button  className="login" onClick={() => { cancele() }}>back</button>
//          </div>
//          {/* <Input >Label</Input> */}

//         <br /><input className="logBut" type="text" value={thisEvent?.title} placeholder="insert title" onChange={e => setThisEvent({ ...thisEvent, title: e.target.value })} />
//         <br /><input className="logBut" type="date" value={thisEvent?.date} placeholder="insert date" onChange={e => setThisEvent({ ...thisEvent, date: e.target.value })} />
//         <br /><input className="logBut" type="text" value={thisEvent?.time} placeholder="insert time" onChange={e => setThisEvent({ ...thisEvent, time: e.target.value })} />
//         <br /><textarea className="logBut" type="text" value={thisEvent?.description} placeholder="insert description" onChange={e => setThisEvent({ ...thisEvent, description: e.target.value })} />
//         <br /><input className="logBut" type="text" value={thisEvent?.lenOfEvent} placeholder="insert lenOfEvent" onChange={e => setThisEvent({ ...thisEvent, lenOfEvent: parseInt(e.target.value) })} />
     

//     </dialog>
// }
import { useEffect, useRef, useState } from 'react';
import { addEventThunk } from '../../store/slices/events/addEventThunk';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editEventThunk } from '../../store/slices/events/editEventThunk';
import { findEventThunkById } from '../../store/slices/events/findEvenThunkById';

// Icons
import TitleIcon from '@mui/icons-material/Title';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DescriptionIcon from '@mui/icons-material/Description';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventIcon from '@mui/icons-material/Event';

import './event.css';

export const Event = () => {
    const navigate = useNavigate();
    const evnt = useSelector(state => state.events.evnt);
    const dispatch = useDispatch();
    const { id, month, day, year, eventId } = useParams();
    const [thisDay, setThisDay] = useState(new Date());
    const [thisEvent, setThisEvent] = useState({});
    const [title, settitle] = useState(" ");
    const [date, setDate] = useState(thisDay);
    const [time, setTime] = useState(new Date().getTime());
    const [description, setDescription] = useState(" ");
    const [lenOfEvent, setLenOfEvent] = useState(" ");
    const refDialog = useRef();

    useEffect(() => {
        refDialog.current.showModal();
    }, []);

    useEffect(() => {
        if (day && !eventId) {
            let s = `${year}-${day}-${month}`;
            if (month < 10)
                s = `${year}-0${day}-${month}`;
            if (day < 10)
                s = `${year}-${day}-0${month}`;
            if (month < 10 && day < 10)
                s = `${year}-0${day}-0${month}`;
            setThisEvent({...thisEvent, date: s});
        }
        if (eventId) {
            dispatch(findEventThunkById({eventId: parseInt(eventId)}));
            setThisEvent(evnt);
        }
    }, [eventId, day]);

    const cancele = () => {
        refDialog.current.close();
        navigate(-1)//`/home/${id}/month`);
    };

    const saveEvent = async () => {
        if(thisEvent.date && thisEvent.title) {
            if(eventId) {
                dispatch(editEventThunk({details: thisEvent}));
            } else {
                dispatch(addEventThunk({details: thisEvent}));
            }
            refDialog.current.close();
            navigate(-1)//`/home/${id}/calandar`);
        }
    };

    const saveEditEvent = async () => {
        dispatch(editEventThunk({ 
            event: { 
                title: title, 
                date: date, 
                time: time, 
                description: description, 
                id: eventId,
                lenOfEvent: lenOfEvent 
            }
        }));
        refDialog.current.close();
        navigate(`/home/${id}/calandar`);
    };

    // Format date for display if available
    const getFormattedDate = () => {
        if (day && month && year) {
            return `${day}/${month}/${year}`;
        }
        return '';
    };

    return (
        <dialog ref={refDialog} className="event-dialog">
            {/* Header Section */}
            <div className="event-header">
                <div className="event-header-bg"></div>
                <div className="event-header-content">
                    <h2 className="event-title">
                        {eventId ? 'עריכת אירוע' : 'אירוע חדש'}
                    </h2>
                    <p className="event-subtitle">
                        {getFormattedDate() ? `תאריך: ${getFormattedDate()}` : 'הזן את פרטי האירוע'}
                    </p>
                </div>
            </div>

            {/* Image Section */}
            {/* <div className="event-image-container">
                <img 
                    className="event-image" 
                    src={process.env.PUBLIC_URL + "/pic/444.jpg"} 
                    alt="אירוע" 
                />
            </div> */}

            {/* Form Section */}
            <div className="event-form">
                <div className="event-form-group event-highlight">
                    <label className="event-form-label">כותרת האירוע</label>
                    <div className="event-input-animated">
                        <input 
                            className="event-input" 
                            type="text" 
                            value={thisEvent?.title || ''} 
                            placeholder="הזן כותרת לאירוע" 
                            onChange={e => setThisEvent({ ...thisEvent, title: e.target.value })} 
                        />
                        {/* <div className="event-input-icon">
                            <TitleIcon fontSize="small" />
                        </div> */}
                    </div>
                </div>

                <div className="event-form-group">
                    <label className="event-form-label">תאריך</label>
                    <div className="event-input-animated">
                        <input 
                            className="event-input" 
                            type="date" 
                            value={thisEvent?.date || ''} 
                            placeholder="בחר תאריך" 
                            onChange={e => setThisEvent({ ...thisEvent, date: e.target.value })} 
                        />
                        {/* <div className="event-input-icon">
                            <DateRangeIcon fontSize="small" />
                        </div> */}
                    </div>
                </div>

                <div className="event-form-group">
                    <label className="event-form-label">שעה</label>
                    <div className="event-input-animated">
                        <input 
                            className="event-input" 
                            type="text" 
                            value={thisEvent?.time || ''} 
                            placeholder="הזן שעה (לדוגמה: 14:30)" 
                            onChange={e => setThisEvent({ ...thisEvent, time: e.target.value })} 
                        />
                        {/* <div className="event-input-icon">
                            <AccessTimeIcon fontSize="small" />
                        </div> */}
                    </div>
                </div>

                <div className="event-form-group">
                    <label className="event-form-label">תיאור</label>
                    <div className="event-input-animated">
                        <textarea 
                            className="event-input event-textarea" 
                            value={thisEvent?.description || ''} 
                            placeholder="הוסף תיאור לאירוע" 
                            onChange={e => setThisEvent({ ...thisEvent, description: e.target.value })} 
                        />
                        {/* <div className="event-input-icon" style={{ top: '12px' }}>
                            <DescriptionIcon fontSize="small" />
                        </div> */}
                    </div>
                </div>

                <div className="event-form-group">
                    <label className="event-form-label">משך האירוע (בדקות)</label>
                    <div className="event-input-animated">
                        <input 
                            className="event-input" 
                            type="text" 
                            value={thisEvent?.lenOfEvent || ''} 
                            placeholder="הזן את משך האירוע" 
                            onChange={e => setThisEvent({ ...thisEvent, lenOfEvent: parseInt(e.target.value) })} 
                        />
                        {/* <div className="event-input-icon">
                            <HourglassEmptyIcon fontSize="small" />
                        </div> */}
                    </div>
                    </div>
                </div>
           

            {/* Actions Section */}
            <div className="event-actions">
                <button 
                    className="event-button event-button-cancel" 
                    onClick={cancele}
                >
                    <ArrowBackIcon style={{ marginLeft: '8px', fontSize: '18px' }} />
                    חזרה
                </button>
                
                <button 
                    className="event-button event-button-save" 
                    onClick={saveEvent}
                    disabled={!thisEvent?.title || !thisEvent?.date}
                >
                    <SaveIcon style={{ marginLeft: '8px', fontSize: '18px' }} />
                    שמירה
                </button>
            </div>
        </dialog>
    );
};

