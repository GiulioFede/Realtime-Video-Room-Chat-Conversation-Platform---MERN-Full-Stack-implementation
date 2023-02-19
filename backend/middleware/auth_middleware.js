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
        return res.status(401).send("Token non valido.");
        console.log(err);
    }
}

module.exports = {
    verifyToken
}