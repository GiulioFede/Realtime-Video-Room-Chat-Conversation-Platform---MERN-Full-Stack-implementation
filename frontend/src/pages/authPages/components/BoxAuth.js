
import { Box } from "@mui/system";
import React from "react";

const AuthBox = (props) =>{
    return (
        <div style={{width:"100%", height:"100vh", display: "flex", alignItems:"center", justifyContent:"center", background:"#0092ff"}}>

            <Box sx={{ width: 700, height: 400, bgcolor: "#282828", borderRadius: '5px', boxShadow: "0 2px 10px 0 rgb(0 0 0 / 25%)", display: "flex", flexDirection: 'column', padding: "25px"}}>
                {/*INSERISCO I FIGLI CHE PASSO, OSSIA I TAG CHE COMPORRANNO IL CONTENUTO DEL BOX */}
                {props.children}
            </Box>

        </div>
    )
}

export default AuthBox;