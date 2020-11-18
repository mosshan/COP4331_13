import React, {Component} from 'react';
import {ImageBackground, StyleSheet, View, Text, TouchableOpacity, TextInput} from 'react-native';
import SignUpBackground from 'C:\\Users\\domin\\Desktop\\code\\StudyKnights\\SignUpBack.png';


export default class NewPassowrd extends Component
{
    state =
    {
      newPassword: '',
      validPassword: false,
    }

    handlePassword = (text) =>
    {
      this.setState({ newPassword: text })
    }

    reset = () =>
    {
      this.validateInput();
      if(this.state.validPassword)
      {
         alert('noice');
      }
      else
      {
         alert('Please input your password.');
      }
   }

    validateInput = () =>
    {
      this.state.validPassword = !(this.state.newPassword === '');
    };

    render()
    {
        return(
            <View style={styles.container}>
                <ImageBackground source={SignUpBackground} style ={styles.image}>
                  <Text style={styles.text} ></Text>
                  <Text style={styles.text} >Password Reset</Text>
                  <Text style={styles.text} ></Text>

                  <TextInput style={styles.input}
                        placeholderTextColor='white'
                        underlineColorAndroid='white'
                        placeholder="New Password"
                        onChangeText = {this.handlePassword} />

                        <View style = {styles.buttonContainer}>
                         <TouchableOpacity
                           style={{
                             borderRadius: 40,
                             borderColor: '#FF000000',
                             borderWidth: 10,
                           }}
                           onPress={
                           () => {this.reset()}
                          }>
                           <Text style = {styles.button}>
                             Reset
                           </Text>
                         </TouchableOpacity>
                       </View>

                       <View style = {styles.buttonContainer}>
                         <TouchableOpacity
                           style={{
                             borderRadius: 40,
                             borderColor: '#FF000000',
                             borderWidth: 10,
                           }}
                           onPress={
                           () => {this.props.navigation.navigate('LoginScreen')}
                          }>
                           <Text style = {styles.button}>
                             Back
                           </Text>
                         </TouchableOpacity>
                       </View>

                </ImageBackground>
            </View>
        )
    }
};


const styles = StyleSheet.create({
    container: {
     flex: 1
    },
    buttonContainer: {
      alignItems: 'center'
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    text: {
      fontFamily: 'monospace',
      textAlignVertical: 'top',
      color: 'white',
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 30
    },
    input: {
      margin: 15,
      height: 40,
      fontSize: 15,
      fontFamily: 'monospace',
      padding: 10,
      color: 'white',
      backgroundColor: 'rgba(52, 52, 52, 0.6)'
    },
    button: {
      color: 'rgba(52, 52, 52, 1.0)',
      fontFamily: 'monospace',
      alignItems: 'center',
      textAlign: "center",
      fontSize: 15,
      width: 200,
      padding: 12,
      fontWeight: "bold",
      backgroundColor: 'rgba(255, 201, 4, .9)'
    }
  });
