import React, { useEffect, useState } from "react"
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";
import RedirectInfo from "../../components/RedirectInfo";
import AuthBox from "../components/BoxAuth";
import BoxHeaderAuth from "../components/BoxHeaderAuth";
import {useNavigate} from "react-router-dom";
import { Tooltip } from "@mui/material";
import { validateLoginForm } from "./utils/validator";

const LoginPage = () => {

    const navigate = useNavigate();

    //contiene il valore di email che l'utente ogni volta che digita inserisce
    const [email, setEmail] = useState(''); 
    //contiene la password che l'utente ogni volta che digita inserisce
    const [password, setPassword] = useState('');

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(()=>{

        //quando cambia l'email e/o la password inserita li validiamo
        setIsFormValid( validateLoginForm({email, password}));

    },[email, password, setIsFormValid])
    
    const handleLogInClick = () => {
        console.log("log in" + isFormValid);
    }

    const handlePushToRegisterPage = () => {
        //redirect alla pagina di registrazione
        navigate('/register');
    }

    return (
        <AuthBox>

            {/*TITOLO e sottotitolo*/}
            <BoxHeaderAuth title="Bentornato!" subtitle="Siamo felici che sei di nuovo dei nostri!"/>
            
            {/*CAMPO PER EMAIL */}
            <InputField value={email} 
                        setValue={setEmail} 
                        label="email" 
                        type="text" 
                        placeholder= "inserisci la tua email" />

            {/*CAMPO PER PASSWORD */}
            <InputField value={password} 
                        setValue={setPassword} 
                        label="password" 
                        type="password" 
                        placeholder= "inserisci la tua password" />

            {/*BOTTONE PER LOGGARSI*/}
            {/*Toolpit serve per suggerire, al mouse over, delle info. Ha bisogno che l'elemento sia html (per questo uso un div) */}
            <Tooltip 
                title = {!isFormValid ? "Inserisci email e password corrette": "Clicca per fare il log in!"}
            >
                <div>
                    <PrimaryButton
                        label="Log in"
                        additionalStyles = {{marginTop:"30px"}}
                        disabled={!isFormValid}
                        onClick={handleLogInClick}
                    />
                </div>
            </Tooltip>

            {/*TASTO PER ESSERE REDIRETTI NELLA PAGINA DI REGISTRAZIONE*/}
            <RedirectInfo  
                text="Sei nuovo?"
                redirectText=" Crea un account"
                redirectHandler={handlePushToRegisterPage}
            />

        </AuthBox>
    )
};

export default LoginPage;