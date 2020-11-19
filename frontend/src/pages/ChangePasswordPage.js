import React from 'react';
import './CSS/loginpage.css';

import PageTitle from '../components/PageTitle';
import Login from '../components/Login';
import ChangePassword from '../components/ChangePassword';

const ForgotPasswordPage = () =>
{

    return(
      <div className="login-page" >
        <PageTitle text="Study Knights"/>
        <ChangePassword />
      </div>

    );
};

export default ForgotPasswordPage;
