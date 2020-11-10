// Mapscreen.js	
import React, { Component } from 'react';	
import {View, StyleSheet, Text , Dimensions, Image, TouchableOpacity} from 'react-native';	
import MapView, {Callout, Marker}  from "react-native-maps";	
import '../components/StudySpots';

export default class Map extends Component {	

  state = {
    mapHeight: Dimensions.get('window').height - 150,
    chosenMarker: -1,
    markers: [	
      {	
        key: 1,
        showRate:false,
        coordinate: {	
          latitude: 28.601957,	
          longitude: -81.200429,	
        },	
        title: "Student Union",	
      },	
      {	
        key: 2,
        showRate:false,
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
	

  showRating(index)
  {
    //call API to return all study Spots
    this.setState({
      chosenMarker: index,
      mapHeight: Dimensions.get('window').height - 300,
    });
    alert("chosen index is" + index);
  }

  closeRating()
  {
    //call API to return all study Spots
    this.setState({
      chosenMarker: -1,
      mapHeight: Dimensions.get('window').height - 150,
    });
    alert("chosen index is neg one");
  }



  render() {	
    return (
      <View style={styles.container}>
        <MapView	
          ref={map => this.map = map}	
          initialRegion={this.state.region}	
          style={{
            height: this.state.mapHeight,
            width: Dimensions.get('window').width,
          }}
          mapType='satellite'	
          maxZoomLevel={20}
          minZoomLevel={16}
        >	
          {this.state.markers.map((marker, index) => {	
            return (	
                 <Marker key={index} coordinate={marker.coordinate} title={marker.title}	
                  description={marker.description} onPress={() => {this.showRating(index)}} >	
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
        </MapView>	

        {this.state.chosenMarker > -1?
          [
            <View style = {styles.ratingContainer}>
              <View style = {styles.button}>
                <TouchableOpacity
                  onPress={() => {this.closeRating()}}>
                  <Text>  x  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.description}>  {this.state.markers[this.state.chosenMarker].title} Study Spots</Text>
              </View>
            </View>

          ]
        : 
        [
          <View style={styles.noneChosenContainer}>
              <TouchableOpacity
                onPress={() => {this.props.navigation.navigate('Login')}}>
                <Text style = {styles.button}>
                  Login
                </Text>
              </TouchableOpacity>

              <Text>   </Text>
              <TouchableOpacity
                onPress={() => {this.props.navigation.navigate('SignUp')}}>
                <Text style = {styles.button}>
                  Register
                </Text>
              </TouchableOpacity>
              <Text>   </Text>
              <Text style={styles.noneChosen} >Click on a Pin to View Study Spots</Text> 
          </View>
        ]}	

      </View>
 


    );	
  }	
};	


const styles = StyleSheet.create({	
  container: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 1.0)',
  },
  ratingContainer:
  {
    flexDirection:'row',
  },
  description: {	
    alignSelf:'center',
    fontSize: 12,	
    fontFamily: 'monospace',	
    padding: 5,	
    color: 'white',
  },	
  noneChosenContainer: {
    flexDirection:'row',
    padding: 10,
  },
  noneChosen: {
    flexShrink: 1,
    fontSize: 12,	
    fontFamily: 'monospace',
    color: 'white',
  },
  button: {
    fontFamily: 'monospace',
    textAlign: "center",
    fontSize: 12,
    padding: 3,
    fontWeight: "bold",
    backgroundColor: 'rgba(255, 201, 4, .9)'
  }
});
