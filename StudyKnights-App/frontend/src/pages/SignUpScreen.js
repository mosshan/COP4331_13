import React, {Component} from 'react';
import {ImageBackground, StyleSheet, View, Text, TouchableOpacity, TextInput} from 'react-native';
import SignUpBackground from '../../assets/SignUpBack.png';


export default class SignUp extends Component 
{
    state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      username: '',
      validEmail: false,
      validPassword: false,
      validUsername: false
    }

    handleEmail = (text) => {
        this.setState({ email: text })
    }
    handlePassword = (text) => {
        this.setState({ password: text })
    }
    handleUsername = (text) => {
      this.setState({ username: text })
    }
    handleFirstName = (text) => {
        this.setState({ firstName: text })
    }
    handleLastName = (text) => {
      this.setState({ lastName: text })
    }

    signup = (email, pass, user, first, last) => {
        this.validateInput();
        if(this.state.validPassword && this.state.validEmail && this.state.validUsername)
        {
          alert('email: ' + email + ' password: ' + pass + ' username: ' + user + ' firstName: ' + first + ' lastName:' + last);
          this.props.navigation.navigate('Login');
        }
        if(!this.state.validPassword)
        {
          alert('Please enter a password');
        }
        if(!this.state.validEmail)
        {
          alert('Please enter a valid email');
        }
        if(!this.state.validUsername)
        {
          alert('Please enter a username');
        }
    }

    validateInput = () => {
      const emailCheckRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      this.state.validEmail = emailCheckRegex.test(this.state.email);
      this.state.validPassword = !(this.state.password === '');
      this.state.validUsername = !(this.state.username === ''); 
    };

    render() 
    {
     
        return(
            <View style={styles.container}>
                <ImageBackground source={SignUpBackground} style ={styles.image}>
                  <Text style={styles.text} ></Text>
                  <Text style={styles.text} >Sign Up</Text>
                  <Text style={styles.text} ></Text>
                  
                  <TextInput style={styles.input} 
                        placeholderTextColor='white'
                        underlineColorAndroid='white' 
                        placeholder="First Name"
                        onChangeText = {this.handleFirstName} />

                  <TextInput style={styles.input} 
                        placeholderTextColor='white'
                        underlineColorAndroid='white' 
                        placeholder="Last Name"
                        onChangeText = {this.handleLastName} /> 

                  <TextInput style={styles.input} 
                        placeholderTextColor='white'
                        underlineColorAndroid='white' 
                        placeholder="Email"
                        onChangeText = {this.handleEmail} /> 
                        
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
                      onPress={
                      () => {this.signup(this.state.email, this.state.password, this.state.username, this.state.firstName, this.state.lastName)}
                     }>
                      <Text style = {styles.button}>
                        Register
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.text} ></Text>

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
      padding: 15,
      fontWeight: "bold",
      backgroundColor: 'rgba(255, 201, 4, .9)'
    }
  });