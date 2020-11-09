import React from 'react';
import './CSS/title.css';

function LoggedInName()
{
  let firstName = "";
  let lastName = "";
  let user;
  let username = "";

  const f = function() {
    
    try {
      user = JSON.parse(localStorage.user);
      firstName = user.firstName;
      lastName = user.lastName;
      username = user.username;
      console.log(user);
    }
    catch(e)
    {
      user = {
        username: "",
        firstName: "",
        lastName: "",
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
          username: "",
          id:0
        }
      );
      localStorage.user = emptyUser
      window.location.href = '/login';

    };    

    return(
      <div id="loggedInDiv" className="logout-container">
        <span id="userName" className="logout-name">{username}</span>
        <button type="button" id="logoutButton" className="logout-button" 
           onClick={doLogout}> Log Out </button>
      </div>
    );
};

export default LoggedInName;
