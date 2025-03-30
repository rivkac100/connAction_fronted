import { configureStore } from '@reduxjs/toolkit'
import { customersSlice } from './slices/customersSlice'
import { combineSlices } from "@reduxjs/toolkit"
import { ordersSlice } from './slices/orderSlice';
import { eventSlice } from './slices/eventSlice';
// import { eventSlice } from './slices/eventSlice';

const reducers = combineSlices(customersSlice,ordersSlice,eventSlice);

export const STORE = configureStore({
    reducer: reducers,
})