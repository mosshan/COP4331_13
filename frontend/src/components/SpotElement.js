import React from 'react';
import { render } from 'react-dom';
import './CSS/spots.css';
import Popup from './RatingPopup';

function Spot(props)
{
   const [isOpen, setIsOpen] = React.useState(false);
   const togglePopup = () => {
      setIsOpen(!isOpen);
   }

   return(
      <div >
         <button class="spot-item" onClick={togglePopup}>
            <text class="spot-name">{props.name}</text>
            <text class="spot-rating">Average Rating: {props.rating}</text>
         </button>
         {isOpen && <Popup name={props.name} rating={props.rating} handleClose={togglePopup} />}
         
      
      </div>
   );
};

export default Spot;