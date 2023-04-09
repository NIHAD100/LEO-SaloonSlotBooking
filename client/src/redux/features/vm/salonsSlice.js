import { createSlice } from "@reduxjs/toolkit";
import { Salons } from '../../thunk/vm/salonThunk';

const initialState = {
    salons: [],
    loading: false,
    error: null
}

const vmSalonsSlice = createSlice({
    name: 'vmSalons',
    initialState,
    reducers: {
        updateSalonIsBlocked: (state, action) => {
            const { id } = action.payload;
            const salonToUpdate = state.salons.find(salon => salon._id === id);
            if (salonToUpdate) {
                salonToUpdate.vmIsBlocked = !salonToUpdate.vmIsBlocked;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(Salons.pending, (state) => {
            state.loading = true
            state.error = null
        })

        builder.addCase(Salons.fulfilled, (state, action) => {
            state.loading = false
            state.salons = action.payload
        })
        builder.addCase(Salons.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export const { updateSalonIsBlocked } = vmSalonsSlice.actions;

export default vmSalonsSlice.reducer;