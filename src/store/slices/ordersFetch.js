<<<<<<< HEAD
import { createAsyncThunk } from '@reduxjs/toolkit'

export const ordersFetchThunk = createAsyncThunk(
    'ordersFetchThunk',

    async () => {
        const response = await fetch("https://localhost:7044/api/Order/GetAll");

        if (response.ok) {
            const data = await response.json();
        
            return data;
        }

        else {
            alert("ordersFetch")
            throw new Error("failed to fetch");
        }
    }
=======
import { createAsyncThunk } from '@reduxjs/toolkit'

export const ordersFetchThunk = createAsyncThunk(
    'ordersFetchThunk',

    async () => {
        const response = await fetch("https://localhost:7044/api/Order/GetAll");

        if (response.ok) {
            const data = await response.json();
        
            return data;
        }

        else {
            alert("ordersFetch")
            throw new Error("failed to fetch");
        }
    }
>>>>>>> ef9fa70721cd9013739de9d55184d1f9a325e648
)