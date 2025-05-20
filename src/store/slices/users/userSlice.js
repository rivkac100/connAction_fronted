import { createSlice } from '@reduxjs/toolkit'
import { findUserByPassId } from './findUserByPassId';


const INITIAL_STATE_USER = {

    myUser:null,
    
    token: null,
    sucsses: false,
    failed: false
}

export const userSlice = createSlice({

    name: 'user',
    initialState: INITIAL_STATE_USER,
    reducers: {
        editOrder: (state, action) => {
            // state.orders = action.payload;
        },
    },

    extraReducers: (builder) => {
     

        //הוספת מקרה שהט'נק התחיל
        builder.addCase(findUserByPassId.pending, (state, action) => {
        });
        //הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(findUserByPassId.fulfilled, (state, action) => {
            console.log(action.payload);
            debugger
            state.myUser = action.payload;
            console.log(state.myUser);
             state.sucsses = true;
        });
        //הוספת מקרה שהט'נק נכשל
        builder.addCase(findUserByPassId.rejected, (state, action) => {
            console.log(action.payload);
            state.myUser=action.payload;
            state.failed = true;
        });


      

    }
})
export const {editOrder} = userSlice.actions;