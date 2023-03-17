import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkJWTvalidity } from "../../authPages/userDetailsSlice";
import axios from "axios";

const initialState = 
    {
        friends: [],
        pendingFriendsInvitations: [],
        onlineUsers: [],
        status: "idle",
        error: null
    }

const friendsSlice = createSlice({
    name: "friends",
    initialState,
    reducers: {
        setFriends(state,action){
            state.friends = action.payload;
        },
        setPendingFriendsInvitation(state,action){
            state.pendingFriendsInvitations = action.payload
        },
        addPendingFriendsInvitation(state,action){
            state.pendingFriendsInvitations.push(action.payload)
        },
        setOnlineUsers(state,action){
            state.onlineUsers = action.payload;
        }
    },
    //REDUCER PER FRIEND INVITATION
    extraReducers(builder){
        builder
        .addCase(sendFriendInvitationAPI.pending, (state, action)=>{
            console.log("in attesa...");
            state.status = "loading";
            state.error = null;
        })
        .addCase(sendFriendInvitationAPI.fulfilled, (state, action)=>{
            console.log("Successo!");
            console.log(action.payload);
            state.status = "succeeded";
            state.error = null;
            
        })
        .addCase(sendFriendInvitationAPI.rejected, (state, action)=>{
            console.log("ERRORE");
            console.log("Qualcosa è andato storto! " + action.error.message + "  ERRORE: "+action.payload.status);
            console.log(action.payload);
            state.status = "failed";
            state.error = action.payload.data;

            //controllo se l'errore è stato del JWT, in tal caso effettuo il logout()
            checkJWTvalidity(action.payload);
        })
        .addCase(acceptFriendInvitation.pending, (state, action)=>{
            console.log("in attesa...");
            state.status = "loading";
            state.error = null;
        })
        .addCase(acceptFriendInvitation.fulfilled, (state, action)=>{
            console.log("Successo!");
            console.log(action.payload);
            state.status = "succeeded";
            state.error = null;
            
        })
        .addCase(acceptFriendInvitation.rejected, (state, action)=>{
            console.log("Qualcosa è andato storto! " + action.error.message + "  ERRORE: "+action.payload.status);
            console.log(action.payload);
            state.status = "failed";
            //state.error = action.payload.data;

            //controllo se l'errore è stato del JWT, in tal caso effettuo il logout()
            checkJWTvalidity(action.payload);
        })
        .addCase(rejectFriendInvitation.pending, (state, action)=>{
            console.log("in attesa...");
            state.status = "loading";
            state.error = null;
        })
        .addCase(rejectFriendInvitation.fulfilled, (state, action)=>{
            console.log("Successo!");
            console.log(action.payload);
            state.status = "succeeded";
            state.error = null;
            
        })
        .addCase(rejectFriendInvitation.rejected, (state, action)=>{
            console.log("Qualcosa è andato storto! " + action.error.message + "  ERRORE: "+action.payload.status);
            console.log(action.payload);
            state.status = "failed";
            state.error = action.payload.data;

            //controllo se l'errore è stato del JWT, in tal caso effettuo il logout()
            checkJWTvalidity(action.payload);

            throw new Error( action.payload.data);
        })
    },
/*
    //ACCEPT INVITATION
     extraReducers(builder2){
        builder2
        .addCase(acceptFriendInvitation.pending, (state, action)=>{
            console.log("in attesa...");
            state.status = "loading";
            state.error = null;
        })
        .addCase(acceptFriendInvitation.fulfilled, (state, action)=>{
            console.log("Successo!");
            console.log(action.payload);
            state.status = "succeeded";
            state.error = null;
            
        })
        .addCase(acceptFriendInvitation.rejected, (state, action)=>{
            console.log("Qualcosa è andato storto! " + action.error.message + "  ERRORE: "+action.payload.status);
            console.log(action.payload);
            state.status = "failed";
            //state.error = action.payload.data;

            //controllo se l'errore è stato del JWT, in tal caso effettuo il logout()
            checkJWTvalidity(action.payload);
        })
    },

     //REJECT INVITATION
     extraReducers(builder3){
        builder3
        .addCase(rejectFriendInvitation.pending, (state, action)=>{
            console.log("in attesa...");
            state.status = "loading";
            state.error = null;
        })
        .addCase(rejectFriendInvitation.fulfilled, (state, action)=>{
            console.log("Successo!");
            console.log(action.payload);
            state.status = "succeeded";
            state.error = null;
            
        })
        .addCase(rejectFriendInvitation.rejected, (state, action)=>{
            console.log("Qualcosa è andato storto! " + action.error.message + "  ERRORE: "+action.payload.status);
            console.log(action.payload);
            state.status = "failed";
            state.error = action.payload.data;

            //controllo se l'errore è stato del JWT, in tal caso effettuo il logout()
            checkJWTvalidity(action.payload);

            throw new Error( action.payload.data);
        })
    },
    */
})


const Server = axios.create({
    baseURL: "http://localhost:5002",  //indirizzo dove ascolta il server
    timeout: 2000 //attendo al massimo 2 secondi prima di dire al client che ci sono problemi nel contattare il server
})

//in qualsiasi richiesta aggiungo il JWT token
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





export const sendFriendInvitationAPI = createAsyncThunk("/api/friends/sendInvitation", async(data, thunkAPI) => {
    console.log("invio richiesta di invito amicizia a " + data);

    try{
        const response = await Server.post("/api/friend-invitation/invite", data);
        //se sono qui tutto è andato bene
        console.log("RISPOSTA: "+ response);
        return response;
    }catch(e){
        console.log("eccezione nell'invio richiesta: ");
        console.log(e.response);
        throw  thunkAPI.rejectWithValue(e.response); //messaggio dal server
    }

})


export const acceptFriendInvitation = createAsyncThunk("/api/friends/acceptInvitation", async(data, thunkAPI) => {
    console.log("Accetto richiesta di invito amicizia di " + data);

    try{
        const response = await Server.post("/api/friend-invitation/accept", data);
        //se sono qui tutto è andato bene
        console.log("RISPOSTA: "+ response);
        return response;
    }catch(e){
        throw  thunkAPI.rejectWithValue(e.response); //messaggio dal server
    }

});

export const rejectFriendInvitation = createAsyncThunk("/api/friends/rejectInvitation", async(data, thunkAPI) => {
    console.log("Rifiuto richiesta di invito amicizia di " + data);

    try{
        const response = await Server.post("/api/friend-invitation/reject", data);
        //se sono qui tutto è andato bene
        console.log("RISPOSTA: "+ response);
        return response;
    }catch(e){
        throw  thunkAPI.rejectWithValue(e.response); //messaggio dal server
    }

});


export const {setFriends,setPendingFriendsInvitation,setOnlineUsers,addPendingFriendsInvitation} = friendsSlice.actions;

export default friendsSlice.reducer