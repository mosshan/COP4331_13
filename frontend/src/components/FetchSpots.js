import React, { useState } from 'react';
import Spot from './SpotElement';

function Spots() {
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

    const getSpots = async () => 
    {
        debugger;
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
            // spots.forEach(element => {
            //     spotDivs.push(<Spot rating={element.rating} name={element.name}/>);
            // });
            // spotDivs = spots.map((element) => {
            //     return <Spot rating={4} name={"test"}/>;
            // })
            console.log(spotDivs);
            console.log(localStorage);
            return spots;

        }
        catch(e)
        {
            alert(e.toString());
            return [];
        }    
    };


    localStorage.currentSpots = getSpots(localStorage.locationId);

}

export default Spots;
