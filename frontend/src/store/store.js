import { configureStore } from "@reduxjs/toolkit";

import userDetailsSliceReducer from "../pages/authPages/userDetailsSlice";
import counterSliceReducer from "../pages/counter/CounterSlice"

const store = configureStore({
    reducer: {
        userDetails: userDetailsSliceReducer,
        counter: counterSliceReducer
    }
})


export default store;


