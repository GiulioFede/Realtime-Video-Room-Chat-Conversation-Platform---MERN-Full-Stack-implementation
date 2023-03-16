import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import PendingInvitationListItem from "./PendingInvitationListItem"

const INVITATIONS = [
  {
    _id: "1",
    senderId: {
      username: "Rocco",
      email: "rok@gmail.com"
    }
  },
  {
    _id: "2",
    senderId: {
      username: "Luisa",
      email: "lulu@gmail.com"
    }
  }
]

const PendingInvitationList = () => {

   const pending_invitations = useSelector(state => state.friends.pendingFriendsInvitations);
  console.log(pending_invitations);
    return (
      <div style={custom_style}>
          {pending_invitations.length>0 && pending_invitations.map(invitation =>(
            <PendingInvitationListItem
            key={invitation._id}
            id={invitation._id}
            username = {invitation.senderId.username}
            email = {invitation.senderId.email}
          />
          ))}
      </div>
    )
}

const custom_style = {
    width: "100%",
    height: "22%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "auto"
}

export default PendingInvitationList;