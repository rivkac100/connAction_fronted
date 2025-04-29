import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./logon.css"
import { useParams } from 'react-router-dom';
import { addCustomerThunk } from "../../store/slices/addCustomerThunk";
import { useNavigate } from "react-router-dom";
import { updateCustomerThunk } from "../../store/slices/updateCustomerThunk";
import { customersFetchThunkById } from "../../store/slices/customerFetchThunkById";
import { Button } from "@mui/material";

export const Logon = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const customers = useSelector(state => state.customer.customers)
    const token = useSelector(state => state.customer.token)
    const myCustomer = useSelector(state => state.customer.customer)
    const refDialog = useRef();

    // const [customer, setCustomer] = useState({
    //     instituteName: "", mobile: "", email: "",
    //     fax: "", contactName: "", contactPhone: "", city: "", community: "", amount: 0,
    //     due: 0
    // });
    const [customer, setCustomer] = useState(myCustomer)
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState(-1)
    useEffect(() => {

        //    setId(params.id)
        //    console.log(id);
        if (params.id) {
            console.log(params.id);

            //setId(parseInt(params.id))
            // console.log(id)
            // let c = customers.find(x => x.instituteId===parseInt(params.id));
            dispatch(customersFetchThunkById({ id: params.id }));
            setCustomer(myCustomer);
            // for (const key in object) {
            //     if (Object.hasOwnProperty.call(object, key)) {
            //         const element = object[key];

            //     }.
            //}
            // 
            // setCustomer(c);
            console.log(customer);
            setEdit(true)
        }
        refDialog.current.showModal();

    }, [])
    //const refDialog = useRef()
    // const navigate = useNavigate();
    // useEffect(() => {
    //     refDialog.current.showModal();
    //  }, []);
    const logOnn = () => {
        debugger
        if (edit) {
            dispatch(updateCustomerThunk({ details: customer }))
            refDialog.current.close();

            navigate('/customers')
        }
        else {
            dispatch(addCustomerThunk({ details: customer }));
            // console.log(token);
            refDialog.current.close();

            navigate('/customers')

        }

        // if (token === 0) {
        //     // navigate(`/home/${}`);
        //     console.log("aabb");
        // }
        // dispatch(setCurrentUser({ username: user.username, password: user.password, token: -1 }))
        // navigate("/calender");
    }

    return <dialog ref={refDialog} className="inDiv" >

        <br /><input className="logBut" type="text" value={customer?.community} placeholder="insert community" onChange={e => setCustomer({ ...customer, community: e.target.value })} />
        <br /><input className="logBut" type="text" value={customer?.mobile} placeholder="insert telephone" onChange={e => setCustomer({ ...customer, mobile: e.target.value })} />
        <br /><input className="logBut" type="text" value={customer?.fax} placeholder="insert fax" onChange={e => setCustomer({ ...customer, fax: e.target.value })} />
        <br /><input className="logBut" type="email" value={customer?.email} placeholder="insert email" onChange={e => setCustomer({ ...customer, email: e.target.value })} />
        <br /><input className="logBut" type="text" value={customer?.contactName} placeholder="insert contactName" onChange={e => setCustomer({ ...customer, contactName: e.target.value })} />
        <br /><input className="logBut" type="text" value={customer?.contactPhone} placeholder="insert contactPhone" onChange={e => setCustomer({ ...customer, contactPhone: e.target.value })} />
        <br /><input className="logBut" type="text" value={customer?.city} placeholder="insert city" onChange={e => setCustomer({ ...customer, city: e.target.value })} />
        <input className="logBut" type="text" value={customer?.instituteName} placeholder="insert name" onChange={e => setCustomer({ ...customer, instituteName: e.target.value })} />
        {/* {raute && refDialog.current.close()} */}
        <br /><button className="login" onClick={() => { logOnn() }}>log on</button>
        {params.id && <button className="login" onClick={() => {
            refDialog.current.close();

            navigate('/customers')
        }}>back</button>
        }
    </dialog>
}

