
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ordersFetchThunk } from '../../store/slices/ordersFetch';
import { deleteOrderThunk } from '../../store/slices/deleteOrderThunk'
import './order.css'
import { useNavigate } from 'react-router-dom';
import { findCustomerThunk } from '../../store/slices/findCustomerThunk';

export const Orders = () => {

    const dispatch = useDispatch();
    const orders = useSelector(state => state.order.orders)
    const customer=useSelector(state=>state.customer.customer)
   
    const navigate = useNavigate();
    const [delt, setDelt] = useState(false);
    const [edit, setEdit] = useState(false);
    const [ordId, setOrdId] = useState(-1);
    // const token = useSelector(state => state.order.token);
    // const failed = useSelector(state => state.order.failed)



    useEffect(() => {
        debugger
        dispatch(ordersFetchThunk());
       
        // navigate(`/calendar`)

    }, [])
    useEffect(() => {

        // if(orders.length>0)
       // dispatch(ordersFetchThunk());
        // navigate(`/calendar`)
        console.log(orders);
    }, [orders])

    const deleteOrder = async (orderId) => {
        debugger
        dispatch(deleteOrderThunk(orderId))
        console.log("success");

    }
    const getDitals=async(o)=>{
        dispatch(findCustomerThunk({id:o.customerId}))

    }


    return <div className='orderPage'>
        <h1 className='myOrders'>myOrders</h1>


        <table>
            <thead>
                <tr>
                    <th>קוד הזמנה</th>
                    <th>שם לקוח</th>
                    <th>שם מתווך</th>
                    <th>כמות משתתפים</th>
                    <th>שם פעילות</th>
                    <th>תאריך</th>
                    <th>שעה</th>
                    <th>תשלום</th>
                </tr>   </thead>
            <tbody>
                {orders.length > 0 && orders.map(o => { getDitals(o);
                    return <tr className={o.orderId === ordId} onClick={() => { setOrdId(o.orderId); setDelt(true); setEdit(true) }} key={o.ordIdId}>
                       
                        <td>{o.orderId}</td>
                        {/* שם לקוח */}
                        <td>{customer.instituteName}</td>
                        {/* <td>{getDitals(o).id}</td> */}
                        {/* שם מתווך */}
                        <td>{o.brokerId}</td>
                        <td>{o.amountOfParticipants}</td>
                        {/* שם פעילות */}
                        <td>{o.activityId}</td>
                        <td>{o.date}</td>
                        <td>{o.activeHour}</td>
                        <td>{o.payment}</td>
                    </tr>
                })}
            </tbody>
        </table>
        <button onClick={() => navigate('/newOrder')}>add</button>

        {delt && <button onClick={() => deleteOrder(ordId)}>delete</button>}
        {edit && <button onClick={() => navigate(`/editOrder/${ordId}`)}>edit</button>}
    
    </div>
} 