import React, { useEffect, useState } from 'react';
import MonthView from './MonthView';

// import { useSelector } from 'react-redux';
import './calendar.css'
import { DayView } from '../DayView/dayView';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar } from '../diary/calendar';
// import { useDispatch } from 'react-redux';
// import { getAllStartAQueuesThunk } from '../../redux/slices/queueSlice/getAllStartAvialableQueue';
// import { getQueuesThunk } from '../../redux/slices/queueSlice/getQueueThunk';
// import { getPatientsThunk } from "../../redux/slices/patientSlice/getPatientsThunk"
export const Calendar2 = () => {
    const navigate=useNavigate()
    //const currentPatient = useSelector(state => state.PatientSlice.currentPatient)
    const parms = useParams();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState('month'); // 'month' or 'week'
    const [dayDate ,setDayDate] = useState(new Date(2025 , 2 , 24))
    //const patients = useSelector(state => state.PatientSlice.patientsList)
    const [monthName , setMonthName]=  useState("")
    
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     debugger
    //     // if(patients.length > 0)
    //     //   //  dispatch(getQueuesThunk())
    //     // else;
            
    // }, [patients])

    // useEffect(() => {
    //     debugger
    //    // dispatch(getPatientsThunk())
    // }, [])

    const toggleView = () => {
        setView(view === 'month' ? 'week' : 'month');
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const goToPrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const goToNextWeek = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7));
    };

    const goToPrevWeek = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7));
    };

    return (
        <div id='calen'>
              <button onClick={goToPrevMonth}>▶חודש הקודם</button>
              <button onClick={goToNextMonth}>חודש הבא◀</button> 
            {monthName !== "" && <DayView date = {dayDate} monthName = {monthName} setMonthName = {setMonthName}></DayView>}
            
                <MonthView currentDate={currentDate}  setDayDate={setDayDate} setMonthName = {setMonthName}/>

            {/* <button onClick={()=>
                navigate(`/home/${parms.id}/calandar`)}>{view === 'month' ? 'מעבר לתצוגה שבועית' : 'מעבר לתצוגה חודשית'}</button> */}
            {/* {view === 'month' ? (
                <>
                    <button onClick={goToPrevMonth}>▶חודש הקודם</button>
                    <button onClick={goToNextMonth}>חודש הבא◀</button> 
                </>
            ) : ( <><Calendar/></>
               //navigate(`/home/${parms.id}/calandar`)
            )}  */}
            
        </div>
    );
};


