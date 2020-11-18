import React, { useState } from 'react';

import PageTitle from '../components/PageTitle';
import Spot from '../components/SpotElement';
import '../components/CSS/spots.css';
import Map from '../components/Map';
import './CSS/homepage.css';
import '../components/CSS/map.css';
import getSpots from '../components/FetchSpots';

// let props = 
// [
//     locationName,
//     id?
//     spots[] <-- list of spots within location
// ]


function f()
{
    
    
    let spotDivs =  getSpots();;
    if (spotDivs === undefined)
    {
        return (<h1>No Study Spots Available</h1>);
    }

    // Map instead here
    // spotArray.forEach(element => {
    //     spotDivs.push(<Spot rating={element.rating} name={element.name}/>);
    // });
    console.log(spotDivs);
    return spotDivs;
}

function load()
{
    let spots = [];
    let spotDivs = [];
    spots = getSpots();
    if (spots === undefined)
    {
        return (<h1>No Study Spots Available</h1>);
    }

    // Map instead here
    spots.forEach(element => {
        spotDivs.push(<Spot rating={element.rating} name={element.name}/>);
    });
    return spotDivs;
}




class LocationPage extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
           spots: <h1>No Study Spots Available</h1>,
        };
     }

    f2 = function()
    {  
        let spots = localStorage.currentSpots;
        console.log(localStorage);
        if (spots === "undefined")
        {
            return (<h1>No Study Spots Available</h1>);
        }

        // let spotDivs = spots[0].Map(element => {
        //     return (<Spot rating={element.rating} name={element.name}/>);
        // });
        // return spotDivs;
    }


    render () {
        return(
            <div className="home-page" onLoad={this.f2()}>
                <PageTitle text={this.props.name} />
                <ul className="spot-container">
                    <h2 className="spot-inner-title">Study Spots</h2>
                    {this.state.spots}
                    {/* <Spot rating="1" name="Spot 1" />
                    <Spot rating="2" name="Spot 2" />
                    <Spot rating="3" name="Spot 3" />
                    <Spot rating="4" name="Spot 4" />
                    <Spot rating="5" name="Spot 5" /> */}
                </ul>
            </div>
        );
    }
    
}

export default LocationPage;
