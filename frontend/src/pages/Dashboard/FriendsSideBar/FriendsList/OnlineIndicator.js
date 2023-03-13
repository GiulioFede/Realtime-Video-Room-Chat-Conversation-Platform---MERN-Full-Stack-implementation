import { FiberManualRecordRounded } from "@mui/icons-material"
import { Box } from "@mui/material"
import React from "react"

const OnlineIndicator = ({username, id, isOnline}) => {

    return (
        <Box 
            sx={{
                color:"#3ba55d",
                display:"flex",
                alignItems: "center",
                position: "absolute",
                right: "5px"
            }}
        >
            <FiberManualRecordRounded />
        </Box>
    )
}

const button_style = {
    width: "100%",
    height: "42px",
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    textTransform: "none",
    color: "black",
    position: "relative"
}

export default OnlineIndicator;