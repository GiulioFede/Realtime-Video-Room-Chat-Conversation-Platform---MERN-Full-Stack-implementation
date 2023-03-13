
import React, { useEffect } from "react"
import { useDispatch } from "react-redux";
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