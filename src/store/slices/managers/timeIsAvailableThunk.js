import { createAsyncThunk } from '@reduxjs/toolkit'

export const timeIsAvailableThunk = createAsyncThunk(
    'timeIsAvailableThunk',
    async ({id,date,time,len}) => {

        const response = await fetch(`https://localhost:7044/api/Managers/isEmpty/${id}/${date}/${time}/${len}`);
        if (response.ok) {
            const data = await response.json();
             console.log(data);
            return data;
        }
        else throw new Error('failed to fetch add login');
    }
)