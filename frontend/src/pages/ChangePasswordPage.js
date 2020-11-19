import React from 'react';
import './CSS/loginpage.css';

import PageTitle from '../components/PageTitle';
import Login from '../components/Login';
import ChangePassword from '../components/ChangePassword';

const ForgotPasswordPage = (props) =>
{

    return(
      <div className="login-page" >
        <PageTitle text="Study Knights"/>
        <ChangePassword hash={props.match.params.hash}/>
      </div>

    );
};

export default ForgotPasswordPage;
