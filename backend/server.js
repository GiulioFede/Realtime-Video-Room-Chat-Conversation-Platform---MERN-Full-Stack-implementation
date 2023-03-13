const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/auth_routes");
const { Server } = require("socket.io");

//utilizza la porta fornita dall'ambiente di deployment (PORT) oppure quella definita da me in locale (API_PORT)
const PORT = process.env.PORT || process.env.API_PORT;

const app = express();

//qualsiasi richiesta giunta viene trasformata in json
app.use(express.json());

//cross-origin-access-control: per consentire le richieste da tutti (stessa cosa di inserire *)
app.use(cors())

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) =>{
    console.log("User connected: " + socket.id);
})

//registro le routes per l'autenticazione (registrazione e login)
app.use("/api/auth", authRoutes);

//prima di accettare richieste dagli utenti (quindi attivare il server), tentiamo di connetterci al cluster
mongoose.connect(process.env.MONGO_URI)
//se ci siamo riusciti...
.then( ()=>{
    //attiviamo il server
    server.listen(PORT, ()=>{
        console.log("Il server è attivo alla porta "+PORT);
    })
})
//se non ci siamo riusciti...
.catch( (err) =>{
    //non attiviamo il server ma semplicemente stampiamo l'errore
    console.log("Impossibile connettersi al cluster, pertanto il server non viene attivato.");
    console.error(err);
})

