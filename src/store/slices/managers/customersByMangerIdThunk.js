import { createAsyncThunk } from '@reduxjs/toolkit'

export const customersByMangerIdThunk = createAsyncThunk(
    'customersByMangerIdThunk',
    async ({id}) => {

        const response = await fetch(`https://localhost:7044/api/Managers/GetCustomersById/${id}`);

        if (response.ok) {
            const data = await response.json();
        
            return data;
        }
        else throw new Error('failed to fetch add login');
    }
)