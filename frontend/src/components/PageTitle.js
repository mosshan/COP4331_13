import React from 'react';
import LoggedInName from './LoggedInName';

import './CSS/title.css';


let style = {
  background: "#FFC904",
  width: "100vw",
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
      <LoggedInName />
    </div>
   );
};

export default PageTitle;
