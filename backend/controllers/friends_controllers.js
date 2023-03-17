const { default: mongoose, startSession } = require("mongoose");
const newRegistration = require("../models/auth_models");
const { updateFriendsPendingInvitations, updateFriends } = require("../socket_handlers/socket_handlers");
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


const handleAcceptFriendInvitation = async (req, res) => {
    console.log("gestisco la richiesta di accettazione amicizia:");

    try{

        const {id} = req.body;

        const invitation_doc = await invitation.findById(id);

        //che se esiste
        if(!invitation_doc){
            return res.status(401).send("L'invito sembra non esistere più.");
        }

        const {senderId, receiverId} = invitation_doc;


        //aggiungo l'amicizia a entrambi
        const senderUser = await newRegistration.findById(senderId);
        senderUser.friends = [...senderUser.friends, receiverId];

        const receiverUser = await newRegistration.findById(receiverId);
        receiverUser.friends = [...receiverUser.friends, senderId];

        //per consistenza, usiamo le transaction
        const session = await startSession();

        session.startTransaction();
        console.log(senderId+"   "+receiverId);
        //li aggiorno
        await senderUser.save({session});
        await receiverUser.save({session});

        //elimino invito
        await invitation.findByIdAndDelete(id,{session});

        session.commitTransaction();

        //Aggiorno UI friends per entrambi
        updateFriends(senderId.toString());
        updateFriends(receiverId.toString());        

        //aggiorno UI di pending solo per chi ha ricevuto la richiesta
        updateFriendsPendingInvitations(receiverId.toString());
        console.log("fine");
        return res.status(200).send("La richiesta di amicizia è stata accettata.");

    }catch(err){
        console.log(err);
        return res.status(500).send("Si è verificato un errore. Riprova più tardi.");
    }
}

const handleRejectFriendInvitation = async (req, res) => {
    console.log("gestisco la richiesta di rifiuto amicizia:");
    try{
        const {id} = req.body;
        const {userId} = req.user;

        //eliminiamola l'invito
        await invitation.findByIdAndDelete(id);

        updateFriendsPendingInvitations(userId);

        return res.status(200).send("Invito rimosso con successo");
    }catch(e){

    }return res.status(500).send("Non è stato possibile rimuovere l'invito. Si prega di riprovare più tardi.");
}


module.exports = {
    handleSendFriendInvitation,
    handleAcceptFriendInvitation,
    handleRejectFriendInvitation
};