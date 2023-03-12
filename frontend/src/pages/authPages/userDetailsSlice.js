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
            state = action.payload;
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
            //memorizzo in maniera persistente dati sul browser come coppia valore
            localStorage.setItem("user", JSON.stringify(action.payload.data.userDetails));
            
        })
        .addCase(registerNewUserAPI.rejected, (state, action)=>{
            console.log("Qualcosa è andato storto! " + action.error.message);
            console.log(action.payload);
            state.status = "failed";
            state.error = action.payload;
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
            //memorizzo in maniera persistente dati sul browser come coppia valore
            localStorage.setItem("user", JSON.stringify(action.payload.data.userDetails));
            
        })
        .addCase(loginUserAPI.rejected, (state, action)=>{
            console.log("Qualcosa è andato storto col login! " + action.error.message);
            console.log(action);
            state.status = "failed";
            state.error = action.payload;
        })
    }
})




const Server = axios.create({
    baseURL: "http://localhost:5002",  //indirizzo dove ascolta il server
    timeout: 2000 //attendo al massimo 2 secondi prima di dire al client che ci sono problemi nel contattare il server
})



export const registerNewUserAPI = createAsyncThunk("/api/auth/register", async(data, thunkAPI) => {
        console.log("contatto il server...");
        console.log(data);
        try{
        const response = await Server.post("/api/auth/register", data);
        //se sono qui tutto è andato bene
        console.log("RISPOSTA: "+ response);
        return response;
    }catch(e){
        throw  thunkAPI.rejectWithValue(e.response.data); //messaggio dal server
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
        throw  thunkAPI.rejectWithValue(e.response.data); //messaggio dal server
    }

})




export const {setUserDetails} = userDetailsSlice.actions;

export default userDetailsSlice.reducer