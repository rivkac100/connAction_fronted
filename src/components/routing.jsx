import { Route, Routes } from "react-router-dom"
import { Customers } from "./customer/Customers"
import { Logon } from "./logon/logon"
import { Login } from "./login/Login"
import { Home } from "./home/home"
import { Orders } from "./orders/order"
import { MyOrders } from "./orders/myOrders"
import { LogonOrder } from "./orders/addEditOrder"
import { Calendar } from "./diary/calendar"
import { Event } from "./diary/event"




export const Routing = () => {

    return <>
        <Routes>
            {/* <Route path={'/search'} element={<Search />}></Route>
            <Route path={'/calendar'} element={<Calendar />}></Route>
            <Route path={'/'} element={<Login />} ></Route>
            <Route path={'/newUser'} element={<NewUser />} ></Route>
            <Route path={'/event'} element={<Event />}></Route>
            <Route path={`/event/:day/:month/:year/:eventId`} element={<Event />} ></Route>
            <Route path={`/event/:day/:month/:year`} element={<Event />} ></Route>
            <Route path={'/login'} element={<Login />}></Route> */}
            <Route path={'/'} element={<Login />} ></Route>
            <Route path={'/customers'} element={<Customers/>}></Route> 
            <Route path={'/newCustomer'} element={<Logon/>}></Route> 
            <Route path={'/editCustomer/:id'} element={<Logon/>}></Route> 
            <Route path={'/home/:id'} element={<Home/>}></Route>
            <Route path={'/orders'} element={<Orders/>}></Route>
            <Route path={'/myOrders/:id'} element={<MyOrders/>}></Route>
            <Route path={'/newOrder'} element={<LogonOrder/>}></Route> 
            <Route path={'/editOrder/:id'} element={<LogonOrder/>}></Route> 
            <Route path={'/home/:id/calandar'} element={<Calendar/>}>
                <Route path={"event/:month/:day/:year"} element={<Event/>}></Route>
                <Route path={"event"} element={<Event/>}></Route>
            </Route> 
            {/* <Route path={'/event/:month/:day/:year'} element={<Event/>}></Route>  */}

        </Routes>
    </>
}