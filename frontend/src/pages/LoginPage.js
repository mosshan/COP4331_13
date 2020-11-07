import React from 'react';
import './CSS/loginpage.css';

import PageTitle from '../components/PageTitle';
import Login from '../components/Login';

const LoginPage = () =>
{

    return(
      <div className="login-page" >
        <PageTitle text="Study Knights" loginPage={true}/>
        <Login />
      </div>

    );
};

export default LoginPage;
