import React from 'react';
import successLogo from "../../../assets/Registration-successful.jpg";
import './SignUpSuccesful.css';

function SignUpSuccessful(){
    return(
        <div className="SignUpSuccessMsg">
            <img src={successLogo} alt="successful registration logo" />
            <h2>Uw registratie is successful verlopen</h2>
        </div>
    )
}

export default SignUpSuccessful;