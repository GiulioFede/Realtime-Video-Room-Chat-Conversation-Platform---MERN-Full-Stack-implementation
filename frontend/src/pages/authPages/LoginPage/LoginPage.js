import React, { useState } from "react"
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";
import RedirectInfo from "../../components/RedirectInfo";
import AuthBox from "../components/BoxAuth";
import BoxHeaderAuth from "../components/BoxHeaderAuth";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {

    const navigate = useNavigate();

    //contiene il valore di email che l'utente ogni volta che digita inserisce
    const [email, setEmail] = useState(''); 
    //contiene la password che l'utente ogni volta che digita inserisce
    const [password, setPassword] = useState('');

    const [isFormValid, setIsFormValid] = useState(false);
    
    const handleLogInClick = () => {
        console.log("log in");
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
            <PrimaryButton
                label="Log in"
                additionalStyles = {{marginTop:"30px"}}
                disabled={!isFormValid}
                onClick={handleLogInClick}
            />

            <RedirectInfo  
                text="Sei nuovo?"
                redirectText=" Crea un account"
                redirectHandler={handlePushToRegisterPage}
            />

        </AuthBox>
    )
};

export default LoginPage;