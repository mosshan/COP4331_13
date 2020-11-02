// Homescreen.js
import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class Home extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        
        <Button
        title="Login"
        onPress={() => this.props.navigation.navigate('Login')}
        />

        <Button
        title="Register"
        onPress={() => this.props.navigation.navigate('SignUp')}
        />

      </View>
    )
  }
}