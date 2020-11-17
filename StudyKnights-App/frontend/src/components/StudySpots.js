// Mapscreen.js	
import React, {Component} from 'react';
import {View, Text} from 'react-native';
//import { Rating } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';



setAsyncSpots = async (spots) => {
  try {
    await AsyncStorage.setItem('currentSpots', JSON.stringify(spots))
  } catch(e) {
    // save error
  }
} 

getMyPlaceIndex()
{
  try {
    return await AsyncStorage.getItem('@markerIndex');
  } catch(e) {
    // read error
  }
};

export default class Spot extends Component {

    placeIndex = getMyPlaceIndex();
    getSpots()
    {

        var obj = {place_id: placeIndex};
        var js = JSON.stringify(obj);
    
        fetch('https://study-knights.herokuapp.com/api/fetchSpots', {
                method:'POST',
                headers:{
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body:js,
              })
                .then(response => response.json())
                .then(res => {
                  alert(res);
                  if (res.results.length <= 0)
                  {
                      return null;
                  }
                  // map
                  let spots = [];
                  res.results.forEach(element => {
                      spots.push(element);
                  });
                  setAsyncSpots(spots);
                  return spots;
                })
                .catch(error => 
                  {
                    alert(error.toString());
                    return (null);
                  });   
    }
   
}
