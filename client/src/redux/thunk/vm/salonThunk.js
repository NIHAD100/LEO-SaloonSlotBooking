import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSalons } from "../../../api/vm/salonApi";

export const Salons = createAsyncThunk(
    'vm/salons', async (_,thunkAPI) => {
        try {
            return getSalons()
        } catch (error) {
            console.log(error);
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
) 