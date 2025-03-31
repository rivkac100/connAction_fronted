<<<<<<< HEAD
import { createAsyncThunk } from '@reduxjs/toolkit'

export const deleteEventThunk = createAsyncThunk(
    'deleteEventThunk',
    async ({ eventId }) => {

        const response = await fetch(`http://localhost:7044/api/Event/Delete/${eventId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        if (response.ok) {
           const data=response.json();
           return data;
        }
        else {
            alert("deleteLogin");
            throw new Error("failed to fetch");
        }
    }
=======
import { createAsyncThunk } from '@reduxjs/toolkit'

export const deleteEventThunk = createAsyncThunk(
    'deleteEventThunk',
    async ({ eventId }) => {

        const response = await fetch(`http://localhost:7044/api/Event/Delete/${eventId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        if (response.ok) {
           const data=response.json();
           return data;
        }
        else {
            alert("deleteLogin");
            throw new Error("failed to fetch");
        }
    }
>>>>>>> ef9fa70721cd9013739de9d55184d1f9a325e648
)