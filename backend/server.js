const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/auth_routes");
const { Server } = require("socket.io");
const { verifyTokenSocket } = require("./middleware/auth_middleware");
const { addNewUserToDB, removeUserInDB, setSocketServerInstance } = require("./server_store/serverStore");
const friendsInvitationRoutes = require("./routes/friend_invitation_routes");
const { updateFriendsPendingInvitations } = require("./socket_handlers/socket_handlers");

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

setSocketServerInstance(io);

//middleware function per testare ogni uso della socket verificando il token
io.use((socket,next)=>{
    //se il JWT è valido allora continua altrimenti invia NOT_AUTHORIZED
    verifyTokenSocket(socket,next);
})


io.on("connection", (socket) =>{
    console.log(socket.user);
    console.log("User connected: " + socket.id);

    //aggiungo l'utente al db
    addNewUserToDB(socket.id,socket.user.userId);

    //registro per questo utente anche l'evento di disconnessione
    socket.on("disconnect", ()=>{
        console.log("utente disconnesso");
        removeUserInDB(socket.id);
    });

    //lo notifico di eventuali richieste di amicizia
    updateFriendsPendingInvitations(socket.user.userId);
})

//registro le routes per l'autenticazione (registrazione e login)
app.use("/api/auth", authRoutes);

//registro le routes per la gestione degli amici 
app.use("/api/friend-invitation", friendsInvitationRoutes);

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

