const { default: mongoose } = require("mongoose");
const newRegistration = require("../models/auth_models");
const { updateFriendsPendingInvitations } = require("../socket_handlers/socket_handlers");
const invitation = require("../models/friend_invitation");

const handleSendFriendInvitation = async (req, res) => {

    try{
        const {targetEmailAddress} = req.body;
        console.log("gestisco richiesta di aggiunta nuovo amico: "+ targetEmailAddress);

        const {userId, email} = req.user;

        //check se chi stiamo invitando non siamo noi stessi
        if (email.toLowerCase() === targetEmailAddress.toLowerCase()){
            return res.status(409).send("Non puoi inviare un invito a te stesso.");
        }

        //check se l'utente esiste
        //creo una istanza dello schema per la collezione Users
        const user = newRegistration; // Users sarà il nome della collezione

        const targetUser = await user.findOne({email: targetEmailAddress});

        //se non troviamo l'utente...
        if (!targetUser){
            return res.status(404).send("L'amico che stai cercando di invitare non esiste.");
        }


        const invitationAlreadyReceived = await invitation.findOne({
            senderId: userId,
            receiverId: targetUser._id
        });


        if(invitationAlreadyReceived){
            return res.status(409).send("Hai già inviato la richiesta di amicizia.");
        }

        //check se l'utente che vorremmo inviare è già un nostro amico
        const usersThatAreAlreadyOurFriends = targetUser.friends.find(friendId => 
            friendId.toString() === userId.toString()
        )

        if(usersThatAreAlreadyOurFriends){
            return res.status(409).send("Sei già amico di "+targetEmailAddress);
        }

        //se sono arrivato qui allora posso inviare la richiesta di amicizia
        const newInvitation = await invitation.create({
            senderId: userId,
            receiverId: targetUser._id
        });


        //invia le pending invitation update allo specifico utente
        updateFriendsPendingInvitations(targetUser._id.toString());
        console.log("inviata");
        return res.status(201).send("Richiesta di amicizia inviata");
    }catch(e){
        console.log("ERRORE in friends_controllers");
        console.log(e);
        return res.status(505).send("Si è verificato un errore. Riprova più tardi.");
    }
}


module.exports = {
    handleSendFriendInvitation
};