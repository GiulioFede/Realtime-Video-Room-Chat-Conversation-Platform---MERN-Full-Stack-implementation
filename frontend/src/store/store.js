import { configureStore } from "@reduxjs/toolkit";

import userDetailsSliceReducer from "../pages/authPages/userDetailsSlice";
import counterSliceReducer from "../pages/counter/CounterSlice";
import alertBarSliceReducer from "../pages/components/slices/AlertBarSlice";
import friendsSliceReducer from "../pages/Dashboard/features/friendsSlice";

const store = configureStore({
    reducer: {
        userDetails: userDetailsSliceReducer,
        counter: counterSliceReducer,
        alertMessage: alertBarSliceReducer,
        friends: friendsSliceReducer
    }
})


export default store;


