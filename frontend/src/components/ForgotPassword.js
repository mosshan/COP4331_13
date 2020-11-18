import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './CSS/login.css';

function ForgotPassword()
{
    
    var email;

    const [message,setMessage] = useState('');

    const sendEmail = async event => {
        // Connect to API
    }

    return(
      <div id="loginDiv">
        <form onSubmit={sendEmail} className="login-div">
            <span id="inner-title" className="inner-title">Forgot Password</span>
            <input type="text" className="login-input" id="loginName" placeholder="Email"  ref={(c) => email = c} /><br />
            <input type="submit" id="loginButton" className="login-button" value = "Send" onClick={sendEmail} />
            <span id="loginResult" className="login-result">{message}</span>
        </form>
    
     </div>
    );
};

export default ForgotPassword;