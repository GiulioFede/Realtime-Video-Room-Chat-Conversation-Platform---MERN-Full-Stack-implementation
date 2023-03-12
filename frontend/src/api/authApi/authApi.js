import axios from "axios";

const Server = axios.create({
    baseUrl: "http://localhost:5002/api",  //indirizzo dove ascolta il server
    timeout: 2000 //attendo al massimo 2 secondi prima di dire al client che ci sono problemi nel contattare il server
})



export const registerNewUserAPI = async (data) => {
    try {
        return await Server.post("/api/auth/register", data);
    }catch(exception){
        return {
            error: true,
            exception
        }
    }
}

export const loginUserAPI = async (data) => {
    try {
        return await Server.post("/api/auth/login", data);
    }catch(exception){
        return {
            error: true,
            exception
        }
    }
}