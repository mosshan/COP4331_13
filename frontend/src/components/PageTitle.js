import React from 'react';
import LoggedInName from './LoggedInName';

import './CSS/title.css';


let style = {
  background: "#FFC904",
  width: "100vw",
};

function setLoginButton(props)
{
  let id;
  try {
    id = JSON.parse(localStorage.user).id;
  }
  catch(e)
  {
    id = 0;
  }
  if (id > 0)
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
     <div className="navbar" style={style}>
       <div className="back-button-container">
        {!props.map ? 
            <button onClick={() => window.location.href = '/'} className="logout-button">To Map</button>
            : <div/>
        }
      </div> 
      <div className="title-container" >
        <div className="page-title" id="title">{props.text}</div>
      </div>
      <div className="logout-container">
        {setLoginButton(props)}
      </div> 
      
    </div>
   );
};

export default PageTitle;
