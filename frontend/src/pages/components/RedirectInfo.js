import React from "react";
import { Typography } from "@mui/material";

const RedirectInfo = ({text, redirectText, redirectHandler}) =>{
    return (
        <Typography
            sx = {{ color: "#72767d"}}
            variant="subtitle2"
            >
                {text}
                <span style={{color:"#00AFF4", fontWeight: 500, cursor:"pointer"}} onClick={redirectHandler}>{redirectText}</span>
        </Typography>
    )
};

export default RedirectInfo;