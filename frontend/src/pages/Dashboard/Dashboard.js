
import React, { useEffect } from "react"
import { useDispatch } from "react-redux";
import connect_to_socket_io_server from "../../realtime_communications/socketConnection";
import { logout, setUserDetails } from "../authPages/userDetailsSlice";
import AppBar from "./AppBar/AppBar";
import FriendsSideBar from "./FriendsSideBar/FriendsSideBar";
import Messenger from "./Messenger/Messenger";
import SideBar from "./SideBar/SideBar";

const Dashboard = (props) => {

    const dispatch = useDispatch();

    useEffect(()=>{

        //leggo il local storage del browser
        const userDetails = localStorage.getItem("user");

        if(!userDetails){
            logout();
        }else {
            dispatch(setUserDetails(userDetails));
            //mi connetto al socket.io server
            connect_to_socket_io_server();
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