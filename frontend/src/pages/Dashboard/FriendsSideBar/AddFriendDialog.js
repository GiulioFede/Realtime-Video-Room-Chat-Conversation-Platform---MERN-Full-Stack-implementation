import React, { useEffect, useState } from "react"
import { validateEmail } from "../../authPages/LoginPage/utils/validator";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { sendFriendInvitationAPI } from "../features/friendsSlice";
import { open } from "../../components/slices/AlertBarSlice";

const AddFriendDialog = ({
    isDialogOpen,
    closeDialogHandler
}) => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [isFormValid, setIsFormValid] = useState("");

    //errore per lo slice FRIENDS
    const error = useSelector(state => state.friends.error);
    //stato per lo slice FRIENDS
    const status = useSelector(state => state.friends.status);

    useEffect( ()=>{

        if(status=="failed"){
            console.log("errore friends");
            dispatch(open(error));
        }

    },[error])

    const handleSendInvitation = () => {
        //send friend request to server
        console.log("invia richiesta di amicizia a "+email);
        dispatch(sendFriendInvitationAPI({targetEmailAddress: email}));
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
                    <Typography component={'span'}> Invita un amico</Typography>
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        <Typography component={'span'}> Inserisci un indirizzo email</Typography>
                    </DialogContentText>
                    <InputField 
                            label = "email"
                            type="text"
                            value = {email}
                            setValue={setEmail}
                            placeholder = "inserisci un indirizzo email"
                        />
                </DialogContent>
                <DialogActions>
                    <PrimaryButton 
                        onClick={handleSendInvitation}  
                        disabled={!isFormValid} 
                        label="Invia"
                        additionalStyles = {{
                            marginLeft: "15px",
                            marginRight: "15px",
                            marginBottom: "10px"
                        }} 
                    />
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddFriendDialog;