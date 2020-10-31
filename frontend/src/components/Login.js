import React, { useState } from 'react';
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

            if( res.id <= 0 )
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
                var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));

                setMessage('');
                window.location.href = '/home';
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
        <form onSubmit={doLogin} class="login-div">
            <span id="inner-title" class="inner-title">Login</span>
            <input type="text" class="login-input" id="loginName" placeholder="Username"  ref={(c) => loginName = c} /><br />
            <input type="password" class="login-input" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c}  /><br />
            <input type="submit" id="loginButton" class="login-button" value = "Go" onClick={doLogin} />
        </form>
    <span id="loginResult">{message}</span>
     </div>
    );
};

export default Login;
