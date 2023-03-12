import React, { useEffect, useState } from "react"
import { validateEmail } from "../../authPages/LoginPage/utils/validator";
import { Dialog, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import InputField from "../../components/InputField";

const AddFriendDialog = ({
    isDialogOpen,
    closeDialogHandler,
    sendFriendInvitation = () => {}
}) => {

    const [email, setEmail] = useState("");
    const [isFormValid, setIsFormValid] = useState("");

    const handleSendInvitation = () => {
        //send friend request to server
    }

    const handleCloseDialog = () => {
        closeDialogHandler();
        setEmail("");
    }

    useEffect( () => {
        setIsFormValid(validateEmail(email));
    }, [email, setIsFormValid])

    return (
        <>
            <Dialog
                open = {isDialogOpen}
                onClose ={handleCloseDialog}
            >
                <DialogTitle>
                    <Typography> Invita un amico</Typography>
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        <Typography> Inserisci un indirizzo email</Typography>
                    </DialogContentText>
                    <InputField 
                            label = "email"
                            type="text"
                            value = {email}
                            setValue={setEmail}
                            placeholder = "inserisci un indirizzo email"
                        />
                </DialogContent>

            </Dialog>
        </>
    )
}

export default AddFriendDialog;