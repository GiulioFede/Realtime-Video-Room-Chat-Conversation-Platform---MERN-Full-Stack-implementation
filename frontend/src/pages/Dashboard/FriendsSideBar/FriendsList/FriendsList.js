
import { Typography } from "@mui/material";
import React, { useEffect } from "react"
import { useSelector } from "react-redux";
import FriendsListItem from "./FriendsListItem";

const FRIENDS = [
  {
    id:1,
    username: "Antonio",
    isOnline: true
  },
  {
    id:2,
    username: "Silvia",
    isOnline: false
  },
  {
    id:3,
    username: "Benedetta",
    isOnline: true
  },
  {
    id:4,
    username: "Carlo",
    isOnline: true
  }
]

const FriendsList = ({title}) => {

   const friends = useSelector(state => state.friends.friends);
   useEffect(()=>{
      console.log("aggiornamento amici");
      console.log(friends);
   },[friends])
    return (
      <div style={custom_style}>
       
        {friends.map(f => (
          <FriendsListItem
            username = {f.username}
            id = {f.id}
            key={f.id}
            isOnline={f.isOnline}
          />
        ))}
        

      </div>
    )
}

const custom_style = {
    flexGrow: 1,
    width: "100%"
}

export default FriendsList;