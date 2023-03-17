
import { Check, CheckCircle, CheckCircleOutline, Clear, ClearRounded } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React from "react"


const InvitationDecisionButton = ({disabled, acceptInvitationHandler,rejectInvitationHandler}) => {

    return (
      <Box
        sx={{
            display: "flex"
        }}
      >
            <IconButton
                style={{color: "white"}}
                disabled={disabled}
                onClick={acceptInvitationHandler}
            >
                <Check />
            </IconButton>
            <IconButton
                style={{color: "white"}}
                disabled={disabled}
                onClick={rejectInvitationHandler}
            >
                <ClearRounded />
            </IconButton>

      </Box>
    )
}

const custom_style = {
    flexGrow: 1,
    width: "100%"
}

export default InvitationDecisionButton;