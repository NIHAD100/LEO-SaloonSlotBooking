import { configureStore } from "@reduxjs/toolkit";

import loadingSlice from "./features/loadingSlice";
import userSlice from "./features/userSlice";
import adminSlice from "./features/adminSlice";

//vm
import vmSlice from './features/vmSlice'
import vmVenuesSlice from './features/vm/venuesSlice'


export default configureStore({
    reducer: {
        loading:loadingSlice,
        user:userSlice,
        admin:adminSlice,
        vm:vmSlice,
        vmVenues:vmVenuesSlice
    }
})