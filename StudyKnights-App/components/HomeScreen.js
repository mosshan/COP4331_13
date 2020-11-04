// Homescreen.js
import React, { Component } from 'react';
import {View, StyleSheet, Text , Dimensions, Image} from 'react-native';
import imageSource from '../assets/map.png';
import MapView, {Callout, Marker}  from "react-native-maps";

export default class Home extends Component {

  state = {
    showRating: false,
    markers: [
      {
        coordinate: {
          latitude: 28.601957,
          longitude: -81.200429,
        },
        title: "Student Union",
      },
      {
        coordinate: {
          latitude: 28.601514,
          longitude: -81.198803,
        },
        title: "Engineering 1",
      },
    ],
    region: {
      latitude: 28.602560,
      longitude: -81.200080,
      latitudeDelta: 0.007,
      longitudeDelta: 0.007,
    },
  };

  toggleStatus(marker){
    this.setState({
      showRating:true
    });
    alert('toggle button handler: '+ this.state.showRating);
  };

  render() {
    return (
        <MapView
          ref={map => this.map = map}
          initialRegion={this.state.region}
          style={styles.mapStyle}
          mapType='satellite'
        >
          {this.state.markers.map((marker, index) => {
            return (
                 <Marker key={index} coordinate={marker.coordinate} title={marker.title}
                  description={marker.description} onPress={() => {this.toggleStatus()}} >
                  <Callout
                      tooltip={true}
                    >
                      <Text style={styles.description} >
                        {marker.title}
                      </Text>
                  </Callout>
              </Marker>
            );
          })}
          {this.state.showRating &&
          <Text style={styles.description} >
              lol
          </Text>
          }
        </MapView>
    );
  }
};

const styles = StyleSheet.create({
  mapStyle: {
    flex: 1,
    flexDirection: 'column-reverse',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  description: {
    //margin: 15,
    fontSize: 15,
    fontFamily: 'monospace',
    padding: 5,
    color: 'white',
    backgroundColor: 'rgba(52, 52, 52, 1.0)'
  },
  rating: {
    //margin: 15,
    fontSize: 15,
    fontFamily: 'monospace',
    padding: 5,
    color: 'white',
    backgroundColor: 'rgba(52, 52, 52, 1.0)'
  },
});
