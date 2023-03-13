import { Button } from "@mui/material"
import React from "react"

const Avatar = ({username, large}) => {

    return (
      <div style= {large==true ? div_style_large : div_style_small}>

        {username.substring(0,2)}

      </div>
    )
}

const div_style_small = {
    width: "42%",
    height: "42px",
    backgroundColor: "#5865f2",
    borderRadius: "42px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "700",
    marginLeft: "5px",
    color: "white"
}

const div_style_large = {
  width: "80%",
  height: "80px",
  backgroundColor: "#5865f2",
  borderRadius: "42px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
  fontWeight: "700",
  marginLeft: "5px",
  color: "white"
}

export default Avatar;