<<<<<<< HEAD



import { createAsyncThunk } from '@reduxjs/toolkit'

export const findEventThunkById = createAsyncThunk(
    'findEventThunkById',
    async ({ eventId }) => {

        const response = await fetch(`https://localhost:7044/api/Event/GetByid/${eventId}`,)

        if (response.ok) {
            const data = await response.json();
            console.log("fetch success get event");
            console.log(data);
            return data;
        }

        else {
            //alert("findLogin")
            throw new Error("failed to fetch");
        }
    }
=======



import { createAsyncThunk } from '@reduxjs/toolkit'

export const findEventThunkById = createAsyncThunk(
    'findEventThunkById',
    async ({ eventId }) => {

        const response = await fetch(`https://localhost:7044/api/Event/GetByid/${eventId}`,)

        if (response.ok) {
            const data = await response.json();
            console.log("fetch success get event");
            console.log(data);
            return data;
        }

        else {
            //alert("findLogin")
            throw new Error("failed to fetch");
        }
    }
>>>>>>> ef9fa70721cd9013739de9d55184d1f9a325e648
)