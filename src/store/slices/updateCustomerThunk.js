<<<<<<< HEAD
import { createAsyncThunk } from '@reduxjs/toolkit';

export const updateCustomerThunk = createAsyncThunk(
    'updateCustomerThunk',

    async ({details}) => {
debugger
        const response = await fetch("https://localhost:7044/api/Customers/Update", {
            method: 'PUT',
            body: JSON.stringify(details),
            headers: {
                'Content-Type': "application/json"
            }
        });

        if (response.ok) {
            console.log("gfvgyuguyhjuug");
            const data = await response.json();
            return data;
        }
        else {
            throw new Error('failed to fetch loginThunk');
        }
    }

=======
import { createAsyncThunk } from '@reduxjs/toolkit';

export const updateCustomerThunk = createAsyncThunk(
    'updateCustomerThunk',

    async ({details}) => {
debugger
        const response = await fetch("https://localhost:7044/api/Customers/Update", {
            method: 'PUT',
            body: JSON.stringify(details),
            headers: {
                'Content-Type': "application/json"
            }
        });

        if (response.ok) {
            console.log("gfvgyuguyhjuug");
            const data = await response.json();
            return data;
        }
        else {
            throw new Error('failed to fetch loginThunk');
        }
    }

>>>>>>> ef9fa70721cd9013739de9d55184d1f9a325e648
)