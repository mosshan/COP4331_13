import React, { useState } from 'react';

import PageTitle from '../components/PageTitle';
import Spot from '../components/SpotElement';
import '../components/CSS/spots.css';
import Map from '../components/Map';
import './CSS/homepage.css';
import '../components/CSS/map.css';
// import getSpots from '../components/FetchSpots';

const app_name = 'study-knights'
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

class LocationPage extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
           spots: [],
           isLoading: true,
        };
     }

    componentDidMount = async () => {
        let spots = await this.getSpots();
        this.setState({spots: spots, isLoading: false});
    }

    getSpots = async () => {
        var obj = {place_id: parseInt(localStorage.locationId)};
        var js = JSON.stringify(obj);

        console.log(js);
        console.log(localStorage);
        try
        {    
            const response = await fetch(buildPath('api/fetchSpots'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            var preRes = await response.text();
            console.log(preRes);
            localStorage.currentSpots = preRes;

            var res = JSON.parse(preRes);
            console.log(res);
            if (res.results.length <= 0)
            {
                return [];
            }
            // map
            let spots = [];
            res.results.forEach(element => {
                spots.push(element);
            });
            console.log(spots);


            let spotDivs = [];
            console.log(spotDivs);
            console.log(localStorage);
            return spots;

        }
        catch(e)
        {
            alert(e.toString());
            return [];
        }  
        return [];
    }


    render () {
        let spotDivs = this.state.spots.map((element) => {
            return <Spot rating={4} name={"test"}/>;
        })



        return(
            <div className="home-page" >
                <PageTitle text={this.props.name} />
                <ul className="spot-container">
                    <h2 className="spot-inner-title">Study Spots</h2>
                    {this.state.isLoading ? 
                        null : 
                            this.state.spots.length > 1 ? 
                                spotDivs : <h1>No Study Spots Available</h1>
                         
                    }
                </ul>
            </div>
        );
    }
    
}

export default LocationPage;
