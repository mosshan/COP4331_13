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

    render()
    {
        const { spot, userID, place } = this.props.route.params;
        //this.setInfo(spot, userID);
        const spotRoom = spot.room;
        return(
            <View style={styles.container}>
                <ImageBackground source={SignUpBackground} style ={styles.image}>
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
                                <Text style={styles.rating}>Current Rating: {Math.round((spot.spot_rating + Number.EPSILON) * 100) / 100}</Text>
                                <Rating imageSize={40} startingValue={spot.spot_rating} style={styles.rating} />
                                <Text></Text>
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
                                    <Rating imageSize={40} type='star' readonly startingValue={spot.spot_rating} style={styles.rating} />
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
        justifyContent: "center"
    },
    infoContainer:
    {
        backgroundColor: 'rgba(255, 201, 4, .9)',
        margin: 15,
    },
    ratingContainer:
    {
        backgroundColor: 'rgba(250, 250, 250, .9)',
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
    
      button: {
        fontFamily: 'monospace',
        textAlign: "center",
        fontSize: 12,
        padding: 10,
        fontWeight: "bold",
        backgroundColor: 'rgba(255, 201, 4, .9)'
      },
});
