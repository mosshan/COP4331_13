import React from 'react';
import SignUp from '../components/SignUp';
import PageTitle from '../components/PageTitle';
import './CSS/signuppage.css';

const SignUpPage = () =>
{
    return(
      <div className="signup-page" >
        <PageTitle text='Study Knights'/>
        <SignUp />
      </div>

    );
};

export default SignUpPage;




