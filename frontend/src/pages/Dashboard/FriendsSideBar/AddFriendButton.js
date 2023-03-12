import React, { useState } from "react"
import PrimaryButton from "../../components/PrimaryButton";
import AddFriendDialog from "./AddFriendDialog";

const AddFriendButton = () => {

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenAddFriendDialog = () =>{
        setIsDialogOpen(true);
    }

    const handleCloseDialog = () =>{
        setIsDialogOpen(false);
    }

    return (
        <>
            <PrimaryButton
                additionalStyles = {custom_style}
                label = "Aggiungi Amico"
                onClick = {handleOpenAddFriendDialog}
            />
            <AddFriendDialog 
                isDialogOpen={isDialogOpen} 
                closeDialogHandler={handleCloseDialog}
            />
        </>
    )
}

const custom_style = {
    marginTop: "10px",
    marginLeft: "5px",
    width: "80%",
    height: "30px",
    background: "#3ba55d"
}

export default AddFriendButton;