import React, { useState } from 'react';

import PageTitle from '../components/PageTitle';
import Spot from '../components/SpotElement';
import '../components/CSS/spots.css';
import Map from '../components/Map';
import './CSS/homepage.css';
import '../components/CSS/map.css';

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
            return <Spot id={element._id} rating={element.spot_rating} name={element.room} numRatings={element.numRatings}/>;
        })



        return(
            <div className="home-page" >
                <PageTitle text={this.props.name} />
                <ul className="spot-container">
                    <h2 className="spot-inner-title">Study Spots</h2>
                    {this.state.isLoading ? 
                        null : 
                            this.state.spots.length > 1 ? 
                                spotDivs : 
                                    <div className="no-spot-msg">
                                        <text className="no-spot-msg">No Study Spots Available.</text> <br/>
                                        <text className="no-spot-msg">Choose another location to view and rate study spots!</text>
                                    </div>
                         
                    }
                </ul>
            </div>
        );
    }
    
}

export default LocationPage;
