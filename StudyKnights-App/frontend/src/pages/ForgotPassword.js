import React, {Component} from 'react';
import {ImageBackground, StyleSheet, View, Text, TouchableOpacity, TextInput} from 'react-native';
import SignUpBackground from 'C:\\Users\\domin\\Desktop\\code\\StudyKnights\\SignUpBack.png';


export default class ForgotPassword extends Component
{
    state =
    {
      username: '',
      email: '',
      validUsername: false,
      validEmail: false,
    }

    handleUsername = (text) =>
    {
      this.setState({ username: text })
    }
    handleEmail = (text) =>
    {
        this.setState({ email: text })
    }

    reset = () =>
    {
      this.validateInput();
      if(this.state.validEmail && this.state.validUsername)
      {
         var obj = {username: this.state.username, email: this.state.email};
         var js = JSON.stringify(obj);

         fetch('https://study-knights.herokuapp.com/api/requestReset', {
           method:'POST',
           headers:{
              Accept: 'application/json',
              'Content-Type': 'application/json',
                   },
           body:js,
         })
         .then(response => response.json())
         .then(responseJSON =>
         {

         if(responseJSON.error == 'username or email not found')
         {
            alert('Invalid username and email combination.');
         }
         else
         {
           alert('A password reset email has been sent.');
           this.props.navigation.navigate('Login');
         }

      })
      .catch(error =>
         {
          console.error(error);
         });
      }
      else if (!this.state.validEmail && !this.state.validUsername)
      {
         alert('Please input your username and email.');
      }
      else if(!this.state.validEmail)
      {
         alert('Please input your email.');
      }
      else if (!this.state.validUsername)
      {
         alert('Please input your username.');
      }
   }

    validateInput = () =>
    {
      this.state.validUsername = !(this.state.username === '');
      this.state.validEmail = !(this.state.email === '');
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
                        placeholder="Username"
                        onChangeText = {this.handleUsername} />

                  <TextInput style={styles.input}
                        secureTextEntry={true}
                        placeholderTextColor='white'
                        underlineColorAndroid='white'
                        placeholder="Email"
                        onChangeText = {this.handleEmail} />

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
                             Send
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
