
// App.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import SignUpScreen from './src/pages/SignUpScreen';
import LoginScreen from './src/pages/LoginScreen';
import HomeScreen from './src/pages/HomeScreen';

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    );
  }
} 

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});