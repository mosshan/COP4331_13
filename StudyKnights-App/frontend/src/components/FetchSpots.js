// FetchSpots.js	
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';	
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

async function setAsyncSpots(spots){
  try {
    await AsyncStorage.setItem('currentSpots', JSON.stringify(spots))
    alert("success storing spots");
    return;
  } catch(e) {
    alert("error when storing spots");
    return;
  }
}; 

async function getMyPlaceIndex()
{
    try {
      return await AsyncStorage.getItem('@markerIndex');
    } catch(e) {
      // read error
    }
};

async function getSpots()
  {
    placeIndex = getMyPlaceIndex();

    var obj = {place_id: "5f8f113df6e1cb80236b14f5"}; //FIXME: when api call works correctly lol
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
                return null;
              });  
  }


function Spot () {

  return(
    <SafeAreaView style={styles.container}>
    <FlatList
    data={getSpots()}
    renderItem={({ item }) => (
      <ListItem
        title={item.room}
      />
    )}
    keyExtractor={item => item.spot_id}
    />

      </SafeAreaView>
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
