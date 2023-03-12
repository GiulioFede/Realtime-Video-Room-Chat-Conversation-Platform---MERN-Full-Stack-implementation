import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    showAlertMessage: false,
    alertMessageContent: null
}

const AlertBarSlice = createSlice({
    name: "alertMessage",
    initialState,
    reducers: {
        open(state,action){
            console.log("apro "+action.payload);
            state.showAlertMessage = true;
            state.alertMessageContent = action.payload;
        },
        close(state){
            state.showAlertMessage = false;
            state.alertMessageContent = null;
        }
    }
})

export const {open, close} = AlertBarSlice.actions;
export default AlertBarSlice.reducer;