import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './CSS/login.css';

function Login()
{

    const app_name = 'cop4331-8'
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
    
    var loginName;
    var loginPassword;

    const [message,setMessage] = useState('');

    const doLogin = async event => 
    {
        event.preventDefault();

        var obj = {login:loginName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch(buildPath('api/login'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());
            console.log(res);
            if( res.id <= 0 )
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
                var user = {id:res.id, username:res.username, firstName:res.firstName, lastName:res.lastName}
                localStorage.setItem('user', JSON.stringify(user));
                console.log(user);
                setMessage('');
                window.location.href = '/';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };

    return(
      <div id="loginDiv">
        <form onSubmit={doLogin} className="login-div">
            <span id="inner-title" className="inner-title">Login</span>
            <input type="text" className="login-input" id="loginName" placeholder="Username"  ref={(c) => loginName = c} /><br />
            <input type="password" className="login-input" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c}  /><br />
            <input type="submit" id="loginButton" className="login-button" value = "Go" onClick={doLogin} />
            <Link to="/forgotpassword">Forgot Password?</Link>
            <span id="loginResult" className="login-result">{message}</span>
        </form>
    
     </div>
    );
};

export default Login;
