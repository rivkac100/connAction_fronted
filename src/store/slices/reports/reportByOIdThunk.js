import { createAsyncThunk } from '@reduxjs/toolkit'

export const reportByOIdThunk = createAsyncThunk(
    'reportByOIdThunk',

    async ({ id }) => {

        const response = await fetch(`https://localhost:7044/api/Report/GetByOrderId/${id}`,)
        if (response.ok) {
            const data = await response.json();
            console.log("fetch success get event");
            return data;
        }

        else {
            alert("findLogin")
            throw new Error("failed to fetch");
        }
    }
)