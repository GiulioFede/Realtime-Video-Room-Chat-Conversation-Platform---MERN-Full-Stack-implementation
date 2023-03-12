import React from 'react'


const AppBar = () => {
    return (
        <div style={divStyle}>

        </div>
    )
}

const divStyle = {
    position: "absolute",
    right: "0",
    top: "0",
    width:"calc(100% - 326px)",
    height: "48px",
    borderBottom: "1px solid black",
    display: "flex",
    justifyContent: "space-between",
    padding: "0 15px",
    alignItems: "center",
    backgroundColor: "#36393f"
};

export default AppBar;