import React from 'react';
import './CSS/title.css';

function LoggedInName()
{

    // let user;
    // try {
    //   user = JSON.parse(localStorage.user);
    // }
    // catch(e)
    // {
    //   user = {
    //     firstName:"",
    //     lastName:"",
    //     id:0
    //   }
    // }
    

    const doLogout = event => 
    {
      let emptyUser = JSON.stringify(
        {
          firstName:"",
          lastName:"",
          id:0
        }
      );
      localStorage.user = emptyUser
      window.location.href = '/login';

    };    

    return(
      <div id="loggedInDiv" class="logout-container">
        <span id="userName" class="logout-name">First Last</span>
        <button type="button" id="logoutButton" class="logout-button" 
           onClick={doLogout}> Log Out </button>
      </div>
    );
};

export default LoggedInName;
