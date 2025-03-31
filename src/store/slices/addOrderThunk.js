<<<<<<< HEAD
import { createAsyncThunk } from '@reduxjs/toolkit'

export const addOrderThunk = createAsyncThunk(
    'addOrderThunk',
    async ({details}) => {

        const response = await fetch("https://localhost:7044/api/Order/Add",
            {
                method: 'POST',
                body: JSON.stringify(details),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        if (response.ok) {
            // debugger
            //  const data = await response.json();

            // return data.orderId;

        }
        else throw new Error('failed to fetch add order');
    }
=======
import { createAsyncThunk } from '@reduxjs/toolkit'

export const addOrderThunk = createAsyncThunk(
    'addOrderThunk',
    async ({details}) => {

        const response = await fetch("https://localhost:7044/api/Order/Add",
            {
                method: 'POST',
                body: JSON.stringify(details),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        if (response.ok) {
            // debugger
            //  const data = await response.json();

            // return data.orderId;

        }
        else throw new Error('failed to fetch add order');
    }
>>>>>>> ef9fa70721cd9013739de9d55184d1f9a325e648
)