import React from "react";
import {css} from 'glamor'
import { Button } from "@mui/material";

const PrimaryButton = (props) =>{

    const {label, additionalStyles, disabled, onClick} = props;

    return (
        
        <Button
            variant="contained"
            sx = {{
                bgcolor: "#5865F2",
                color: "white",
                textTransform: "none",
                fontSize: "16px",
                fontWeight:500,
                width:"100%",
                height:"40px"
            }}
            style={additionalStyles ? additionalStyles : {}}
            disabled = {disabled}
            onClick = {onClick}
        >
            {label}
        </Button>
            
    )
}


const divStyle = css({
    display:"flex", 
    justifyContent:"center", 
    flexDirection: "column", 
    width:"100%"
});

const pStyle = css({
    color: "#b9bbbe",
    textTransform: "uppercase",
    fontWeight: "600",
    fontSize:"16px"
});

const inputStyle = css({
    flexGrow:1,
    height:"40px",
    border: "1px solid black",
    borderRadius: "5px",
    color: "dcddde",
    background: "#35393f",
    margin: 0,
    fontSize: "16px",
    padding: "0 px"
});

export default PrimaryButton;