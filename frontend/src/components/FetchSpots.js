import React, { useState } from 'react';

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

    const getSpots = async (props) => 
    {
        var obj = {place_id: props.id};
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
            return spots;
        }
        catch(e)
        {
            // alert(e.toString());
            return (null);
        }    
    };


    localStorage.currentSpots = getSpots(localStorage.locationId);

}

export default Spots;
