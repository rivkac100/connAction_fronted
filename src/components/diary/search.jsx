import { useEffect, useRef, useState } from 'react';
import './style.css'
import { useDispatch, useSelector } from "react-redux";
import { searchEventThunk } from '../store/slices/searchEventThunk'
import { useNavigate } from 'react-router-dom';

export const Search = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch();
   const [date, setDate] = useState();
   const [text, seText] = useState();
   const eventId = useSelector(state => state.user.token);
   const events = useSelector(state => state.events.searchEvents)
   const refDialog = useRef()

   const back = () => {
      refDialog.current.close();
      navigate(`/calendar`)
   }

   useEffect(() => {
      refDialog.current.showModal();
   }, [])

   return <dialog ref={refDialog} className="search">

      <div style={{ width: '55%', alignItems: 'center' }} className="login-img">
         <img className='eve-img' src={process.env.PUBLIC_URL + "/pic/333.jpg"} alt="" />
      </div>
      <div className="tad">
         <label>Date:</label>
         <input type="date" onBlur={(e) => { setDate(e.target.value); dispatch(searchEventThunk({ eventId, date: e.target.value, text })) }} />
         <br />
         <label>Title:</label>
         <input type="text" onChange={(e) => { seText(e.target.value); dispatch(searchEventThunk({ eventId, date, text: e.target.value })) }} />
      </div>

      <div className="result">
         <table><thead>
            <th className='th-search'>Title</th>
            <th className='th-search'>Date</th>
            <th className='th-search'>Time</th>
            <th className='th-search'>Description</th></thead>
            <tbody>
               {events.map(e => <tr key={e.id}>
                  <td className='td-search'>{e.name}</td>
                  <td className='td-search'>{e.date}</td>
                  <td className='td-search'>{e.time}</td>
                  <td className='td-search'>{e.description}</td>
               </tr>)}

            </tbody>
         </table>
      </div>
      <button className='b-event' onClick={() => navigate(`/calendar`)}>cancel</button><br />
   </dialog>

}
