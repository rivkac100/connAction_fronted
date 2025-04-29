
import { Route, Routes } from "react-router-dom"
import { Customers } from "./customer/Customers"
import { Logon } from "./logon/logon"
import { Login } from "./login/Login"
import { Home } from "./home/home"
import { Orders } from "./orders/order"
import { MyOrders } from "./orders/myOrders"
import { AddEditOrder } from "./orders/addEditOrder"
import { Event } from "./diary/event"
import { Month } from "./diary/Month"
import { Week } from "./diary/Week"
import { DayView } from "./DayView/dayView"
import { Start } from "./start/start"




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
            <Route path={'/'} element={<Start />} ></Route>
            <Route path={'/customers'} element={<Customers />}>
                <Route path={'newCustomer'} element={<Logon />}></Route>
                <Route path={'editCustomer/:id'} element={<Logon />}></Route>
            </Route>
            <Route path={'/newCustomer'} element={<Logon />}></Route>

            <Route path={'/home/:id'} element={<Home />}>
                <Route path={'newOrder'} element={<AddEditOrder />}>

                </Route>
                {/* <Route path={'calandar'} element={<Calendar />}> */}
                <Route path={'month'} element={<Month />}>
                </Route>
                <Route path={"week"} element={<Week />}>
                </Route>
                <Route path={"day/:day/:month/:year"} element={<DayView />}></Route>

                <Route path={"event/:month/:day/:year"} element={<Event />}></Route>
                <Route path={"event"} element={<Event />}></Route>
                <Route path={'myOrders'} element={<MyOrders />}>
                <Route path={'editOrder/:orderId'} element={<AddEditOrder />}></Route>

            </Route>
            </Route>
      
            <Route path={'/orders'} element={<Orders />}>
                <Route path={'newOrder'} element={<AddEditOrder />}></Route>
                <Route path={'editOrder/:orderId'} element={<AddEditOrder />}></Route>
            </Route>
            


            {/* <Route path={'/event/:month/:day/:year'} element={<Event/>}></Route>  */}
        </Routes>
    </>
}
