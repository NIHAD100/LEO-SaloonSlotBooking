import { createSlice } from "@reduxjs/toolkit";
import { venues } from '../../thunk/vm/turfThunk';

const initialState = {
    venues: [],
    loading: false,
    error: null
}

const vmVenuesSlice = createSlice({
    name: 'vmVenues',
    initialState,
    reducers: {
        updateVenueIsBlocked: (state, action) => {
            const { id } = action.payload;
            const venueToUpdate = state.venues.find(venue => venue._id === id);
            if (venueToUpdate) {
                console.log(venueToUpdate);
                venueToUpdate.vmIsBlocked = !venueToUpdate.vmIsBlocked;
            }
          }
    },
    extraReducers: {
        [venues.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [venues.fulfilled]: (state, action) => {
            state.loading = false
            state.error = null
            state.venues = action.payload
        },
        [venues.rejected]: (state, action) => {
            console.log(action.error)
            state.loading = false
            state.error = action.error.message
        }
    }
})

export const { updateVenueIsBlocked } = vmVenuesSlice.actions;

export default vmVenuesSlice.reducer;