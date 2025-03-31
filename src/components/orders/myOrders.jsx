
import { useEffect } from 'react';
// import './style.css'
import { useDispatch, useSelector } from "react-redux";
// import { searchEventThunk } from '../store/slices/searchEventThunk'
// import { useNavigate } from 'react-router-dom';
//import { ordersFetchThunk } from '../../store/slices/ordersFetch';
import './order.css'
//import { ordersFetchThunkById } from '../../store/slices/orderFetchById';
import {  useParams } from 'react-router-dom';
//import {  useFormStatus } from 'react-dom';

import { customersFetchThunkById } from '../../store/slices/customerFetchThunkById';

export const MyOrders = () => {
    //   const navigate = useNavigate()
    debugger
    //const status = useForm();
    //const status =useFormStatus();
    const params = useParams();
    const dispatch = useDispatch();
    const myOrders = useSelector(state => state.customer.MyOrders);
    console.log(myOrders);
    const id = params.id;
    const token = useSelector(state => state.order.token);
    const failed = useSelector(state => state.order.failed);



    useEffect(() => {
       // debugger
        //dispatch(ordersFetchThunkById(id));
        dispatch(customersFetchThunkById({id}));
        console.log(myOrders);
        //alert("I am in myOrders");
        // navigate(`/calendar`)

    }, [])
    // useEffect(() => {

    //     // if(orders.length>0)

    //     // navigate(`/calendar`)

    // }, [orders])

    useEffect(() => {

       // dispatch(ordersFetchThunkById(id));
        console.log(myOrders);

        // navigate(`/calendar`)

    }, [myOrders])


    return <div className='orderPage'>
        <h1 className='myOrders'>הסטורית הזמנות שלי</h1>

{/* {status.pending && <button>jkjuhgjifi</button>} */}
        <table>
            <thead>
                <tr>
                    <th>קוד הזמנה</th>
                    <th>שם לקוח</th>
                    <th>BrokerId</th>
                    <th>כמות משתתפים</th>
                    <th>תאריך</th>
                    <th>שם פעילות</th>
                    <th>שעה</th>
                    {/* <th>דקות</th> */}
                    <th>תשלום</th>
                </tr>
            </thead>
            <tbody>
                {myOrders && myOrders.map(o => {
                    return <tr key={o.orderId}>
                        <td>{o.orderId}</td>
                        <td>{o.customerId}</td>
                        <td>{o.brokerId}</td>
                        <td>{o.amountOfParticipants}</td>
                        <td>{o.date}</td>
                        <td>{o.activityId}</td>
                        <td>{o.activeHour}</td>
                        {/* <td>{o.activeMinutes}</td> */}
                        <td>{o.payment}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
} 