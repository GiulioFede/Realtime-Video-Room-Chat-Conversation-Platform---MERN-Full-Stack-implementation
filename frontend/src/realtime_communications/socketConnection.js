import io from "socket.io-client"
import { logout } from "../pages/authPages/userDetailsSlice";
import { open } from "../pages/components/slices/AlertBarSlice";
import { addPendingFriendsInvitation, setDisconnectFriends, setFriends, setOnlineFriends, setPendingFriendsInvitation } from "../pages/Dashboard/features/friendsSlice";


let socket = null;
const connect_to_socket_io_server = (userDetails, dispatch) =>{

        console.log("connessione al socket server... con token "+userDetails.token)
        socket = io.connect("http://localhost:5002",{
            auth: {
                token: userDetails.token
            }
        });

        //registro evento di connessione
        socket.on("connect", ()=>{
            console.log("connesso con successo al socket.io server con id "+socket.id);
        });

        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
            logout();
            dispatch(open(err.message));
        });
        

        //ascolto per richieste di amicizia
        socket.on("friends-invitations", (data) =>{
            const {pendingInvitations} = data;
            console.log("evento friend invitations:");
            console.log(pendingInvitations);

            /*
            pendingInvitations.forEach(pi =>{
                dispatch(addPendingFriendsInvitation({
                    _id: pi._id,
                    senderId: pi.senderId
                }));
            })
            */

            dispatch(setPendingFriendsInvitation(pendingInvitations))
        });

        socket.on("friends-list", (data) =>{
            console.log("evento aggiornamento amici");
            const {friends} = data;
            console.log(friends);
            dispatch(setFriends(friends));
        })

        socket.on("new-online-user", (data) =>{
            console.log("nuovo utente online");
            dispatch(setOnlineFriends(data)); //data=id
        })

        socket.on("new-disconnect-user", (data) =>{
            console.log("utente disconnesso");
            dispatch(setDisconnectFriends(data)); //data=id
        })

        socket.on("init-online-users", (data) =>{
            console.log("inizializzazione utenti online");
            const {onlineUsers} = data;
            console.log(onlineUsers);
            onlineUsers.forEach(ou => {
                dispatch(setOnlineFriends(ou.userId));
            })
        });


}

export default connect_to_socket_io_server;