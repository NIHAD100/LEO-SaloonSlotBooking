import { createAsyncThunk } from "@reduxjs/toolkit";
import { getvenues } from "../../../api/vm/turfApi";

export const venues = createAsyncThunk(
    'vm/venues', async (_,thunkAPI) => {
        try {
            return getvenues()
        } catch (error) {
            console.log(error);
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
) 