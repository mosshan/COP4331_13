import React from 'react';
import './../components/SignUp.css';
import SignUp from '../components/SignUp';
import PageTitle from '../components/PageTitle';

const SignUpPage = () =>
{
    return(
      <div class="login-page" >
        <PageTitle />
        <SignUp />
      </div>

    );
};

export default SignUpPage;




