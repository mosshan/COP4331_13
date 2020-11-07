import React from 'react';

import PageTitle from '../components/PageTitle';
import Map from '../components/Map';
import './CSS/homepage.css';
import '../components/CSS/map.css';

const HomePage = () =>
{
    return(
        <div className="home-page">
            <PageTitle text="Home" map={true}/>
            <Map />

        </div>
    );
}

export default HomePage;
