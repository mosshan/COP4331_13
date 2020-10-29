import React from 'react';
import './CSS/loginpage.css';

import PageTitle from '../components/PageTitle';
import Login from '../components/Login';

const LoginPage = () =>
{

    return(
      <div class="login-page" >
        <PageTitle />
        <Login />
      </div>

    );
};

export default LoginPage;
