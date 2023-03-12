import { configureStore } from "@reduxjs/toolkit";

import userDetailsSliceReducer from "../pages/authPages/userDetailsSlice";
import counterSliceReducer from "../pages/counter/CounterSlice";
import alertBarSliceReducer from "../pages/components/slices/AlertBarSlice";

const store = configureStore({
    reducer: {
        userDetails: userDetailsSliceReducer,
        counter: counterSliceReducer,
        alertMessage: alertBarSliceReducer
    }
})


export default store;


