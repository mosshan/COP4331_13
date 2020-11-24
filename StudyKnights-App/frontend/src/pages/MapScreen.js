// Mapscreen.js	
import React, { Component } from 'react';	
import {View, StyleSheet, Text , Dimensions, TouchableOpacity, TouchableWithoutFeedback, FlatList} from 'react-native';	
import MapView, {Callout, Marker}  from "react-native-maps";	



export default class Map extends Component {	
  _isMounted = false;
  constructor(props)
    {
        super(props);
    }

  state = {
    mapHeight: Dimensions.get('window').height - 150,
    chosenMarker: -1,
    markers: [		
      {	
        key: 0,
        coordinate: {	
          latitude: 28.603832,	
          longitude: -81.200563,	
        },	
        title: "Classroom Building 1",	
      },	
      {	
        key: 1,
        coordinate: {	
          latitude: 28.601514,	
          longitude: -81.200488,	
        },	
        title: "Classroom Building 2",	
      },
      {	
        key: 2,
        coordinate: {	
          latitude: 28.602960,	
          longitude: -81.198635,	
        },	
        title: "Health and Public Affairs",	
      },	
      {	
        key: 3,
        coordinate: {	
          latitude: 28.603139,	
          longitude: -81.198109,	
        },	
        title: "Health and Public Affairs 2",	
      },
      {	
        key: 4,
        coordinate: {	
          latitude: 28.604623,	
          longitude: -81.199517,	
        },	
        title: "Psychology",	
      },	
      {	
        key: 5,
        coordinate: {	
          latitude: 28.605286,	
          longitude: -81.199123,	
        },	
        title: "CSEL",	
      },
      {	
        key: 6,
        coordinate: {	
          latitude: 28.606059,	
          longitude: -81.198786,	
        },	
        title: "Alumni Center",	
      },
      {	
        key: 7,
        coordinate: {	
          latitude: 28.601437,	
          longitude: -81.198748,	
        },	
        _id :"5fac7bca84eac1852c28c04e",
        title: "Engineering 1",	
      },	
      {	
        key: 8,
        coordinate: {	
          latitude: 28.602035,	
          longitude: -81.198459,	
        },
        _id: "5fac7bea84eac1852c28c04f",
        title: "Engineering 2",	
      },
      {	
        key: 9,
        coordinate: {	
          latitude: 28.601263,	
          longitude: -81.197172,	
        },	
        title: "CREOL",	
      },	
      {	
        key: 10,
        coordinate: {	
          latitude: 28.600552,	
          longitude: -81.197623,	
        },	
        title: "Harris Engineering Center",	
      },
      {	
        key: 11,
        coordinate: {	
          latitude: 28.600913,	
          longitude: -81.199347,	
        },	
        title: "Business Administration 1",	
      },
      {	
        key: 12,
        coordinate: {	
          latitude: 28.601199,	
          longitude: -81.199098,	
        },	
        title: "Businees Administration 2",	
      },
      {	
        key: 13,
        coordinate: {	
          latitude: 28.601957,	
          longitude: -81.200429,	
        },	
        title: "Student Union",	
      },		
      {	
        key: 14,
        coordinate: {	
          latitude: 28.601031,	
          longitude: -81.200280,	
        },	
        title: "College of Sciences",	
      },
      {	
        key: 15,
        coordinate: {	
          latitude: 28.600310,	
          longitude: -81.200393,	
        },	
        title: "Tech Commons 1",	
      },
      {	
        key: 16,
        coordinate: {	
          latitude: 28.600602,	
          longitude: -81.200350,	
        },	
        title: "Tech Commons 2",	
      },
      {	
        key: 17,
        coordinate: {	
          latitude: 28.599481,	
          longitude: -81.200500,	
        },	
        title: "Math and Science",	
      },
      {	
        key: 18,
        coordinate: {	
          latitude: 28.599976,	
          longitude: -81.199711,	
        },	
        title: "Chemistry",	
      },		
      {	
        key: 19,
        coordinate: {	
          latitude: 28.600405,	
          longitude: -81.199802,	
        },	
        title: "Theatre",	
      },
      {	
        key: 20,
        coordinate: {	
          latitude: 28.600161,	
          longitude: -81.198685,	
        },	
        title: "Biology",	
      },
      {	
        key: 21,
        coordinate: {	
          latitude: 28.599633,	
          longitude: -81.196685,	
        },	
        title: "Arboretum",	
      },
      {	
        key: 22,
        coordinate: {	
          latitude: 28.599256,	
          longitude: -81.199337,	
        },	
        title: "Health Center",	
      },
      {	
        key: 23,
        coordinate: {	
          latitude: 28.599418,	
          longitude: -81.198735,	
        },	
        title: "Psychological Services",	
      },		
      {	
        key: 24,
        coordinate: {	
          latitude: 28.599832,	
          longitude: -81.198038,	
        },	
        title: "Physical Sciences",	
      },
      {	
        key: 25,
        coordinate: {	
          latitude: 28.598718,	
          longitude: -81.198536,	
        },	
        title: "Libra Community Center",	
      },
      {	
        key: 26,
        coordinate: {	
          latitude: 28.597954,	
          longitude: -81.199658,	
        },	
        title: "Ferrell Commons",	
      },
      {	
        key: 27,
        coordinate: {	
          latitude: 28.601146,	
          longitude: -81.201676,	
        },	
        title: "John T. Washington Center",	
      },
      {	
        key: 28,
        coordinate: {	
          latitude: 28.600261,	
          longitude: -81.201537,	
        },	
        title: "Library",	
      },		
      {	
        key: 29,
        coordinate: {	
          latitude: 28.602330,	
          longitude: -81.202086,	
        },	
        title: "Burnett Honors College",
      },
      {	
        key: 30,
        coordinate: {	
          latitude: 28.601493,	
          longitude: -81.202108,	
        },	
        title: "Rehearsal Hall",	
      },
      {	
        key: 31,
        coordinate: {	
          latitude: 28.600274,	
          longitude: -81.202819,	
        },	
        title: "Howard Phillips Hall",	
      },
      {	
        key: 32,
        coordinate: {	
          latitude: 28.598970,	
          longitude: -81.202385,	
        },	
        title: "Millican Hall",	
      },
      {	
        key: 33,
        coordinate: {	
          latitude: 28.601228,	
          longitude: -81.202701,	
        },	
        title: "Trevor Colbourn Hall",	
      },		
      {	
        key: 34,
        coordinate: {	
          latitude: 28.599319,	
          longitude: -81.204075,	
        },	
        title: "Teaching Academy",	
      },
      {	
        key: 35,
        coordinate: {	
          latitude: 28.600019,	
          longitude: -81.204294,	
        },	
        title: "Education Department",	
      },
      {	
        key: 36,
        coordinate: {	
          latitude: 28.602544,	
          longitude: 81.204645,	
        },	
        title: "Performing Arts Center",	
      },
      {	
        key: 37,
        coordinate: {	
          latitude: 28.602786,	
          longitude: -81.203308,	
        },	
        title: "Visual Arts Building",	
      },
      {	
        key: 38,
        coordinate: {	
          latitude: 28.603726,	
          longitude: -81.203322,	
        },	
        title: "Nicholson School of Communication",	
      },		
      {	
        key: 39,
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
    spotList: [{_id:"-1", spot_id:"-1", room: "-1", numRatings: -1, spot_rating: -1, place_id:-1}],	
    noSpots:true,
    loading:true,
  };	
  
  
  async setSpots(index)
    {
      this._isMounted = true;
      var obj = {place_id: index}; 
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
                  this.setState({ noSpots: true,
                                  loading:false,});
                  return null;
                }
                let spots = [];
                res.results.forEach(element => {
                    spots.push(element);
                });

                  this.setState({spotList: spots,
                                  noSpots: false,
                                  loading:false,});
                if(!this.state.loading)
                {return spots;
                }
              })
              .catch(error => 
                {
                  console.error('ERROR when fetching spots: ', error);
                  return null;
                });  
    }

  showRating(index)
  {
    //call API to return all study Spots
    this.setState({
      chosenMarker: index,
      mapHeight: Dimensions.get('window').height - 300,
    });

  this.setSpots(index);
  
  }

  closeRating()
  {
    //call API to return all study Spots
    this.setState({
      chosenMarker: -1,
      mapHeight: Dimensions.get('window').height - 150,
      noSpots: true,
      loading:true,
    });

  }

  async navigateToSpot(item, uID, placeTitle)
  {
    this.props.navigation.navigate('SpotPage', {spot: item, userID: uID, place: placeTitle } );
  }


  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 10,
          backgroundColor: "rgba(52, 52, 52, 1.0)",
        }}
      />
    );
  }

  UserLoggedIn = () => {
    return (
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
                <Text></Text>
                <Text style={styles.noneChosen} >Click on a Pin to View Study Spots</Text> 
      </View>
    )
  }

  NoMarkerChosen(uID)
  {
    return(
      <View>
          {(uID < 0 )?
            [ this.UserLoggedIn()
              ]
            :
            [
              <View>
                 <Text style={styles.noneChosen} >Click on a Pin to View Study Spot</Text> 
              </View>
            ]
          }
      </View>
    )
  }

  markerChosen(uID)
  {
    return(
      <View>
          <View style = {styles.ratingContainer}>

            <View style = {styles.button}>
              <TouchableOpacity
                onPress={() => {this.closeRating()}}>
                <Text> x </Text>
              </TouchableOpacity>
            </View>

            <View>
              <Text style={styles.description}>{this.state.markers[this.state.chosenMarker].title} Study Spots</Text>
            </View>

          </View>

        {this.state.loading?
          [
            <View>
              <Text style = {styles.item}>Loading</Text>
            </View>
          ]
          :
          [<View>
            {!this.state.loading && !this.state.noSpots ?
              [
              <View>
                <Text style={styles.info}> Click a Spot to View Rating</Text>  
              <View style = {styles.item}> 
                <FlatList
                  data={this.state.spotList}
                  renderItem={({ item }) => (
                      <TouchableWithoutFeedback onPress={ () => this.navigateToSpot(item, uID, this.state.markers[this.state.chosenMarker].title)}>
                        <Text style={styles.spotRoom}>{item.room}</Text>
                      </TouchableWithoutFeedback>
                    )}
                  contentContainerStyle={{ paddingBottom: 550}}
                  ItemSeparatorComponent = { this.FlatListItemSeparator }
                  keyExtractor={(item) => item.spot_id.toString()}
                /> 
                <Text style = {styles.bottomSpace}> </Text>
                <Text>  </Text>
              </View> 
              </View>
              ]
              :
              [
                <View style = {styles.item}>
                    <Text style={styles.spotRoom}>No Spots</Text>
                </View> 
              ]
            }
          </View>
          ]
        }
      </View>
    )
  }

  render() {	
    let uID;
    if(this.props.route.params === undefined )
    {
      uID = -1;
    }
    else{
      uID = this.props.route.params;
    }
   
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
                  <Callout	key={209}
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
        {(this.state.chosenMarker > -1 )?
          [ 
            <View key={432}>
                  <View style = {styles.ratingContainer}>

                    <View style = {styles.button}>
                      <TouchableOpacity
                        onPress={() => {this.closeRating()}}>
                        <Text> x </Text>
                      </TouchableOpacity>
                    </View>

                    <View>
                      <Text style={styles.description}>{this.state.markers[this.state.chosenMarker].title} Study Spots</Text>
                    </View>

                  </View>

                {this.state.loading?
                  [
                    <View key={0}>
                      <Text style = {styles.item}>Loading</Text>
                    </View>
                  ]
                  :
                  [<View key={1}>
                    {!this.state.loading && !this.state.noSpots ?
                      [
                      <View key={0}>
                        <Text style={styles.info}> Click a Spot to View Rating</Text>  
                      <View style = {styles.item}> 
                        <FlatList
                          data={this.state.spotList}
                          renderItem={({ item }) => (
                              <TouchableWithoutFeedback onPress={ () => this.navigateToSpot(item, uID, this.state.markers[this.state.chosenMarker].title)}>
                                <Text style={styles.spotRoom}>{item.room}</Text>
                              </TouchableWithoutFeedback>
                            )}
                          contentContainerStyle={{ paddingBottom: 550}}
                          ItemSeparatorComponent = { this.FlatListItemSeparator }
                          keyExtractor={item => item.room.toString()}
                        /> 
                        <Text style = {styles.bottomSpace}> </Text>
                        <Text>  </Text>
                      </View> 
                      </View>
                      ]
                      :
                      [
                        <View style = {styles.item} key={1}>
                            <Text style={styles.spotRoom}>No Spots</Text>
                        </View> 
                      ]
                    }
                  </View>
                  ]
                }
              </View>
          ]
        : 
        [
          <View key={430}>
              {(uID < 0 )?
                [ <View style={styles.noneChosenContainer} key={1}>
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
                      <Text></Text>
                      <Text style={styles.noneChosen} >Click on a Pin to View Study Spots</Text> 
                  </View>
                  ]
                :
                [
                  <View key={2} style={styles.noneChosenContainer}>
                    <TouchableOpacity
                        onPress={() => {this.props.navigation.navigate('Home')}}>
                        <Text style = {styles.button}>
                          Logout
                        </Text>
                      </TouchableOpacity>
                    <Text style={styles.noneChosen} >Click on a Pin to View Study Spots</Text> 
                  </View>
                ]
              }
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
    fontSize: 13,	
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
  },
  item: {
    backgroundColor: 'rgba(255, 201, 4, .9)',
    marginVertical: 20,
    marginHorizontal: 16,
    fontSize: 25,	
    fontFamily: 'monospace',
    color: 'white',
  },
  spotRoom: {	
    alignSelf:'center',
    fontSize: 18,	
    fontFamily: 'monospace',	
    color: 'rgba(52, 52, 52, 1.0)',
  },
  bottomSpace:
  {
    padding: 1,
    fontSize: 1,
    color: 'rgba(0, 0, 0, 0)'
  },
  info:
  {
    fontSize: 10,	
    fontFamily: 'monospace',
    color: 'white',
    alignSelf:'center',
  }
});
