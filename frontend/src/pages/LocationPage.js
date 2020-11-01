import React from 'react';

import PageTitle from '../components/PageTitle';
import Spot from '../components/SpotElement';
import Map from '../components/Map';
import './CSS/homepage.css';
import '../components/CSS/map.css';

// let props = 
// [
//     locationName,
//     id?
//     spots[] <-- list of spots within location
// ]

function f(props)
{
    var spotList;
    if (props.spots == null)
    {
        return (<h1>No Study Spots Available</h1>);
    }
    props.spots.forEach(element => {
        spotList += <Spot rating={element.rating} name={element.name}/>
    });
    return spotList;
}

const LocationPage = (props) =>
{
    return(
        <div class="home-page">
            <PageTitle text={props.name} />
            {f(props)}

        </div>
    );
}

export default LocationPage;
