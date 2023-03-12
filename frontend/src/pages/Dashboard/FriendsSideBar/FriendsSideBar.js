
import React from 'react';
import AddFriendButton from './AddFriendButton';
import FriendsList from './FriendsList/FriendsList';
import FriendsTitle from './FriendsTitle';
import PendingInvitationList from './PendingInviationList/PendingInvitationList';


const FriendsSideBar = () => {
    return (
        <div style={divStyle}>
            <AddFriendButton />
            <FriendsTitle title="Messaggi Privati" />
            <FriendsList />
            <FriendsTitle title="Richieste di amicizia" />
            <PendingInvitationList />
        </div>
    )
}

const divStyle = {
    width:"224px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#2F3136"
};

export default FriendsSideBar;