import React from 'react';

import PageTitle from '../components/PageTitle';
import Map from '../components/Map';
import './CSS/homepage.css';
import '../components/CSS/map.css';

// let props = 
// [
//     locationName,
//     id?
//     spots[] <-- list of spots within location
// ]


const LocationPage = (props) =>
{
    return(
        <div class="home-page">
            <PageTitle text={props.name} />
            

        </div>
    );
}

export default LocationPage;
