// MainNav
import React from 'react';
import { createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import SignUpScreen from '../pages/SignUpScreen';
import LoginScreen from '../pages/LoginScreen';
import MapScreen from '../pages/MapScreen';
import SpotScreen from '../pages/SpotScreen';
import ForgotPassword from '../pages/ForgotPassword';

const Stack = createStackNavigator();

function MainNavigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Map">
            <Stack.Screen name="Map" component={MapScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SpotPage" component={SpotScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
export default MainNavigation
