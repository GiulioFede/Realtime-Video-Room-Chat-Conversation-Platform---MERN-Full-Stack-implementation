import React from "react";
import { Typography } from "@mui/material";

const BoxHeaderAuth = (props) => {
    return (
        <>
            <Typography variant="h5" sx={{color: "white"}}>{props.title}</Typography>
            <Typography sx={{color: "#dfdfdf"}}>{props.subtitle}</Typography>
        </>
    )
}

export default BoxHeaderAuth;