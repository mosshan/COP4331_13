import React from 'react';
import './CSS/loginpage.css';

import PageTitle from '../components/PageTitle';
import Login from '../components/Login';
import ForgotPassword from '../components/ForgotPassword';

const ForgotPasswordPage = () =>
{

    return(
      <div className="login-page" >
        <PageTitle text="Study Knights"/>
        <ForgotPassword />
      </div>

    );
};

export default ForgotPasswordPage;
