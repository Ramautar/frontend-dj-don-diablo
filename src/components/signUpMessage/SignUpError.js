import React from 'react';
import successLogo from "../../assets/Registration-successful.jpg"
import './SignUpError.css'

function SignUpError(){
    return(
        <div className="SignUpErrorMsg">
           <img src={successLogo} alt="succesful registartion logo" />
           <h2>Bedankt voor uw registratie!!!</h2>
        </div>
    )
}

export default SignUpError;