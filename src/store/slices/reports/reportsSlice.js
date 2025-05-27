import { createSlice } from '@reduxjs/toolkit'
import { addCustomerThunk } from './addCustomerThunk';
import { customersFetchThunk } from './customersFetch';
//import { findCustomerThunk } from './findCustomerThunk';
import { deleteCustomerThunk } from './deleteCustomerThunk';
import { customersFetchThunkById } from './customerFetchThunkById';
import { updateCustomerThunk } from './updateCustomerThunk';
import { addReportThunk } from './addReportThunk';
import { reportFetchThunkById } from './reportFetchThunkById';
import { deleteReportThunk } from './deleteReportThunk';
import { reportByOIdThunk } from './reportByOIdThunk';
import { reportByMIdThunk } from './reportByMIdThunk';
import { reportByAIdThunk } from './reportByAIdThunk';
import { reportByCIdThunk } from './reportByCIdThunk';

const INITIAL_STATE_REPORT = {
    

    myReports: [],
    report: {},

    token: null,
    sucsses: false,
    failed: false,


}

export const customersSlice = createSlice({

    name: 'report',
    initialState: INITIAL_STATE_REPORT,
    reducers: {
        editReport: (state, action) => {
            state.report = action.payload;
        },
        // editUserName: (state, action) => {
        //     state.InstituteName = action.payload;
        // },
        editReports: (state, action) => {
            state.myReports = action.payload;
        },
        editToken: (state, action) => {
            state.token = action.payload;
        },
        editIsManager: (state, action) => {
            state.manager = true;
        }
    },

    extraReducers: (builder) => {
        //add

        //הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(addReportThunk.fulfilled, (state, action) => {
            debugger
            // state.token = action.meta.org.customer;
            state.customers=action.payload
            state.token=0;
            state.sucsses = true;
        });
        //הוספת מקרה שהט'נק נכשל
        builder.addCase(addReportThunk.rejected, (state, action) => {
            state.token = -2;
        });

        //update

        //הוספת מקרה שהט'נק התחיל
        // builder.addCase(updateCustomerThunk.pending, (state, action) => {
        // });
        // //הוספת מקרה שהט'נק הסתיים בהצלחה
        // builder.addCase(updateCustomerThunk.fulfilled, (state, action) => {
        //     state.customers=action.payload
        //     // state.token = action.payload;
        //     state.sucsses = true;
        // });
        // //הוספת מקרה שהט'נק נכשל
        // builder.addCase(updateCustomerThunk.rejected, (state, action) => {
        //     state.failed = true;
        // });

        //delete

        // הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(deleteReportThunk.fulfilled, (state, action) => {
          
            // state.events=state.events.filter( e => e.id!=action.payload)

        });

        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(deleteReportThunk.rejected, (state, action) => {
        });

        //getAll

        builder.addCase(reportByOIdThunk.pending, (state, action) => {
           
        });

        builder.addCase(reportByOIdThunk.fulfilled, (state, action) => {
            sessionStorage.setItem("report", JSON.stringify(action.payload));
            state.myReports = action.payload;
        });

        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(reportByOIdThunk.rejected, (state, action) => {
            state.token = -1;
            console.log("couldent search event");
        });
        builder.addCase(reportByMIdThunk.pending, (state, action) => {
           
        });

        builder.addCase(reportByMIdThunk.fulfilled, (state, action) => {
            sessionStorage.setItem("report", JSON.stringify(action.payload));
            state.myReports = action.payload;
        });

        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(reportByMIdThunk.rejected, (state, action) => {
            state.token = -1;
            console.log("couldent search event");
        });
        builder.addCase(reportByCIdThunk.pending, (state, action) => {
           
        });

        builder.addCase(reportByCIdThunk.fulfilled, (state, action) => {
            sessionStorage.setItem("report", JSON.stringify(action.payload));
            state.myReports = action.payload;
        });

        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(reportByCIdThunk.rejected, (state, action) => {
            state.token = -1;
            console.log("couldent search event");
        });
        builder.addCase(reportByAIdThunk.pending, (state, action) => {
           
        });

        builder.addCase(reportByAIdThunk.fulfilled, (state, action) => {
            sessionStorage.setItem("report", JSON.stringify(action.payload));
            state.myReports = action.payload;
        });

        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(reportByAIdThunk.rejected, (state, action) => {
            state.token = -1;
            console.log("couldent search event");
        });
        //getById

        builder.addCase(reportFetchThunkById.fulfilled, (state, action) => {
            console.log(action.payload);
            state.report = action.payload;
    

        });



    }
})
export const { editReport, editToken,editReports,editIsManager } = customersSlice.actions;