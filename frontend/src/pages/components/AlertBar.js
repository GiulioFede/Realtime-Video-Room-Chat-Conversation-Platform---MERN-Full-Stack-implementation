import React from 'react'
import { Snackbar,Alert } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { close } from './slices/AlertBarSlice';


const AlertBar = (props) => {

    const dispatch = useDispatch();

    const showAlertMessage = useSelector(state => state.alertMessage.showAlertMessage);
    const alertMessageContent = useSelector(state => state.alertMessage.alertMessageContent);

    return (
        <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal:'center' }}
            open = {showAlertMessage}
            onClose = {()=>{console.log("chiudi"); dispatch(close())}}
            autoHideDuration={3000}
        >
            <Alert severity='info'>{alertMessageContent}</Alert>
        </Snackbar>
    )
}

export default AlertBar;