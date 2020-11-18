// FetchSpots.js	
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';	
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

async function setAsyncSpots(spots){
  try {
    await AsyncStorage.setItem('currentSpots', JSON.stringify(spots))
    //alert("success storing spots" + JSON.stringify(spots));
    return;
  } catch(e) {
    //alert("error when storing spots");
    return;
  }
}; 

async function getMyPlaceIndex()
{
    try {
      return await AsyncStorage.getItem('@markerIndex');
    } catch(e) {
      // read error
      console.error('ERROR: no place chosen: ', error);
      return -1;
    }
};

async function getSpots()
  {
    var placeIndex = getMyPlaceIndex();

    var obj = {place_id: 0}; //FIXME: when api call works correctly lol
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
              if (res.results.length <= 0)
              {
                //alert("no spots returned");
                return null;
              }
              // map
              let spots = [];
              res.results.forEach(element => {
                  spots.push(element);
              });
              setAsyncSpots(spots);
              alert("spots room" + spots[0].room)
              return spots;
            })
            .catch(error => 
              {
                //alert(error.toString());
                return null;
              });  
  }
/*<FlatList
    data={getSpots()}
    renderItem={({ item }) => (
        <ListItem>
            title={item.room} 
            rating={item.spot_rating}
        </ListItem>
        <Text>{item[0].room}</Text>
    )}
    keyExtractor={(item, index) => index}
    />*/

function Spot () {

  let spotList =  []
  spotList = getSpots();
  
  alert("help me" + spotList[0].room);

  
  return(
      <Text>{spotList.room}</Text>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: 'rgba(255, 201, 4, .9)',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Spot;
