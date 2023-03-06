import { Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react"
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";
import RedirectInfo from "../../components/RedirectInfo";
import AuthBox from "../components/BoxAuth";
import {useNavigate} from "react-router-dom";
import { validateRegisterForm } from "./utils/validator";

const RegisterPage = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect( ()=> {
        setIsFormValid(validateRegisterForm({email, password, username}))
    },[email, password, username, setIsFormValid])

    const handleSignInClick = () => {
        console.log("sign in" + isFormValid);
    }

    const handlePushToLoginPage = () => {
        //redirect alla pagina di login
        navigate('/login');
    }

    return (
        <AuthBox>

            {/*TITOLO */}
            <Typography variant="h5" sx={{ color:"white"}}>
                Crea un account
            </Typography>
            
            {/*CAMPO PER EMAIL */}
            <InputField
                value={email}
                setValue={setEmail}
                label="Email address"
                type="text"
                placeholder="Inserisci un indirizzo email"
            />

            {/*CAMPO PER USERNAME */}
            <InputField
                value={username}
                setValue={setUsername}
                label="Username"
                type="text"
                placeholder="Inserisci uno username"
            />

            {/*CAMPO PER PASSWORD */}
            <InputField
                value={password}
                setValue={setPassword}
                label="Password"
                type="password"
                placeholder="Inserisci una password"
            />
        

            {/*BOTTONE PER REGISTRARSI*/}
            {/*Toolpit serve per suggerire, al mouse over, delle info. Ha bisogno che l'elemento sia html (per questo uso un div) */}
            <Tooltip 
                title = {!isFormValid ? "Inserisci email e password corrette": "Clicca per registrarti!"}
            >
                <div>
                    <PrimaryButton
                        label="Sign in"
                        additionalStyles = {{marginTop:"30px"}}
                        disabled={!isFormValid}
                        onClick={handleSignInClick}
                    />
                </div>
            </Tooltip>

            {/*TASTO PER ESSERE REDIRETTI NELLA PAGINA DI REGISTRAZIONE*/}
            <RedirectInfo  
                text="Hai già un account? "
                redirectText="Vai al log in"
                redirectHandler={handlePushToLoginPage}
            />             

        </AuthBox>
    )
};

export default RegisterPage;