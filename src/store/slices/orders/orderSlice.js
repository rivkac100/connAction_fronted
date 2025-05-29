import { createSlice } from '@reduxjs/toolkit'
import { addOrderThunk } from './addOrderThunk';
import { updateOrderThunk } from './updateOrderThunk';
import { ordersFetchThunk } from './ordersFetch';
import { findOrderThunk } from './findOrderThunk';
import { deleteOrderThunk } from './deleteOrderThunk';
import { ordersFetchThunkById } from './orderFetchById';
//import { ordersFetchThunkById } from './ordersThunkById';
const INITIAL_STATE_ORDER = {
    //InstituteName: -1,
    orderId: "",
    activityName: "",
    Myorders:[],
    orders: [],
    order:{},
    myReport:{},
    update: false,
    add: false,
    findOrder:true,
    activity:false,
    token: null,
    sucsses: false,
    failed: false
}

export const ordersSlice = createSlice({

    name: 'order',
    initialState: INITIAL_STATE_ORDER,
    reducers: {
        editOrder: (state, action) => {
            state.order = action.payload;
        },
        // editUserName: (state, action) => {
        //     state.InstituteName = action.payload;
        // },
        // editPassword: (state, action) => {
        //     state.InstituteName = action.payload;
        // },
        editToken: (state, action) => {
            state.token = action.payload;
        },
        editfindOrder: (state, action) => {
            state.findOrder = false;
            state.update = false;
            state.add = true;
            state.activity=true;
        },

        editActivityName: (state, action) => {
            state.activityName = action.payload;
        }
    },

    extraReducers: (builder) => {
        //add

        //הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(addOrderThunk.fulfilled, (state, action) => {
            debugger
            // state.token = action.meta.org.order;
            state.token=0;
            state.sucsses = true;
            // state.myReport=action.payload[action.payload.length-1].report;
        });
        //הוספת מקרה שהט'נק נכשל
        builder.addCase(addOrderThunk.rejected, (state, action) => {
            state.token = -2;
        });

        //update

        //הוספת מקרה שהט'נק התחיל
        builder.addCase(updateOrderThunk.pending, (state, action) => {
        });
        //הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(updateOrderThunk.fulfilled, (state, action) => {
             state.orders = action.payload;
            //  console.log(action.payload.last().reports[0])
            //  state.myReport=action.payload.last().report;
             state.sucsses = true;
        });
        //הוספת מקרה שהט'נק נכשל
        builder.addCase(updateOrderThunk.rejected, (state, action) => {
            state.failed = true;
        });

        builder.addCase(findOrderThunk.pending, (state, action) => {
        });
        //הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(findOrderThunk.fulfilled, (state, action) => {
             state.order = action.payload;
             state.update = true;
             state.add = false;
             console.log(action.payload.report);
             state.myReport = action.payload.report;
             state.findOrder = false;
             state.activity=true;
        });
        //הוספת מקרה שהט'נק נכשל
        builder.addCase(findOrderThunk.rejected, (state, action) => {
            state.failed = true;
        });
        //delete

        // הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(deleteOrderThunk.fulfilled, (state, action) => {
            // state.events=state.events.filter( e => e.id!=action.payload)

        });

        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(deleteOrderThunk.rejected, (state, action) => {
        });

        //getAll

        builder.addCase(ordersFetchThunk.pending, (state, action) => {
           
        });

        builder.addCase(ordersFetchThunk.fulfilled, (state, action) => {
            state.orders = action.payload;
        });

        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(ordersFetchThunk.rejected, (state, action) => {
            state.token = -1;
            console.log("couldent search event");
        });
        //ordersByCustomerId   
        builder.addCase(ordersFetchThunkById.pending, (state, action) => {
           
        });

        builder.addCase(ordersFetchThunkById.fulfilled, (state, action) => {
            state.Myorders = action.payload;
        });

        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(ordersFetchThunkById.rejected, (state, action) => {
            state.token = -1;
            console.log("couldent search event");
        }); 
        //getById

        


    }
})
export const { editOrder, editToken ,editActivityName,editfindOrder} = ordersSlice.actions;