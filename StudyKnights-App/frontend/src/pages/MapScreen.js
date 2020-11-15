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
          latitude: 28.603832,	
          longitude: -81.200563,	
        },	
        title: "Classroom Building 1",	
      },	
      {	
        key: 2,
        showRate:false,
        coordinate: {	
          latitude: 28.601514,	
          longitude: -81.200488,	
        },	
        title: "Classroom Building 2",	
      },
      {	
        key: 3,
        showRate:false,
        coordinate: {	
          latitude: 28.602960,	
          longitude: -81.198635,	
        },	
        title: "Health and Public Affairs",	
      },	
      {	
        key: 4,
        showRate:false,
        coordinate: {	
          latitude: 28.603139,	
          longitude: -81.198109,	
        },	
        title: "Health and Public Affairs 2",	
      },
      {	
        key: 5,
        showRate:false,
        coordinate: {	
          latitude: 28.604623,	
          longitude: -81.199517,	
        },	
        title: "Psychology",	
      },	
      {	
        key: 6,
        showRate:false,
        coordinate: {	
          latitude: 28.605286,	
          longitude: -81.199123,	
        },	
        title: "CSEL",	
      },
      {	
        key: 7,
        showRate:false,
        coordinate: {	
          latitude: 28.606059,	
          longitude: -81.198786,	
        },	
        title: "Alumni Center",	
      },
      {	
        key: 8,
        showRate:false,
        coordinate: {	
          latitude: 28.601437,	
          longitude: -81.198748,	
        },	
        title: "Engineering 1",	
      },	
      {	
        key: 9,
        showRate:false,
        coordinate: {	
          latitude: 28.602035,	
          longitude: -81.198459,	
        },	
        title: "Engineering 2",	
      },
      {	
        key: 10,
        showRate:false,
        coordinate: {	
          latitude: 28.601263,	
          longitude: -81.197172,	
        },	
        title: "CREOL",	
      },	
      {	
        key: 11,
        showRate:false,
        coordinate: {	
          latitude: 28.600552,	
          longitude: -81.197623,	
        },	
        title: "Harris Engineering Center",	
      },
      {	
        key: 12,
        showRate:false,
        coordinate: {	
          latitude: 28.600913,	
          longitude: -81.199347,	
        },	
        title: "Business Administration 1",	
      },
      {	
        key: 13,
        showRate:false,
        coordinate: {	
          latitude: 28.601199,	
          longitude: -81.199098,	
        },	
        title: "Businees Administration 2",	
      },
      {	
        key: 14,
        showRate:false,
        coordinate: {	
          latitude: 28.601957,	
          longitude: -81.200429,	
        },	
        title: "Student Union",	
      },		
      {	
        key: 15,
        showRate:false,
        coordinate: {	
          latitude: 28.601031,	
          longitude: -81.200280,	
        },	
        title: "College of Sciences",	
      },
      {	
        key: 16,
        showRate:false,
        coordinate: {	
          latitude: 28.600310,	
          longitude: -81.200393,	
        },	
        title: "Tech Commons 1",	
      },
      {	
        key: 17,
        showRate:false,
        coordinate: {	
          latitude: 28.600602,	
          longitude: -81.200350,	
        },	
        title: "Tech Commons 2",	
      },
      {	
        key: 18,
        showRate:false,
        coordinate: {	
          latitude: 28.599481,	
          longitude: -81.200500,	
        },	
        title: "Math and Science",	
      },
      {	
        key: 19,
        showRate:false,
        coordinate: {	
          latitude: 28.599976,	
          longitude: -81.199711,	
        },	
        title: "Chemistry",	
      },		
      {	
        key: 20,
        showRate:false,
        coordinate: {	
          latitude: 28.600405,	
          longitude: -81.199802,	
        },	
        title: "Theatre",	
      },
      {	
        key: 21,
        showRate:false,
        coordinate: {	
          latitude: 28.600161,	
          longitude: -81.198685,	
        },	
        title: "Biology",	
      },
      {	
        key: 22,
        showRate:false,
        coordinate: {	
          latitude: 28.599633,	
          longitude: -81.196685,	
        },	
        title: "Arboretum",	
      },
      {	
        key: 23,
        showRate:false,
        coordinate: {	
          latitude: 28.599256,	
          longitude: -81.199337,	
        },	
        title: "Health Center",	
      },
      {	
        key: 24,
        showRate:false,
        coordinate: {	
          latitude: 28.599418,	
          longitude: -81.198735,	
        },	
        title: "Psychological Services",	
      },		
      {	
        key: 25,
        showRate:false,
        coordinate: {	
          latitude: 28.599832,	
          longitude: -81.198038,	
        },	
        title: "Physical Sciences",	
      },
      {	
        key: 26,
        showRate:false,
        coordinate: {	
          latitude: 28.598718,	
          longitude: -81.198536,	
        },	
        title: "Libra Community Center",	
      },
      {	
        key: 27,
        showRate:false,
        coordinate: {	
          latitude: 28.597954,	
          longitude: -81.199658,	
        },	
        title: "Ferrell Commons",	
      },
      {	
        key: 28,
        showRate:false,
        coordinate: {	
          latitude: 28.601146,	
          longitude: -81.201676,	
        },	
        title: "John T. Washington Center",	
      },
      {	
        key: 29,
        showRate:false,
        coordinate: {	
          latitude: 28.600261,	
          longitude: -81.201537,	
        },	
        title: "Library",	
      },		
      {	
        key: 30,
        showRate:false,
        coordinate: {	
          latitude: 28.602330,	
          longitude: -81.202086,	
        },	
        title: "Burnett Honors College",
      },
      {	
        key: 31,
        showRate:false,
        coordinate: {	
          latitude: 28.601493,	
          longitude: -81.202108,	
        },	
        title: "Rehearsal Hall",	
      },
      {	
        key: 32,
        showRate:false,
        coordinate: {	
          latitude: 28.600274,	
          longitude: -81.202819,	
        },	
        title: "Howard Phillips Hall",	
      },
      {	
        key: 33,
        showRate:false,
        coordinate: {	
          latitude: 28.598970,	
          longitude: -81.202385,	
        },	
        title: "Millican Hall",	
      },
      {	
        key: 34,
        showRate:false,
        coordinate: {	
          latitude: 28.601228,	
          longitude: -81.202701,	
        },	
        title: "Trevor Colbourn Hall",	
      },		
      {	
        key: 35,
        showRate:false,
        coordinate: {	
          latitude: 28.599319,	
          longitude: -81.204075,	
        },	
        title: "Teaching Academy",	
      },
      {	
        key: 36,
        showRate:false,
        coordinate: {	
          latitude: 28.600019,	
          longitude: -81.204294,	
        },	
        title: "Education Department",	
      },
      {	
        key: 37,
        showRate:false,
        coordinate: {	
          latitude: 28.602544,	
          longitude: 81.204645,	
        },	
        title: "Performing Arts Center",	
      },
      {	
        key: 38,
        showRate:false,
        coordinate: {	
          latitude: 28.602786,	
          longitude: -81.203308,	
        },	
        title: "Visual Arts Building",	
      },
      {	
        key: 39,
        showRate:false,
        coordinate: {	
          latitude: 28.603726,	
          longitude: -81.203322,	
        },	
        title: "Nicholson School of Communication",	
      },		
      {	
        key: 40,
        showRate:false,
        coordinate: {	
          latitude: 28.604416,	
          longitude: -81.202541,	
        },	
        title: "Arts and Humanities",	
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
