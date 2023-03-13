import io from "socket.io-client"


const socket = null;
const connect_to_socket_io_server = () =>{

    socket = io.connect("http://localhost:5002");

    //registro evento di connessione
    socket.on("connection", ()=>{
        console.log("connesso con successo al socket.io server con id "+socket.id);
    })

}

export default connect_to_socket_io_server;