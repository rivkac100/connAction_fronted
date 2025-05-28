import { createAsyncThunk } from '@reduxjs/toolkit'


export const findUserById = createAsyncThunk(
    'findUserById',

    async ({userType, id}) => {
        debugger
        const response = await fetch(`https://localhost:7044/api/User/GetById/${userType}/${id}`);
      
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        }

        else {

            throw new Error("failed to fetch");
        }
    }
)