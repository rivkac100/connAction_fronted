
import { Route, Routes } from "react-router-dom"
import { Customers } from "./customer/Customers"
import { NewEditCustomer } from "./customer/newEditCustomer"
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
import { NewEditManager } from "./manager/newEditManager"
import { Managers } from "./manager/Managers"




export const Routing = () => {

    return <>
        <Routes>

            <Route path={'/'} element={<Start />} >

            </Route>
            <Route path={'/login'} element={<Login />}></Route>
            <Route path={'/managers'} element={<Managers />}>
                <Route path={'newManager'} element={<NewEditManager />}></Route>
                <Route path={'editManager/:id'} element={<NewEditManager />}></Route>
            </Route>
            <Route path={'/customers'} element={<Customers />}>
                <Route path={'newCustomer'} element={<NewEditCustomer />}></Route>
                <Route path={'editCustomer/:id'} element={<NewEditCustomer />}></Route>
            </Route>
            <Route path={'/newCustomer'} element={<NewEditCustomer />}></Route>
            <Route path={'/home'} element={<Home />}></Route>

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
