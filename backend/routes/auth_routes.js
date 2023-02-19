
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validator = require('express-joi-validation').createValidator({})

//creo modello di registrazione
const registerSchema = Joi.object({
    username: Joi.string().min(3).max(12).required(), //stringa, minimo 3 caratteri, massimo 12, obbligatoria
    password: Joi.string().min(6).max(12).required(),
    email: Joi.string().email().required()
});

//creo modello di login
const loginSchema = Joi.object({
    password: Joi.string().min(6).max(12).required(),
    email: Joi.string().email().required()
});

//ottengo i controller
const {handlerRegistration, handlerLogin} = require("../controllers/auth_controllers");

//quando digitano un url del tipo ipaddress:port/api/auth/register lo facciamo gestire dal controller di registrazione
router.post("/register", validator.body(registerSchema), handlerRegistration);

//quando digitano un url del tipo ipaddress:port/api/auth/login lo facciamo gestire dal controller di login
router.post("/login", validator.body(loginSchema), handlerLogin);

module.exports = router;
