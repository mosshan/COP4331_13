import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './CSS/login.css';

function ChangePassword()
{
    
    var newPassword;
    var confirmPassword;

    const [message,setMessage] = useState('');

    const updatePassword = async event => {
        // Connect to API
    }

    return(
      <div id="loginDiv">
        <form onSubmit={updatePassword} className="login-div">
            <span id="inner-title" className="inner-title">Reset Password</span>
            <input type="text" className="login-input" id="loginName" placeholder="New Password"  ref={(c) => newPassword = c} /><br />
            <input type="text" className="login-input" id="loginName" placeholder="Confirm Password"  ref={(c) => confirmPassword = c} /><br />
            <input type="submit" id="loginButton" className="login-button" value = "Submit" onClick={updatePassword} />
            <span id="loginResult" className="login-result">{message}</span>
        </form>
    
     </div>
    );
};

export default ChangePassword;