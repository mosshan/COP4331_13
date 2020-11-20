import React, {Component} from 'react';
import {ImageBackground, StyleSheet, View, Text, TouchableOpacity, TextInput} from 'react-native';
import SignUpBackground from 'C:\\Users\\domin\\Desktop\\code\\StudyKnights\\SignUpBack.png';


export default class LoginScreen extends Component
{
    state =
    {
      username: '',
      password: '',
      validUsername: false,
      validPassword: false,
    }

    handleUsername = (text) =>
    {
      this.setState({ username: text })
    }
    handlePassword = (text) =>
    {
        this.setState({ password: text })
    }

    validateInput = () =>
    {
      this.state.validUsername = !(this.state.username === '');
      this.state.validPassword = !(this.state.password === '');
    };

    login = () =>
    {
           this.validateInput();
           if(this.state.validPassword && this.state.validUsername)
           {
             var obj = {login: this.state.username, password: this.state.password};
             var js = JSON.stringify(obj);

             fetch('https://study-knights.herokuapp.com/api/login', {
               method:'POST',
               headers:{
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                       },
               body:js,
             })
             .then(response => response.json())
             .then(responseJSON => {
             alert(responseJSON.id);

             if(responseJSON.id <= 0)
             {
              alert('Invalid username and password combination.');
             }
             else
             {
               //this.props.navigation.navigate('Home');
               alert('else');
             }

          })
          .catch(error =>
             {
              console.error(error);
             });
           }
           else if(!this.state.validUsername && !this.state.validPassword)
           {
             alert('Please enter a username and password');
           }
           else if(!this.state.validPassword)
           {
             alert('Please enter a password');
           }
           else if(!this.state.validUsername)
           {
             alert('Please enter a username');
           }
       }

    render()
    {
        return(
            <View style={styles.container}>
                <ImageBackground source={SignUpBackground} style ={styles.image}>
                  <Text style={styles.text} ></Text>
                  <Text style={styles.text} >Login</Text>
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
                        placeholder="Password"
                        onChangeText = {this.handlePassword} />

                        <View style = {styles.buttonContainer}>
                         <TouchableOpacity
                           style={{
                             borderRadius: 40,
                             borderColor: '#FF000000',
                             borderWidth: 10,
                           }}
                           onPress={
                           () => {this.login()}
                          }>
                           <Text style = {styles.button}>
                             Login
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
                           () => {this.props.navigation.navigate('SignUpScreen')}
                          }>
                           <Text style = {styles.button}>
                             Register
                           </Text>
                         </TouchableOpacity>
                       </View>

                       <View style = {styles.buttonContainer}>
                         <TouchableOpacity
                           style={{
                             borderRadius: 40,
                             borderColor: '#FF000000',
                             borderWidth: 1,
                           }}
                           onPress={
                           () => {this.props.navigation.navigate('ForgotPassword')}
                          }>
                           <Text style = {styles.button}>
                             Forgot Password
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
