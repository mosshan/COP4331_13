import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './CSS/SignUp.css';
// import {Button} from './Button';

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

class SignUp extends React.Component
{

    constructor(props) {
        super(props);
        this.state = {
            signUser: '',
            signEmail: '',
            password: '',
            confirmPassword: '',
            message: '',
            resMessage: '',
        };
     }

    
    

    doSignUp = async event => {
        

        event.preventDefault();
    
        var objs = {userName:this.state.signUser, email:this.state.signEmail, password:this.state.password};
        var js = JSON.stringify(objs);

        try
        {    
            const response = await fetch(buildPath('api/register'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if( res.error === '' )
            {
                // var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                // localStorage.setItem('user_data', JSON.stringify(user));

                this.setState({resMessage:''});
                window.location.href = '/login';
            }
            else
            {
                this.setState({resMessage:res.error});
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }   
    } 

    setUsername = (e) => {
        this.setState({signUser:e.target.value});
    }
    setEmail = (e) => {
        this.setState({signEmail:e.target.value});
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
    
    /*creates function doSignUp */

    render () {
        return(

            <div className="hero-container">
    
            <form onSubmit={this.doSignUp} className="sign-up-div">
                <span id="inner-title" className="inner-title">Sign Up</span>
                <input type="text" className="sign-up-input" placeholder="Username"
                    onChange={this.setUsername}
                /> <br />
                <input type="text" className="sign-up-input" placeholder="Email"
                    onChange={this.setEmail}
                /><br />
                <input type="password" className="sign-up-input" placeholder="Password"
                    onChange={this.setPassword}
                /><br />
                <input type="password" className="sign-up-input" placeholder="Confirm Password"
                    onChange={this.setConPassword}
                /><br />
                <input type="submit" className="register-button" value = "Create Account" 
                    onClick={this.doSignUp} 
                />
                <span className="sign-up-result">{this.state.message === '' ? this.state.resMessage : this.state.message}</span>
            </form>  
            
            </div>
          ); 
    }
    
}

export default SignUp;
