const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const friendInvitationSchema = new Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        //indichiamo che quell'id sopra si riferisce a un documento della collezione user
        //in questo modo quando usero populate("senderId") lui saprà 1) che senderId è un id di una collezione user 2) potrà usare quell'id per recuperare
        //il documento user con quell'id e sostituirlo al posto di senderId, quindi alla fine avrei  senderId: {_id:...,email:...,username:.......}
        ref: "user"  
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
});

module.exports = mongoose.model("invitation", friendInvitationSchema);