import { Button, Typography } from "@mui/material"
import React from "react"
import Avatar from "../../../components/Avatar"
import OnlineIndicator from "./OnlineIndicator"

const FriendsListItem = ({username, id, isOnline}) => {

    return (
      <Button
        style= {button_style}
      >
        <Avatar username={username} large={false}/>
        <Typography
            style={{
                marginLeft: "7px",
                fontWeight: 700,
                color: "#8e9297"
            }}
            variant="subtitle1"
            align="left"
            >
                {username}
            </Typography>
            {isOnline && <OnlineIndicator />}
      </Button>
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

export default FriendsListItem;