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

class ChangePassword extends React.Component
{

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword: '',
            message: '',
        };
     }


    updatePassword = async event => {
        event.preventDefault();
    
        var objs = {token:this.props.hash,password:this.state.password};
        var js = JSON.stringify(objs);

        try
        {    
            const response = await fetch(buildPath('api/passwordReset'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if( res.error === '' )
            {
                // var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                // localStorage.setItem('user_data', JSON.stringify(user));

                this.setState({message:''});
                window.location.href = '/login';
            }
            else
            {
                this.setState({message:res.error});
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        } 
    }

    setPassword = (e) => {
        this.setState({password:e.target.value});
    }
    setConPassword = (e) => {
        this.setState({confirmPassword:e.target.value});
        if (this.state.password !== e.target.value) {
            this.setState({message:"Passwords don't match"});
        }
        else {
            this.setState({message:''});
        }
    }

    render() {
        return(
            <div id="loginDiv">
              <form onSubmit={this.updatePassword} className="login-div">
                  <span id="inner-title" className="inner-title">Reset Password</span>
                  <input type="password" className="sign-up-input" placeholder="Password"
                    onChange={this.setPassword}
                /><br />
                <input type="password" className="sign-up-input" placeholder="Confirm Password"
                    onChange={this.setConPassword}
                /><br />
                <input type="submit" className="register-button" value = "Create Account" 
                    onClick={this.updatePassword} 
                />
                <span className="sign-up-result">{this.state.message}</span>
              </form>
          
           </div>
          );
    }
    
};

export default ChangePassword;