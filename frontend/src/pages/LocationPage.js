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

const app_name = 'cop4331-8'
function buildPath(route)
{
    if (process.env.NODE_ENV === 'production') 
    {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    }
    else
    {        
        return 'http://localhost:5000/' + route;
    }
}

const getSpots = async event => 
{

    event.preventDefault();

    var obj = {place_id: localStorage.locationId};
    var js = JSON.stringify(obj);

    try
    {    
        const response = await fetch(buildPath('api/fetchSpots'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

        var res = JSON.parse(await response.text());
        console.log(res);

        var spotList;
        if (res.results.length <= 0)
        {
            return null;
        }
        // map
        let spots = [];
        res.results.forEach(element => {
            spots.push(element);
        });
        localStorage.currentSpots = spots;
        return spots;
    }
    catch(e)
    {
        alert(e.toString());
        return (null);
    }    
};



function f()
{
    
    let spotArray = Array(localStorage.currentSpots);
    console.log(localStorage)
    console.log(spotArray);
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
        <div className="home-page" onLoad={getSpots}>
            <PageTitle text={props.name} />
            <ul className="spot-container">
                <h2 className="spot-inner-title">Study Spots</h2>
                {/* {f()} */}
                <Spot rating="1" name="Spot 1" />
                <Spot rating="2" name="Spot 2" />
                <Spot rating="3" name="Spot 3" />
                <Spot rating="4" name="Spot 4" />
                <Spot rating="5" name="Spot 5" />
            </ul>
        </div>
    );
}

export default LocationPage;
