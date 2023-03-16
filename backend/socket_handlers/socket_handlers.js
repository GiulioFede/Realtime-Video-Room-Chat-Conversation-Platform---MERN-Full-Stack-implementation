const { default: mongoose } = require("mongoose");
const friendInvitationSchema = require("../models/friend_invitation");
const { getActiveConnections, getSocketServerInstance } = require("../server_store/serverStore");
const invitation = require("../models/friend_invitation");

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

module.exports = {
    updateFriendsPendingInvitations
}