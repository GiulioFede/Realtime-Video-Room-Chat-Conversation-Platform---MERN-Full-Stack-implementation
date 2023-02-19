
const {registerSchema} = require("../models/auth_models");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

//controller che gestisce la registrazione
const handlerRegistration = async (req, res) => {

    try {

        //prelevo quanto l'utente vuole inserire
        const {username, email, password} = req.body;

        //creo una istanza dello schema per la collezione Users
        const newRegistration = mongoose.model('Users', registerSchema); // Users sarà il nome della collezione

        //faccio una query diretta per controllare l'esistenza della stessa mail
        const userExists = await newRegistration.exists({ email: email.toLowerCase() });

        //se l'email è già presente
        if(userExists) 
            return res.status(409).send("Email già in uso.");
        else {
            //criptiamo la password con l'algoritmo (+ lento ma + sicuro (adattivo nuovi hardware)) bcrypt
            const hash = await bcrypt.hash(password, 10); //10 è il salto

            //aggiungo al db
            const newUser = await newRegistration.create({
                username: username,
                email: email.toLowerCase(),
                password: hash
            });

            //restituire il token
            const token = jwt.sign(
                {
                    userId: userDocument._id,
                    email
                },
                process.env.TOKEN_KEY,
                {
                    expiresIn:"24h"
                }
            );

            res.status(201).json({
                userDetails: {
                    email: email.toLowerCase(),
                    username: username,
                    token: token
                }
            })};



    }catch(err) {
        //se ci sono errori...
        res.status(500).send("Registrazione fallita.");
        console.log(err);
    }

}


//controller che gestisce il login
const handlerLogin = async (req, res) => {
    
    try{

        const {email, password} = req.body;

        //creo una istanza dello schema per la collezione Users
        const userModel = mongoose.model('Users', registerSchema); // Users sarà il nome della collezione

        const userDocument = await userModel.findOne({ email: email.toLowerCase()});

        if (userDocument && (await bcrypt.compare(password, userDocument.password))){

            //genero token
            const token = jwt.sign(
                {
                    userId: userDocument._id,
                    email
                },
                process.env.TOKEN_KEY,
                {
                    expiresIn:"24h"
                }
            );

            return res.status(200).json({
                userDetails: {
                    email: userDocument.email,
                    username: userDocument.username,
                    token: token
                }
            })
        }

        res.status(400).send(" Credenziali non valide.");

    }catch(err){
        res.status(500).send(" Si è verificato un errore.");
        console.log(err);
    }
}

module.exports = {
    handlerRegistration, 
    handlerLogin
};