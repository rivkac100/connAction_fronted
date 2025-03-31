<<<<<<< HEAD
import { createAsyncThunk } from '@reduxjs/toolkit';

export const updateOrderThunk = createAsyncThunk(
    'updateOrderThunk',

    async ({details}) => {

        const response = await fetch("https://localhost:7044/api/Order/Update", {
            method: 'PUT',
            body: JSON.stringify(details),
            headers: {
                'Content-Type': "application/json"
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data
        }
        else {
            throw new Error('failed to fetch update OrderThunk');
        }
    }

=======
import { createAsyncThunk } from '@reduxjs/toolkit';

export const updateOrderThunk = createAsyncThunk(
    'updateOrderThunk',

    async (details) => {

        const response = await fetch("https://localhost:7044/api/Orders/Update", {
            method: 'PUT',
            body: JSON.stringify(details),
            headers: {
                'Content-Type': "application/json"
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data.token;
        }
        else {
            throw new Error('failed to fetch update OrderThunk');
        }
    }

>>>>>>> ef9fa70721cd9013739de9d55184d1f9a325e648
)