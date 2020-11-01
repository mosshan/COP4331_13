import React from 'react';
import LoggedInName from './LoggedInName';

import './CSS/title.css';


let style = {
  background: "#FFC904",
  width: "100vw",
};

function setLoginButton(props)
{
  if (props.loggedIn)
  {
    return (<LoggedInName />);
  }
  else if (props.loginPage)
  {
    return (<button onClick={() => window.location.href = '/signup'} class="logout-button">Sign Up</button>);
  }
  else
  {
    return (<button onClick={() => window.location.href = '/login'} class="logout-button">Login</button>);
  }
}


function PageTitle(props)
{
   return(
     <div class="navbar" style={style}>
       <div class="back-button-container">
        {!props.map ? 
            <button onClick={() => window.location.href = '/'} class="logout-button">To Map</button>
            : <div/>
        }
      </div> 
      <div class="title-container" >
        <div class="page-title" id="title">{props.text}</div>
      </div>
      <div class="logout-container">
        {setLoginButton(props)}
      </div> 
      
    </div>
   );
};

export default PageTitle;
