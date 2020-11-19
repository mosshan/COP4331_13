import React from 'react';
// import './../components/SignUp.css';
import SignUp from '../components/SignUp';
import PageTitle from '../components/PageTitle';

import './CSS/SignUp.css';

const SignUpPage = () =>
{
    return(
      <div className="login-page" >
        <PageTitle text='Study Knights'/>
        <SignUp />
      </div>

    );
};

export default SignUpPage;




