import io from "socket.io-client"


let socket = null;
const connect_to_socket_io_server = (userDetails) =>{

    console.log("connessione al socket server... con token "+userDetails.token)
    socket = io.connect("http://localhost:5002",{
        auth: {
            token: userDetails.token
        }
    });

    //registro evento di connessione
    socket.on("connect", ()=>{
        console.log("connesso con successo al socket.io server con id "+socket.id);
    })

}

export default connect_to_socket_io_server;