import React, {Component} from 'react';
import {ImageBackground, StyleSheet, Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import SignUpBackground from '../assets/SignUpBack.png';

export default class SignUp extends Component 
{
    render() 
    {
        return(
            <View style={styles.container}>
                <ImageBackground source={SignUpBackground} style ={styles.image}>
                <Text style={styles.text} >Sign Up</Text>
                    <Button
                    title="Register Account"
                    //onPress={() => this.props.navigation.navigate('Login')}
                    />
                </ImageBackground>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      //justifyContent: 'center'
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    text: {
      color: '#FFC904',
      textAlign: "center",
      fontSize: 30,
      fontWeight: "bold",
      justifyContent:"center",
      backgroundColor: 'rgba(52, 52, 52, 0.8)'
    }
  });