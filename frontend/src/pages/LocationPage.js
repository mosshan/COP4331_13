import React, { useState } from 'react';

import PageTitle from '../components/PageTitle';
import Spot from '../components/SpotElement';
import '../components/CSS/spots.css';
import Map from '../components/Map';
import './CSS/homepage.css';
import '../components/CSS/map.css';

// let props = 
// [
//     locationName,
//     id?
//     spots[] <-- list of spots within location
// ]

function f()
{
    let spotArray = Array(localStorage.currentSpots);
    let spotDivs = [];
    if (spotArray[0] === "undefined")
    {
        return (<h1>No Study Spots Available</h1>);
    }

    // Map instead here
    spotArray.forEach(element => {
        spotDivs.push(<Spot rating={element.rating} name={element.name}/>);
    });
    return spotDivs;
}




const LocationPage = (props) =>
{
    
    console.log(localStorage.currentSpots);
    // let spotList = getSpots(props);

    console.log(props);
    return(
        <div className="home-page">
            <PageTitle text={props.name} />
            <ul className="spot-container">
                <h2 className="spot-inner-title">Study Spots</h2>
                {f()}
                {/* <Spot rating="1" name="Spot 1" />
                <Spot rating="2" name="Spot 2" />
                <Spot rating="3" name="Spot 3" />
                <Spot rating="4" name="Spot 4" />
                <Spot rating="5" name="Spot 5" /> */}
            </ul>
        </div>
    );
}

export default LocationPage;
