import React from "react";
import './CSS/popup.css';
 
const Popup = props => {

    /*
    popup props:
        spot name --> prob id of some sort for API connection
        avg rating
        closing 
    */
  return (
    <div className="popup-container" >
      <div className="popup">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        <h1 >Rate!</h1>
        <h2>{props.name}</h2>
      </div>
    </div>
  );
};
 
export default Popup;