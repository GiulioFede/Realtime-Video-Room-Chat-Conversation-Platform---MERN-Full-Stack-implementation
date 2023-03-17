import { Box, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react"
import { useDispatch } from "react-redux";
import Avatar from "../../../components/Avatar";
import { open } from "../../../components/slices/AlertBarSlice";
import { acceptFriendInvitation, rejectFriendInvitation } from "../../features/friendsSlice";
import InvitationDecisionButton from "./InvitationDecisionButton";

const PendingInvitationListItem = ({id, username, email}) => {

    const [buttonDisabled, setButtonDisabled] = useState(false);

    const dispatch = useDispatch();

    const handleAcceptInvitation = () => {

        console.log("accetto invito");
        
        dispatch(acceptFriendInvitation({id}))
            .then(()=>{console.log("tutto ok"); setButtonDisabled(true);})
            .catch((e)=>{console.log("Non ok:"+e); 
                        setButtonDisabled(false);
                        dispatch(open(e.toString()))
                    });

    }

    const handleRejectInvitation = () => {
        console.log("rifiuto invito");
        
        dispatch(rejectFriendInvitation({id}))
        .then(()=>{console.log("tutto ok"); setButtonDisabled(true);})
        .catch((e)=>{console.log("Non ok:"+e); 
                    setButtonDisabled(false);
                    dispatch(open(e.toString()))
                });
    }

    return (
      <Tooltip title={email}>
            <div style={{width: "100%"}}>
                <Box
                    sx={{
                        width: "100%",
                        height: "42px",
                        marginTop: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}
                >
                    <Avatar username={username} />
                    <Typography 
                        sx={{
                            marginLeft: "7px",
                            fontWeight: 700,
                            color: "#8e9297",
                            flexGrow: 1
                        }}>{username}
                    </Typography>
                    <InvitationDecisionButton
                    disabled={buttonDisabled}
                    acceptInvitationHandler = {handleAcceptInvitation}
                    rejectInvitationHandler = {handleRejectInvitation}
                 />
                </Box>
            </div>
       </Tooltip>
    )
}


export default PendingInvitationListItem;