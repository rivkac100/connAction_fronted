import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
<<<<<<< HEAD
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <App />

=======
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {STORE} from './store/store'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={STORE}>
  <BrowserRouter>
   <App />
 </BrowserRouter>
 </Provider>
>>>>>>> 9221468ce2241c2375007429ff5aa105ca7e0893
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
