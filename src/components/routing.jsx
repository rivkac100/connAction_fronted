
// import { Navigate, Route, Routes } from "react-router-dom"
// import { Customers } from "./customer/Customers"
// import { NewEditCustomer } from "./customer/newEditCustomer"
// import { Login } from "./login/Login"
// import { Home } from "./home/home"
// import { Orders } from "./orders/order"
// import { MyOrders } from "./orders/myOrders"
// import { AddEditOrder } from "./orders/addEditOrder"
// import { Event } from "./diary/event"
// import { Month } from "./diary/Month"
// import { Week } from "./diary/Week"
// import { DayView } from "./DayView/dayView"
// import { Start } from "./start/start"
// import { NewEditManager } from "./manager/newEditManager"
// import { Managers } from "./manager/Managers"
// import { Profile } from './more_components/profile';
// import { About } from './more_components/about';
// import { NotFound } from './more_components/notFound';
// import { Dashboard } from './more_components/Dashboard'
// import { Activities } from "./activites/activites"



// export const Routing = () => {

//     return <>
//         <Routes>

//             <Route path={'/'} element={<Start />} >
//             </Route>            <Route path={'/activites'} element={<Activities />}/>

//             <Route path={'/login'} element={<Login />}></Route>
//             <Route path={'/managers'} element={<Managers />}>
//                 <Route path={'newManager'} element={<NewEditManager />}></Route>
//                 <Route path={'editManager/:id'} element={<NewEditManager />}></Route>
//             </Route>
//             <Route path={'/customers'} element={<Customers />}>
//                 <Route path={'newCustomer'} element={<NewEditCustomer />}></Route>
//                 <Route path={'editCustomer/:id'} element={<NewEditCustomer />}></Route>
//             </Route>
//             <Route path={'/newCustomer'} element={<NewEditCustomer />}></Route>
//             <Route path={'/home'} element={<Home />}></Route>

//             <Route path={'/home/:id'} element={<Home />}>
//                 <Route path={'newOrder'} element={<AddEditOrder />}>

//                 </Route>
//                 <Route path="upcoming" element={<MyOrders upcoming={true} />} />

//                 <Route path={'month'} element={<Month />}>
//                 </Route>
//                 <Route path={"week"} element={<Week />}>
//                 </Route>
//                 <Route path={"day/:day/:month/:year"} element={<DayView />}></Route>

//                 <Route path={"event/:month/:day/:year"} element={<Event />}></Route>
//                 <Route path={"event"} element={<Event />}></Route>
//                 <Route path={'myOrders'} element={<MyOrders />}>
//                     <Route path={'editOrder/:orderId'} element={<AddEditOrder />}></Route>

//                 </Route>
//                 <Route path={'activites'} element={<Activities />}/>
//             </Route>

//             <Route path={'/orders'} element={<Orders />}>
//                 <Route path={'newOrder'} element={<AddEditOrder />}></Route>
//                 <Route path={'editOrder/:orderId'} element={<AddEditOrder />}></Route>
//             </Route>

//             {/* <Route path="/" element={<Login />} /> */}
//             {/* <Route path="/newManager" element={<NewEditManager />} /> */}

//             <Route path="/manager/:id" element={<Dashboard />} >
//             <Route path="upcoming" element={<MyOrders upcoming={true} />} />

//             <Route path={'month'} element={<Month />}>
//             </Route>
//             <Route path={"week"} element={<Week />}>
//             </Route>
//             <Route path={'newOrder'} element={<AddEditOrder />}></Route>
//             <Route path={'orders'} element={<Orders />}>
//                 <Route path={'newOrder'} element={<AddEditOrder />}></Route>
//                 <Route path={'editOrder/:orderId'} element={<AddEditOrder />}></Route>
//             </Route></Route>
//             <Route path="/profile/:id" element={<Profile />} />
//             <Route path="/about" element={<About />} />

//             <Route path="/404" element={<NotFound />} />
//             <Route path="*" element={<Navigate to="/404" replace />} />


//             {/* <Route path={'/event/:month/:day/:year'} element={<Event/>}></Route>  */}
//         </Routes>
//     </>
// }
import { Navigate, Route, Routes } from "react-router-dom";
import { Customers } from "./customer/Customers";
import { NewEditCustomer } from "./customer/newEditCustomer";
// import { Login } from "./login/Login";
import { Home } from "./home/home";
import { Orders } from "./orders/order";
import { MyOrders } from "./orders/myOrders";
import { AddEditOrder } from "./orders/addEditOrder";
import { Event } from "./diary/event";
import { Month } from "./diary/Month";
import { Week } from "./diary/Week";
import { DayView } from "./DayView/dayView";
import { Start } from "./start/start";
// import { NewEditManager } from "./manager/newEditManager";
import { Managers } from "./manager/Managers";
import { Profile } from './more_components/profile';
import { About } from './more_components/about';
import { NotFound } from './more_components/notFound';
import { Dashboard } from './more_components/Dashboard';
import { Activities } from './activites/activites';
import { Logon } from "./logon/logon";
import { Navigation } from "./more_components/navigation";
import { AddEditActivity } from "./activites/newEditActivity";
import { LogonManager } from "./logon/logonManager";
import { Payment } from './payment/Payment';
import { Report } from "./Report/Report";

export const Routing = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path={"activites"} element={<Activities />} />

      <Route path="/" element={<About />} />
      <Route path="/login" element={<Start />} >
        <Route path="logon" element={<Logon />} />
        <Route path="logonManager" element={<LogonManager />} />
      </Route>
      <Route path="/about" element={<About />} />


      {/* Manager routes */}
      <Route path="/managers" element={<Managers />}>
        {/* <Route path="newManager" element={<NewEditManager />} />
        <Route path="editManager/:id" element={<NewEditManager />} /> */}
      </Route>

      {/* Customer routes */}
      <Route path="/customers" element={<Customers />} />
      {/* <Route path="newCustomer" element={<NewEditCustomer />} />
        <Route path="editCustomer/:id" element={<NewEditCustomer />} />
      </Route>
      <Route path="/newCustomer" element={<NewEditCustomer />} /> */}

      {/* Home and nested routes */}

      <Route path="/home/:id" element={<Home />}>
        <Route path="activities/:mid" element={<Activities />} >
          <Route path="newActivity" element={<AddEditActivity />} />
          <Route path="profile" element={<Profile />} />
          <Route path="newOrder/:idActivity" element={<AddEditOrder />} >
            <Route path="payment" element={<Payment />} />
          </Route>
        </Route>
        <Route path="newOrder" element={<AddEditOrder />} >
        <Route path="payment" element={<Payment />} />
          </Route>
        <Route path="upcoming" element={<MyOrders upcoming={true} />} />
        <Route path="myOrders" element={<MyOrders />}>
          <Route path="newOrder" element={<AddEditOrder />} >
            <Route path="payment" element={<Payment />} />
          </Route>
          <Route path="editOrder/:orderId" element={<AddEditOrder />} >
            <Route path="payment" element={<Payment />} />
          </Route>
        </Route>
        <Route path="profile/:mid" element={<Profile />} />
        <Route path="activities" element={<Activities />} >
          <Route path="newOrder/:idActivity" element={<AddEditOrder />} >
            <Route path="payment" element={<Payment />} />
          </Route>
        </Route>
      </Route>

      {/* Order routes */}
      {/* <Route path="/orders" element={<Orders />}>
        <Route path="newOrder" element={<AddEditOrder />} />
        <Route path="editOrder/:orderId" element={<AddEditOrder />} />
      </Route> */}
      <Route path="/newActivity" element={<AddEditActivity />} />
      <Route path="/tp" element={<Report />} />
     
      {/* Dashboard routes */}
      <Route path="/manager/:mid" element={<Dashboard />}>
        <Route path="activities" element={<Activities />} >
          <Route path="newActivity" element={<AddEditActivity />} />
          <Route path="newOrder" element={<AddEditOrder />} >
            <Route path="payment" element={<Payment />} />
          </Route>
          <Route path="customers" element={<Customers />} />
          <Route path="myOrders/:oid" element={<MyOrders />} >
            <Route path="newOrder" element={<AddEditOrder />} >
              <Route path="payment" element={<Payment />} />
            </Route>
            <Route path="editOrder/:orderId" element={<AddEditOrder />} >
              <Route path="payment" element={<Payment />} />
            </Route>
          </Route>
          <Route path="newActivity" element={<AddEditActivity />} />
          {/* <Route path="editActivity:aid" element={<AddEditActivity />} /> */}
        </Route>
        <Route path="newActivity" element={<AddEditActivity />} />
        <Route path="upcoming" element={<MyOrders upcoming={true} />} />
        <Route path="month" element={<Month />}>
          <Route path="newOrder" element={<AddEditOrder />} />
          <Route path="day/:day/:month/:year" element={<DayView />} />
          <Route path="newEvent" element={<Event />} />
        </Route>
        <Route path="week" element={<Week />} />
        <Route path="day/:day/:month/:year" element={<DayView />} />
        <Route path="event/:month/:day/:year" element={<Event />} />
        <Route path="newEvent" element={<Event />} />
        <Route path="newOrder" element={<AddEditOrder />} />

        {/* <Route path="newActivity" element={<AddEditActivity />} />*/}
        <Route path="orders" element={<MyOrders />}>
          <Route path="newOrder" element={<AddEditOrder />} />
          <Route path="editOrder/:orderId" element={<AddEditOrder />} />
        </Route>
        <Route path="customers" element={<Customers />}>
          <Route path="newCustomer" element={<NewEditCustomer />} />
          <Route path="editCustomer/:id" element={<NewEditCustomer />} />
        </Route>
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Profile route */}
      <Route path="/profile/:id" element={<Profile />} />

      {/* Activities route */}
      <Route path="/activites" element={<Activities />} />

      {/* Error handling */}
      <Route path="/nav" element={<Navigation />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};
