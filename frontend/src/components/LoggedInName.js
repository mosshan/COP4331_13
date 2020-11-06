import React from 'react';
import './CSS/title.css';

function LoggedInName()
{
  let userName = "";
  let user;

  const f = function() {
    
    try {
      user = JSON.parse(localStorage.user);
      userName = user.userName;
    }
    catch(e)
    {
      user = {
        userName:"",
        id:0
      }
    }
  }
  f();
    
    

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
        <span id="userName" class="logout-name">{userName}</span>
        <button type="button" id="logoutButton" class="logout-button" 
           onClick={doLogout}> Log Out </button>
      </div>
    );
};

export default LoggedInName;
