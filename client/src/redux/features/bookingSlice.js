import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    date: '',
    slot: ''
}

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setSlots: (state, action) => {

            state.date = action.payload.date
            state.slot = action.payload.slot


        },
        clearBooking: (state) => {

            state.date = ''
            state.slot = ''
        }
    }
})

export const { setSlots, clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;