import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './CSS/login.css';


const app_name = 'study-knights'
function buildPath(route)
{
    if (process.env.NODE_ENV === 'production') 
    {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    }
    else
    {        
        return 'http://localhost:5000/' + route;
    }
}

function ForgotPassword()
{
    
    let email;
    let userName;

    const [message,setMessage] = useState('');

    const sendEmail = async event => {
        event.preventDefault();
    
        var objs = {username:userName.value, email:email.value};
        var js = JSON.stringify(objs);

        try
        {    
            const response = await fetch(buildPath('api/requestReset'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if( res.error === '' )
            {
                setMessage('Email has been sent.');
            }
            else
            {
                setMessage(res.error);
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }   
    }

    return(
      <div id="loginDiv">
        <form onSubmit={sendEmail} className="login-div">
            <span id="inner-title" className="inner-title">Forgot Password</span>
            <input type="text" className="login-input" id="email" placeholder="Email"  ref={(c) => email = c} /><br />
            <input type="text" className="login-input" id="loginName" placeholder="Username"  ref={(c) => userName = c} /><br />
            <input type="submit" id="loginButton" className="login-button" value = "Send" onClick={sendEmail} />
            <span id="loginResult" className="forgot-result">{message}</span>
        </form>
    
     </div>
    );
};

export default ForgotPassword;