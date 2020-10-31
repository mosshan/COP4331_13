import React from 'react';
import './CSS/title.css';

function LoggedInName()
{

    var user={}

    const doLogout = event => 
    {
	    event.preventDefault();
		
        alert('doLogout');
    };    

    return(
      <div id="loggedInDiv" class="logout-container">
        <span id="userName" class="logout-name">John Doe</span>
        <button type="button" id="logoutButton" class="logout-button" 
           onClick={doLogout}> Log Out </button>
      </div>
    );
};

export default LoggedInName;
