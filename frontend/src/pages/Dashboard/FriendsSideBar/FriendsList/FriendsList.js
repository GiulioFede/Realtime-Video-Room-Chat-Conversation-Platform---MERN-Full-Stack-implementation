
import { Typography } from "@mui/material";
import React from "react"
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

    return (
      <div style={custom_style}>
       
        {FRIENDS.map(f => (
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