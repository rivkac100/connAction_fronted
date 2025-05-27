import { createAsyncThunk } from '@reduxjs/toolkit'

export const reportFetchThunkById = createAsyncThunk(
    'reportFetchThunkById',

    async ({id}) => {
        const response = await fetch(`https://localhost:7044/api/Report/GetById/${id}`);

        if (response.ok) {
            const data = await response.json();
        
            return data;
        }

        else {
            alert("customersFetch")
            throw new Error("failed to fetch");
        }
    }
)