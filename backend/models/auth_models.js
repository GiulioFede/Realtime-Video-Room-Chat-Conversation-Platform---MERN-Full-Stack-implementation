
const mongoose = require("mongoose");

//E' inutile fare il controllo se (per esempio) l'email è formattata correttamente, quindi in generale dei campi, 
//in quanto questi modelli saranno presi da controller che sono stati attivati solo se le relative middleware functions,
//sono risultate valide

//definisco il modello di registrazione
const registerSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    username: {type: String},
    password: {type: String},
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    }]
})

module.exports = mongoose.model("user", registerSchema);