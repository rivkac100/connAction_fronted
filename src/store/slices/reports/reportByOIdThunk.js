import { createAsyncThunk } from '@reduxjs/toolkit'

export const reportByOIdThunk = createAsyncThunk(
    'reportByOIdThunk',

    async ({ id }) => {
        debugger
        const response = await fetch(`https://localhost:7044/api/Report/GetByOrderId/${id}`,)
        debugger
        if (response.ok) {
            const data = await response.json();
            // if(!data.id)
            //   return null;
            console.log("fetch success get event");
            return data;
        }

        else {
         
            throw new Error("failed to fetch");
        }
    }
)