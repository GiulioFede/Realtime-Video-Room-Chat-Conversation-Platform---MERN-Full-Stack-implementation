const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    //prelevo il token in una delle 3 possibili locazioni della request
    let token = req.body.token || req.query.token || req.headers["authorization"];

    //se non esiste non procedo 
    if (!token){
        return res.status(403).send("E' richiesto un token di autenticazione per procedere.");
    }

    //altrimenti...
    try{

        //estraggo il token
        token = token.replace(/^Bearer\s+/,"");
        //lo decodifico (se ci sono errori solleva un eccezione) ed estraggo il payload
        const payload = jwt.verify(token, process.env.TOKEN_KEY);
        //prima di passare la gestione della richiesta al controller, modifico la request inserendo un campo utile per dopo
        req.user = payload;
        //essendo una middlware function, chiamando next() permetto di far gestire la richiesta al controller
        return next();

    }catch(err){
        console.log(err);
        return res.status(401).send("Token non valido.");
        
    }
}


//stessa funzione ma la useremo quando il client si connetterà al socket server
const verifyTokenSocket = (socket, next) => {

    console.log("verifico token socket: ");

    try {
        const token = socket.handshake.auth.token;
        console.log(process.env.TOKEN_KEY)
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        socket.user = decoded;
        console.log("verifica avvenuta con successo");
    }catch(err){
        //qui dentro ci finiamo per qualsiasi errore MA in particolare se il token non è valido
        const socketError = new Error("NOT_AUTHORIZED");
        console.log("verifica fallita: "+ err);
        return next(socketError);
    }

    //se invece va tutto bene...
    console.log("procedo");
    next();
}

module.exports = {
    verifyToken,
    verifyTokenSocket
}