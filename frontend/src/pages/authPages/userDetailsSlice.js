import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = 
    {
        userDetails: null,
        status: 'idle',
        error: null
    }

const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState,
    reducers: {
        setUserDetails(state,action){
            const userDetails_json = JSON.parse(action.payload);
            state.userDetails = {email: userDetails_json.email, username: userDetails_json.username, token: userDetails_json.token}
        }
    },
    //REDUCER PER REGISTRAZIONE
    extraReducers(builder){
        builder
        .addCase(registerNewUserAPI.pending, (state, action)=>{
            console.log("in attesa...");
            state.status = "loading";
            state.error = null;
        })
        .addCase(registerNewUserAPI.fulfilled, (state, action)=>{
            console.log("Successo!");
            console.log(action.payload);
            state.userDetails = action.payload.data.userDetails;
            state.status = "succeeded";
            state.error = null;
            //memorizzo in maniera persistente dati sul browser come coppia valore
            localStorage.setItem("user", JSON.stringify(action.payload.data.userDetails));
            
        })
        .addCase(registerNewUserAPI.rejected, (state, action)=>{
            console.log("Qualcosa è andato storto! " + action.error.message);
            console.log(action.payload);
            state.status = "failed";
            state.error = action.payload.data;
        })
    },
    //REDUCER PER LOGIN
    extraReducers(builder){
        builder
        .addCase(loginUserAPI.pending, (state, action)=>{
            console.log("in attesa...");
            state.status = "loading";
            state.status = null;
        })
        .addCase(loginUserAPI.fulfilled, (state, action)=>{
            console.log("Successo login!");
            console.log(action.payload);
            state.userDetails = action.payload.data.userDetails;
            state.status = "succeeded";
            state.error = null;
            //memorizzo in maniera persistente dati sul browser come coppia valore
            localStorage.setItem("user", JSON.stringify(action.payload.data.userDetails));
            
        })
        .addCase(loginUserAPI.rejected, (state, action)=>{
            console.log("Qualcosa è andato storto col login! " + action.error.message);
            console.log(action);
            state.status = "failed";
            if (action.payload != undefined)
                state.error = action.payload.data;
        })
    }
})




const Server = axios.create({
    baseURL: "http://localhost:5002",  //indirizzo dove ascolta il server
    timeout: 2000 //attendo al massimo 2 secondi prima di dire al client che ci sono problemi nel contattare il server
})

Server.interceptors.request.use((config) =>{

    const userDetails = localStorage.getItem("user");

    if (userDetails){
        const token = JSON.parse(userDetails).token;
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});



export const registerNewUserAPI = createAsyncThunk("/api/auth/register", async(data, thunkAPI) => {
        console.log("contatto il server...");
        console.log(data);
        try{
        const response = await Server.post("/api/auth/register", data);
        //se sono qui tutto è andato bene
        console.log("RISPOSTA: "+ response);
        return response;
    }catch(e){
        throw  thunkAPI.rejectWithValue(e.response); //messaggio dal server
    }

})


export const loginUserAPI = createAsyncThunk("/api/auth/register", async(data, thunkAPI) => {
    console.log("contatto il server...");
    console.log(data);
    try{
        const response = await Server.post("/api/auth/login", data);
        //se sono qui tutto è andato bene
        console.log("RISPOSTA: "+ response);
        return response;
    }catch(e){
        throw  thunkAPI.rejectWithValue(e.response); //messaggio dal server
    }

})


export const checkJWTvalidity = (response)=>{

    const status = response.status;
    console.log("isJWTValid status ", status);
    if (status === 401 || status === 403 ) {
        //logout
        logout();
    }
}

export const logout = ()=>{
    //pulisco lo storage del client
    localStorage.clear();
    //ricarica il client 
    window.location.pathname = "/login";
}



export const {setUserDetails} = userDetailsSlice.actions;

export default userDetailsSlice.reducer