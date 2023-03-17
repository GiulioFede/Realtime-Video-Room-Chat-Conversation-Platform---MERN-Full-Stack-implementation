const { default: mongoose } = require("mongoose");
const friendInvitationSchema = require("../models/friend_invitation");
const { getActiveConnections, getSocketServerInstance } = require("../server_store/serverStore");
const invitation = require("../models/friend_invitation");
const newRegistration = require("../models/auth_models");

//dato uno userId, ritorna la pending invitation con destinatario proprio quello userId
const updateFriendsPendingInvitations = async (userId) => {
    try{

        console.log("update friends pending invitations");
        //cerco tutte le pending a me inviate
        const pendingInvitationsModel = invitation;

        //utilizzo populate() cosi da popolare il campo senderId (argomento della populate) con l'intero documento user che ha quell'__id  (però prendo solo _id, username ed email, non voglio mica la password)
        const pendingInvitations = await pendingInvitationsModel.find({receiverId: userId}).populate("senderId","_id username email");

        //ottengo tutte le connessioni attive dell'utente target (potrebbe aprire più browser, quindi usiamo tutte le socketId per contattarlo)
        const receiverList = getActiveConnections(userId);

        const io = getSocketServerInstance();

        if (pendingInvitations){
            receiverList.forEach(receiverSocketId => {
                io.to(receiverSocketId).emit("friends-invitations", { pendingInvitations: pendingInvitations})
            })
        }
        console.log("5");
    }catch(err){
        console.log(err);
    }
}


const updateFriends = async (userId) => {

    try{
        console.log("invio aggiornamento amici");

        //ottengo le (potenzialmente possono essere tante) socketId
        const socketIds = getActiveConnections(userId);

        if(socketIds.length > 0){
            console.log("  numero di socket id associate: "+socketIds.length)
            //friends è una lista id id, devo ottenere i relativi documenti. Sfrutto ref per popolarli
            const user = await newRegistration.findById(userId, {_id:1, friends: 1}).populate("friends", "_id username email");
            console.log("  User:"); console.log(user);
            if(user){

                //estraggo solo l'array di amici
                const friends_list = user.friends.map((f)=>{
                    return {
                        id: f._id,
                        email: f.email,
                        username: f.username
                    }
                });
                
                const io = getSocketServerInstance();
                console.log("  friends list: "+ friends_list);
                socketIds.forEach(socketId =>{
                    console.log("  emetto")
                    io.to(socketId).emit("friends-list", {friends: friends_list});
                })
            }
        }
    }
    catch(e){
        throw e;
    }

}

module.exports = {
    updateFriendsPendingInvitations,
    updateFriends
}