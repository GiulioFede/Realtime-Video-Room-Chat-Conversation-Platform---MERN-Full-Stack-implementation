import React from "react";
import {css} from 'glamor'

const InputField = (props) =>{

    const {value, setValue, label, type, placeholder} = props;
    
    //quando varia il valore di input...
    const onChangeValue = (event) =>{
        setValue(event.target.value);
    }

    return (
        
        <div {...divStyle}>
            
            {/*LABEL */}
            <p {...pStyle}>{label}</p>

            {/*INPUT FIELD*/}
            <input {...inputStyle}
                value = {value}
                onChange = {onChangeValue}
                type = {type}
                placeholder={placeholder}>
            </input>
        </div>
            
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

export default InputField;
