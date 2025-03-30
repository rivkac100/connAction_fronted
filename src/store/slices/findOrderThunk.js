import { createAsyncThunk } from '@reduxjs/toolkit'

export const findOrderThunk = createAsyncThunk(
    'findOrderThunk',

    async ({ token }) => {

        const response = await fetch(`https://localhost:7044/api/Orders/GetById/${token}`,)
        if (response.ok) {
            const data = await response.json();
            console.log("fetch success get event");
            return data.orders;
        }

        else {
            alert("findLogin")
            throw new Error("failed to fetch");
        }
    }
)