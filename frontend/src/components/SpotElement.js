import React from 'react';
import './CSS/spots.css';

function Spot(props)
{
   return(
     <button class="spot-item">
        <text class="spot-name">{props.name}</text>
        <text class="spot-rating">Average Rating: {props.rating}</text>
     </button>
   );
};

export default Spot;