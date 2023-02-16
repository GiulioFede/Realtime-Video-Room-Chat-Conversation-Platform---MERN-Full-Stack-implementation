const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

//utilizza la porta fornita dall'ambiente di deployment (PORT) oppure quella definita da me in locale (API_PORT)
const PORT = process.env.PORT || process.env.API_PORT;

const app = express();

//qualsiasi richiesta giunta viene trasformata in json
app.use(express.json());

//cross-origin-access-control: per consentire le richieste da tutti (stessa cosa di inserire *)
app.use(cors())

const server = http.createServer(app);

server.listen(PORT, ()=>{
    console.log("Il server è attivo alla porta "+PORT);
})