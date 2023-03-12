
import React from "react"
import AppBar from "./AppBar/AppBar";
import FriendsSideBar from "./FriendsSideBar/FriendsSideBar";
import Messenger from "./Messenger/Messenger";
import SideBar from "./SideBar/SideBar";

const Dashboard = (props) => {
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