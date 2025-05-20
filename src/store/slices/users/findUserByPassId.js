import { createAsyncThunk } from '@reduxjs/toolkit'

export const findUserByPassId = createAsyncThunk(
    'findUserByPassId',

    async ({pass}) => {
        debugger
        const response = await fetch(`https://localhost:7044/api/User/GetById/${pass}`);
      
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        }

        else {
            alert("ordersFetch")
            throw new Error("failed to fetch");
        }
    }
)