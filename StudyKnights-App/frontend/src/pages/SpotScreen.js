import React, {Component} from 'react';
import {ImageBackground, StyleSheet, View, Text, TouchableOpacity, TextInput} from 'react-native';
import SignUpBackground from '../../assets/SignUpBack.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating, AirbnbRating } from 'react-native-ratings';


export default class SpotScreen extends Component 
{
    constructor(props)
    {
        super(props);
    }

    state = {
        uID: -1,
        spotInfo: {_id:"-1", spot_id:"-1", room: "-1", numRatings: -1, spot_rating: -1, place_id:-1},	
        rating: 0,
        ratingComplete: false,
        responseSubmitted: false,
        avgRating: -1,
    }

    async loadUserID()
   {
      try
      {
         const value = await AsyncStorage.getItem('token');

         if (value !== null)
         {
            this.setState({ userID: value });
         }
         else
         {
            this.setState({userID: -1});
         }
      }
      catch(e)
      {
         console.log(e);
      }
   }

   setInfo(spot, userID)
   {
       if(userID !== null)
       {
        this.setState({uID: userID, 
            spotInfo: spot});
       }
       else{
        this.setState({ spotInfo: spot});
       }
    
   }
   ratingCompleted( rating, spot, userID ) {
       this.setState({rating: rating,
                     ratingComplete: true,
                     spotInfo: spot, 
                    uID: userID});
  };

  async rate()
  {
    var obj = {spot_id: this.state.spotInfo._id, user_id: this.state.uID, rating: this.state.rating};
    var js = JSON.stringify(obj);

             fetch('https://study-knights.herokuapp.com/api/rate', {
               method:'POST',
               headers:{
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                       },
               body:js,
             })
             .then(response => response.json())
             .then(responseJ => {
                 if(responseJ.error !== ''){
                    console.error(error);
                 }
                 else{
                     this.setState({responseSubmitted: true,
                                    avgRating: responseJ.average,
                    });


                 }
              })
              .catch(error =>
                {
                 console.error(error);
                });
    }
  

    render()
    {
        const { spot, userID, place } = this.props.route.params;
        //this.setInfo(spot, userID);
        const uID = userID.userID;
        const spotRoom = spot.room;
        return(
            <View style={styles.container}>
                <ImageBackground source={SignUpBackground} style ={styles.image}>
                    <TouchableOpacity
                        onPress={
                            () => {this.props.navigation.navigate('Map', {userID: this.state.uID} )}}>
                        <Text style = {styles.back}>
                            Back to Map
                        </Text>
                    </TouchableOpacity>
                    <View style ={styles.center}>
                    {(userID !== -1)?
                        [//User is logged in, allow rating
                            <View>
                            <View style={styles.infoContainer}>
                                <Text style={styles.header}>
                                    {place}
                                </Text>
                                <Text style={styles.header}>Study Spot {spotRoom}</Text>
                            </View>
                            <View style={styles.infoContainer}>
                                <Text></Text>
                                {this.state.avgRating > 0?
                                    [
                                        <View>
                                            <Text style={styles.rating}>Current Average Rating: {Math.round((this.state.avgRating + Number.EPSILON) * 100) / 100}</Text>
                                            <Text style={styles.rating} >Your Rating: {Math.round((this.state.rating + Number.EPSILON) * 100) / 100}</Text>
                                        </View>
                                    ]
                                    :
                                    [   <View>
                                            <Text style={styles.rating}>Current Average Rating: {Math.round((spot.spot_rating + Number.EPSILON) * 100) / 100}</Text>
                                            <Text>   </Text>
                                        </View>
                                    ]
                                }
                                <Rating imageSize={40} startingValue={spot.spot_rating} style={styles.rating} fractions={2} onFinishRating={rating => this.ratingCompleted(rating, spot, uID)}/>
                                <Text></Text>
                                <Text>   </Text>
                                {this.state.ratingComplete && !this.state.responseSubmitted?
                                [   <View>
                                        <TouchableOpacity
                                            onPress={() => {this.rate()}}>
                                            <Text style = {styles.button}>
                                                Submit/Update Your Rating
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                ]
                                :
                                [   
                                ]
                                }
                                {this.state.responseSubmitted?
                                [
                                    <View>
                                    <TouchableOpacity
                                        onPress={() => {this.rate() }}>
                                        <Text style = {styles.button}>
                                            Update Your Rating
                                        </Text>
                                    </TouchableOpacity>
                                    <Text style = {styles.seperate}>                           </Text>
                                  
                                        <Text style = {styles.button}>Rating submitted!</Text>
                                    </View>
                                ]
                                :
                                [   
                                ]
                                }
                            </View>
                            </View>
                            ]
                    :
                        [//User isnt logged in, no rating for u
                            <View>
                                <View style={styles.infoContainer}>
                                    <Text style={styles.header}>
                                        {place}
                                    </Text>
                                    <Text style={styles.header}>Study Spot {spotRoom}</Text>
                                </View>
                                <View style={styles.ratingContainer}>
                                    <Text></Text>
                                    <Text style={styles.rating}>Current Rating: {Math.round((spot.spot_rating + Number.EPSILON) * 100) / 100}</Text>
                                    <Rating imageSize={40} type='star' readonly startingValue={spot.spot_rating} style={styles.rating} fractions={2}/>
                                    <Text></Text>
                                    
                                    <TouchableOpacity
                                    onPress={() => {this.props.navigation.navigate('Login')}}>
                                    <Text style = {styles.button}>
                                        Login to Rate
                                    </Text>
                                </TouchableOpacity>
                                </View>
                            </View>
                        ]
                    }
                    </View>
                </ImageBackground> 
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1
       },
    image: {
        flex: 1,
        resizeMode: "cover",
        //justifyContent: "center"
    },
    center: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    infoContainer:
    {
        backgroundColor: 'rgba(255, 201, 4, .9)',
        margin: 15,
    },
    ratingContainer:
    {
        backgroundColor: 'white',
        margin: 15,
    },
    header: {
        fontFamily: 'monospace',
        textAlignVertical: 'top',
        color: 'black',
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18
      },
     rating: {
        fontFamily: 'monospace',
        textAlignVertical: 'top',
        color: 'black',
        textAlign: "center",
        fontSize: 15
      },
     seperate:
     {
        padding: 10,
        fontWeight: "bold",
        backgroundColor: 'black'
     },
    
      button: {
        fontFamily: 'monospace',
        textAlign: "center",
        fontSize: 12,
        padding: 10,
        fontWeight: "bold",
        backgroundColor: 'rgba(255, 201, 4, .9)'
      },
        back: {
        fontFamily: 'monospace',
        textAlign: "left",
        fontSize: 12,
        padding: 10,
        fontWeight: "bold",
        backgroundColor: 'rgba(255, 201, 4, .9)'
      },
});
