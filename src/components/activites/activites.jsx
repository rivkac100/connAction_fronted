
import { useEffect, useState} from 'react';
// import './style.css'
import { useDispatch, useSelector } from "react-redux";
// import { searchEventThunk } from '../store/slices/searchEventThunk'
import { Outlet, useNavigate } from 'react-router-dom';


import '@emotion/styled'
import "./activites"
// import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
// import {EditDocumentIcon} from '@mui/icons-material/EditDocument';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { activitiesFetch } from '../../store/slices/activites/activitiesFetch';
import { deleteActivityThunk } from '../../store/slices/activites/deleteActivityThunk';

export const Activities = ( )=>{
   const navigate = useNavigate()
  const dispatch= useDispatch();
  const activites= useSelector(state=>state.activity.activites)
  console.log(activites)
  
  const token = useSelector(state => state.activity.token);
  const failed = useSelector(state => state.activity.failed);
  const [delt,setDelt]=useState(false);
  const [edit,setEdit]=useState(false);
  const [mngId, setMngId]=useState(-1);
  
 useEffect(() => {
    
  dispatch(activitiesFetch());
       alert("I am in activities");
  // navigate(`/calendar`)
    
}, [])
useEffect(() => {
    
   // if(activites.length>0)
         
  // navigate(`/calendar`)
      
  }, [activites])

const  deleteActivity=async(id)=>{
    debugger
    dispatch(deleteActivityThunk(id));
   console.log("success");

}
   

   return  <div className='CustomerPage'>
    <h1 className='myCustomers'>my activites</h1>
    

        <table>
            <thead>
                <tr>
               <th>קוד פעילות</th>
               <th>שם פעילות</th>
               <th>מיקום</th>
               <th>מחיר</th>
               <th>תעריף לילה</th>
               <th>אורך הפעילות</th>
               <th></th>
               <th></th>
            
         </tr>   </thead>
            <tbody>
                {activites.length>0 && activites.map(c=> {return<tr className={c.id===mngId} onClick={() => {setMngId(c.id);setDelt(true);setEdit(true)}} key={c.id}>
                <td >{c.activityId}</td>
                <td>{c.activityDescription}</td>
                <td>{c.location?c.location:"המיקום לבחירתך"}</td>
                <td>{c.price}</td>
                <td>{c.nightPrice}</td>
                <td>{c.lenOfActivity}</td>
                
                
                
                <td>
                {/* <Button variant='outlined' onClick={()=>deleteCustomer(c.instituteId)} endIcon={<DeleteForeverOutlinedIcon htmlColor='#3b3a3d' />}  ></Button> */}
                <IconButton onClick={()=>deleteActivity(c.id)} aria-label="delete" size='large' >
                <DeleteForeverOutlinedIcon htmlColor=' #3b3a3d'/>
                </IconButton>
              
                </td>
                <td>
                {/* <Button variant='outlined' style={{backgroundColor:"white"}} onClick={()=>navigate(`editCustomer/${c.instituteId}`)} endIcon={<EditNoteOutlinedIcon  htmlColor='#3b3a3d' />}></Button> */}
                <IconButton onClick={()=>navigate(`editActivity/${c.id}`)} aria-label="edit" size='large' >
                <EditNoteOutlinedIcon htmlColor=' #3b3a3d'/>
                </IconButton>
                </td>
               </tr>})}
            </tbody>
        </table>
        <button className='button' onClick={()=>navigate('newActivity')}>add</button>

        {/* {delt && <button onClick={()=>deleteCustomer(custId)}>delete</button>}
        {edit && <button onClick={()=>navigate(`editCustomer/${custId}`)}>edit</button>} */}
        {/* <Button variant='text'>nnnngf</Button> */}
 <div>
    <Outlet></Outlet>
 </div>
    </div>
} 

