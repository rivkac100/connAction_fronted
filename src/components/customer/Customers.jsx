
import { useEffect, useState} from 'react';
// import './style.css'
import { useDispatch, useSelector } from "react-redux";
// import { searchEventThunk } from '../store/slices/searchEventThunk'
import { Outlet, useNavigate } from 'react-router-dom';
import {deleteCustomerThunk} from '../../store/slices/deleteCustomerThunk'
import {customersFetchThunk } from '../../store/slices/customersFetch';
import './customer.css'
import '@emotion/styled'
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
// import {EditDocumentIcon} from '@mui/icons-material/EditDocument';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

export const Customers =()=>{
   const navigate = useNavigate()
  const dispatch= useDispatch();
  const customers= useSelector(state=>state.customer.customers)
  console.log(customers)
  
  const token = useSelector(state => state.customer.token);
  const failed = useSelector(state => state.customer.failed);
  const [delt,setDelt]=useState(false);
  const [edit,setEdit]=useState(false);
  const [custId, setCustId]=useState(-1);
  
 useEffect(() => {
    
  dispatch(customersFetchThunk());
       
  // navigate(`/calendar`)
    
}, [])
useEffect(() => {
    
   // if(customers.length>0)
         
  // navigate(`/calendar`)
      
  }, [customers])

const  deleteCustomer=async(id)=>{
    debugger
    dispatch(deleteCustomerThunk(id))
   console.log("success");

}
   

   return  <div className='CustomerPage'>
    <h1 className='myCustomers'>my Customers</h1>
    

        <table>
            <thead>
                <tr>
               <th>InstituteId</th>
               <th>InstituteName</th>
               <th>Fax</th>
               <th>Telephone</th>
               <th>Email</th>
               <th>ContactName</th>
               <th>ContactPhone</th>
               <th>City</th>
               <th>Community</th>
               <th>Amount</th>
               <th>Due</th>
               <th></th>
               <th></th>
         </tr>   </thead>
            <tbody>
                {customers.length>0 && customers.map(c=> {return<tr className={c.instituteId===custId} onClick={() => {setCustId(c.instituteId);setDelt(true);setEdit(true)}} key={c.instituteId}>
                <td >{c.instituteId}</td>
                <td>{c.instituteName}</td>
                <td>{c.fax}</td>
                <td>{c.mobile}</td>
                <td>{c.email}</td>
                <td>{c.contactName}</td>
                <td>{c.contactPhone}</td>
                <td>{c.city}</td>
                <td>{c.community}</td>
                <td>{c.amount}</td>
                <td>{c.due}</td>
                <td>
                {/* <Button variant='outlined' onClick={()=>deleteCustomer(c.instituteId)} endIcon={<DeleteForeverOutlinedIcon htmlColor='#3b3a3d' />}  ></Button> */}
                <IconButton onClick={()=>deleteCustomer(c.instituteId)} aria-label="delete" size='large' >
                <DeleteForeverOutlinedIcon htmlColor=' #3b3a3d'/>
                </IconButton>
              
                </td>
                <td>
                {/* <Button variant='outlined' style={{backgroundColor:"white"}} onClick={()=>navigate(`editCustomer/${c.instituteId}`)} endIcon={<EditNoteOutlinedIcon  htmlColor='#3b3a3d' />}></Button> */}
                <IconButton onClick={()=>navigate(`editCustomer/${c.instituteId}`)} aria-label="edit" size='large' >
                <EditNoteOutlinedIcon htmlColor=' #3b3a3d'/>
                </IconButton>
                </td>
               </tr>})}
            </tbody>
        </table>
        <button className='button' onClick={()=>navigate('newCustomer')}>add</button>

        {/* {delt && <button onClick={()=>deleteCustomer(custId)}>delete</button>}
        {edit && <button onClick={()=>navigate(`editCustomer/${custId}`)}>edit</button>} */}
        {/* <Button variant='text'>nnnngf</Button> */}
 <div>
    <Outlet></Outlet>
 </div>
    </div>
} 