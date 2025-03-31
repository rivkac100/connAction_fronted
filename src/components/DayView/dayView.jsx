// בס"ד
import Face3OutlinedIcon from '@mui/icons-material/Face3Outlined';
//import { useSelector } from 'react-redux'
import './dayView.css'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
//import { getAllStartAQueuesThunk } from '../../redux/slices/queueSlice/getAllStartAvialableQueue'
import { useNavigate } from 'react-router-dom';

export const DayView = (props) => {
    const { date, monthName  , setMonthName} = props
    const daysAtHebrew = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'שבת']
    // const aQ = useSelector(state => state.QueuesSlice.listStartAQueue)
    //const fixedQueues = useSelector(state => state.QueuesSlice.listOfQueues)
    //const allPatients = useSelector(state => state.PatientSlice.patientsList)
    const dispatch = useDispatch()
    const [aqToday, setAqToday] = useState([])
    const [fqToday, setFqToday] = useState([])
    const navi = useNavigate()
    let qType = 'o'
    // useEffect(() => {
    //     // setAqToday(aQ.filter(aq => new Date(aq.queue.date).toLocaleDateString() == date.toLocaleDateString()))
    //     // setFqToday(fixedQueues.filter(fq => new Date(fq.date).toLocaleDateString() == date.toLocaleDateString()))
    // }, [aQ, date])

    useEffect(() => {

        debugger
       // dispatch(getAllStartAQueuesThunk())
    }, [])

//console.log(allPatients , 'allllllllllll');

    const hours = [
        { hour: 0, hourString: "00:00" },
        { hour: 1, hourString: "01:00" },
        { hour: 2, hourString: "02:00" },
        { hour: 3, hourString: "03:00" },
        { hour: 4, hourString: "04:00" },
        { hour: 5, hourString: "05:00" },
        { hour: 6, hourString: "06:00" },
        { hour: 7, hourString: "07:00" },
        { hour: 8, hourString: "08:00" },
        { hour: 9, hourString: "09:00" },
        { hour: 10, hourString: "10:00" },
        { hour: 11, hourString: "11:00" },
        { hour: 12, hourString: "12:00" },
        { hour: 13, hourString: "13:00" },
        { hour: 14, hourString: "14:00" },
        { hour: 15, hourString: "15:00" },
        { hour: 16, hourString: "16:00" },
        { hour: 17, hourString: "17:00" },
        { hour: 18, hourString: "18:00" },
        { hour: 19, hourString: "19:00" },
        { hour: 20, hourString: "20:00" },
        { hour: 21, hourString: "21:00" },
        { hour: 22, hourString: "22:00" },
        { hour: 23, hourString: "23:00" }]
    //console.log(fixedQueues, 'oooooo');
    const add = (q) => {
        console.log(qType, "ttttttttyyyyyppppppeeee");
        let q1 = JSON.stringify(q)
        navi('/addQueue/' + q1 + "/" + qType)
    }

    return <dialog open className='dayView'>

        <h1 className='h'>{monthName} {date.getFullYear()}</h1>

        <section className='dayHead'>
            <h2 className='dayNum'>יום {daysAtHebrew[(date.getDay())]}</h2>
            <h2 className='dayNum'>{date.getDate()}</h2>
        </section>
        <header className='day'>
            {hours && hours.map(h => {
               
                    var coll = aqToday.find(q => q.queue.hour === h.hour)
                    var col = coll != null ? 'salmon' : 'white'
                    debugger
                    var aq = aqToday.find(q => q.queue.hour === h.hour)
                    var fixedQ = fqToday.find(fq => fq.startHour === h.hour)
                //     if (fixedQ)
                //         col = 'yellow'

                // }
                
                return <section className='rowHour'
                    style={{ backgroundColor: col }}>
                    {
                        aq?.queue !== undefined ?
                            <>
                                {aq?.queue !== undefined && aq?.flagWoman === true && <button onClick={() => { qType = 'w'; add(aq.queue) }} className='toAddQ'><Face3OutlinedIcon></Face3OutlinedIcon></button>}
                                {aq?.queue !== undefined && aq?.flagDouble === true && <button onClick={() => { qType = 'd'; add(aq.queue) }} className='toAddQ'>💢</button>}
                                <button className='toAddQ' onClick={() => add(aq.queue)}>+</button>
                            </> : ""}
                    {fixedQ?.id !== undefined ?
                        <>
  
                            {/* <p>{allPatients.find(p => p.id == fixedQ.idPatient)?.firstName} {allPatients.find(p => p.id == fixedQ.idPatient)?.lastName} {fixedQ.description}</p> */}
                            
                        </>
                        : ""}

                    <p className='hour' >{h.hourString}</p>
                </section>
            })}

        </header>
        <button onClick={()=> setMonthName("")}>close</button>
    </dialog>
}