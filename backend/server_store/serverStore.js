
//qui memorizzerò in RAM il mio key-value database
const connectedUsersDB = new Map();

let io = null;

const setSocketServerInstance = (ioInstance) => {
    io = ioInstance;
}

const getSocketServerInstance = () => {
    return io;
}

const addNewUserToDB = (socketID, userID) =>{

    console.log("aggiungo "+socketID +" con userid "+userID);
    //inserisco la coppia socketID-userID
    connectedUsersDB.set(socketID, {userId: userID});

    console.log("USER AGGIUNTO" );
    console.log(connectedUsersDB);
};

const removeUserInDB = (socketID) => {
    console.log("rimuovo utente");

    connectedUsersDB.delete(socketID);
    console.log(connectedUsersDB);
}

const getActiveConnections = (userId) =>{
    const activeConnections = [];

    connectedUsersDB.forEach(function(value,key) {
        if(value.userId === userId){
            activeConnections.push(key);
        }
    });

    return activeConnections;
}

module.exports = {
    addNewUserToDB,
    removeUserInDB,
    getActiveConnections,
    setSocketServerInstance,
    getSocketServerInstance
}