// Homescreen.js
import React, { Component } from 'react';
import {StyleSheet, View, ImageBackground, Text, TouchableOpacity} from 'react-native';
import SignUpBackground from '../../assets/SignUpBack.png';




export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={SignUpBackground} style ={styles.image}>
          <Text style = {styles.top} >Welcome To Study Knights!</Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <TouchableOpacity
                           style={{
                             borderRadius: 40,
                             borderColor: '#FF000000',
                             borderWidth: 10,
                           }}
                           onPress={
                           () => {this.props.navigation.navigate('Map')}
                          }>
                           <Text style = {styles.text}>
                             View Map
                           </Text>
          </TouchableOpacity>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
        </ImageBackground>
      </View>

    );
  }
};

const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  text: {
    fontFamily: 'monospace',
    color: 'black',
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    padding: 10,
    fontWeight: "bold",
    backgroundColor: 'rgba(255, 201, 4, .9)',
    margin: 15,
  },
  top: {

    fontFamily: 'monospace',
    color: 'black',
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    padding: 12,
    fontWeight: "bold",
    backgroundColor: 'rgba(255, 201, 4, .9)'
  },
  

});
