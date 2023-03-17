
import React, { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import connect_to_socket_io_server from "../../realtime_communications/socketConnection";
import { logout, setUserDetails } from "../authPages/userDetailsSlice";
import AppBar from "./AppBar/AppBar";
import { setFriends } from "./features/friendsSlice";
import FriendsSideBar from "./FriendsSideBar/FriendsSideBar";
import Messenger from "./Messenger/Messenger";
import SideBar from "./SideBar/SideBar";

const Dashboard = (props) => {

    const dispatch = useDispatch();

    //variabile utile a essere sicuri di eseguire operazioni una volta sola (anche se il componente viene rimontato)
    const isFirstTime = useRef(true);


    useEffect(()=>{

        if (isFirstTime.current == true){
            //leggo il local storage del browser
            const userDetails = localStorage.getItem("user");

            if(!userDetails){
                logout();
            }else {
                dispatch(setUserDetails(userDetails));
                //mi connetto al socket.io server
                console.log("mi connetto al socket server..."+userDetails);
                connect_to_socket_io_server(JSON.parse(userDetails), dispatch);
            }

            isFirstTime.current = false;
        }

    },[])


    return (
        <div style={divStyle}>
            <SideBar />
            <FriendsSideBar />
            <Messenger />
            <AppBar />
        </div>
    )
};

const divStyle = {
    display:"flex", 
    width: "100%",
    height: "100vh",
};

export default Dashboard;