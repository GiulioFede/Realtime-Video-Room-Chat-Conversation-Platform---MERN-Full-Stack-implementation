
//qui memorizzerò in RAM il mio key-value database
const connectedUsersDB = new Map();

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

module.exports = {
    addNewUserToDB,
    removeUserInDB
}