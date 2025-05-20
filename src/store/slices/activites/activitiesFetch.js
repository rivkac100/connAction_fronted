import { createAsyncThunk } from '@reduxjs/toolkit'

export const activitiesFetch = createAsyncThunk(
    'activitiesFetch',

    async () => {
        debugger
        const response = await fetch("https://localhost:7044/api/Activites/GetAll");

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        }

        else {
            alert("activity Fetch")
            throw new Error("failed to fetch");
        }
    }
)