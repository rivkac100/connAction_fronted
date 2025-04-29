// // import { useState } from 'react';
// import './App.css';
// //import { Home } from './components/Home/home';
// //import { Mouse } from './components/Mouse/mouse';
// //import { Route, Routes } from 'react-router-dom';
// import { Routing } from './components/routing';


// function App() {

 
//     return (<div className='app'>

//     <Routing></Routing>

//     </div>
    
//   );
    
  
// }

// export default App;
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/more_components/ThemeProvider';
import { Login } from './components/login/Login';
import { Home } from './components/home/home';
import { Dashboard } from './components/more_components/Dashboard'

import { NewEditManager } from './components/manager/newEditManager';
import { AddEditOrder } from './components/orders/addEditOrder';
import { MyOrders } from './components/orders/myOrders';
import { Month } from './components/diary/Month';
// import { Profile } from './components/more_components/profile';
// import { About } from './components/more_components/about';
// import { NotFound } from './components/more_components/notFound';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/newManager" element={<NewEditManager />} />
          
          <Route path="/home/:id" element={<Dashboard />} />
          
          <Route path="/home/:id" element={<Home />}>
            <Route path="newOrder" element={<AddEditOrder />} />
            <Route path="myOrders" element={<MyOrders />} />
            <Route path="month" element={<Month />} />
            <Route path="upcoming" element={<MyOrders upcoming={true} />} />
          </Route>
          
          {/* <Route path="/profile/:id" element={<Profile />} /> */}
          {/* <Route path="/about" element={<About />} /> */}
          
          {/* <Route path="/404" element={<NotFound />} /> */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
