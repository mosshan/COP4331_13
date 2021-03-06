import React, {Component} from 'react';
import {ImageBackground, StyleSheet, View, Text, TouchableOpacity, TextInput} from 'react-native';
import SignUpBackground from '../../assets/SignUpBack.png';

export default class SignUp extends Component
{
    // Holds current vals
    state = {
      email: '',
      password: '',
      passwordCheck: '',
      username: '',
      validEmail: false,
      validPassword: false,
      validUsername: false,
      validPasswordCheck: false,
      validConfirm: false,
      registrationStatus: false,
      message:'',
      errorText: '',
    }

    // set Entered Variables
    handleEmail = (text) => {
        this.setState({ email: text });
    }
    handlePassword = (text) => {
        this.setState({ password: text });
    }
    handlePasswordCheck = (text) => {
      this.setState({ passwordCheck: text });
    }

    handleUsername = (text) => {
      this.setState({ username: text });
    }

    setRegistrationStatus()
    {
      this.setState({ registrationStatus: true });
    }

    setMessage(text)
    {
      this.setState({ message: text });
    }

    // Validate entry (no blank fields), then use register api
    signup = (email, pass, user) => {

        this.validateInput();

        if(this.state.validPassword && this.state.validEmail && this.state.validUsername)
        {
          //alert('email: ' + email + ' password: ' + pass + ' username: ' + user );
          //Need to actually register now

          //Create Json object
          var obj = {userName: this.state.username, password: this.state.password, email: this.state.email};
          var js = JSON.stringify(obj);

          // Try Registering w API

          fetch('https://study-knights.herokuapp.com/api/register', {
            method:'POST',
            headers:{
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body:js,
          })
            .then(response => response.json())
            .then(responseJson =>
            {
              if(responseJson.error !== '')
              {
                this.setState({ errorText: 'Username is already taken.' });
              }
              else
              {
                //setRegistrationStatus(true);

                var objV = {username: this.state.username, email: this.state.email};
                var jsV = JSON.stringify(objV);

                fetch('https://study-knights.herokuapp.com/api/sendVerification', {
                     method:'POST',
                     headers:{
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                  },
                  body:jsV,
                    })
                  .then(responseV => responseV.json())
                  .then(responseVJson =>
                  {

                     if(responseVJson.error !== '')
                     {
                        this.setState({ errorText: 'Username or email not found.' });
                     }
                     else
                     {
                        this.setState({ errorText: 'Registration email sent.' });
                        this.props.navigation.navigate('Login');
                     }

                  })
                  .catch(error =>
                  {
                     console.error(error);
                  });
              }

            })
            .catch(error =>
            {
               console.error(error);
            });
        }
        else
        {
           this.setState({ errorText: 'Please fill out all fields.' });
        }
    }

    validateInput = () => {
      const emailCheckRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      this.state.validEmail = emailCheckRegex.test(this.state.email);
      this.state.validPassword = !(this.state.password === '');
      this.state.validPasswordCheck = (this.state.passwordCheck === this.state.password);
      this.state.validConfirm = !(this.state.passwordCheck === '');
      this.state.validUsername = !(this.state.username === '');

    };

    render()
    {

        return(
            <View style={styles.container}>
                <ImageBackground source={SignUpBackground} style ={styles.image}>
                {!this.state.registrationStatus?
                  <View>
                    <Text style={styles.text} ></Text>
                    <Text style={styles.text} >Sign Up</Text>
                    <Text style={styles.text} ></Text>

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

                    <TextInput style={styles.input}
                          secureTextEntry={true}
                          placeholderTextColor='white'
                          underlineColorAndroid='white'
                          placeholder="Confirm Password"
                          onChangeText = {this.handlePasswordCheck} />
            
                    <Text style={styles.invisText}>{this.state.errorText}</Text>

                    <View style = {styles.buttonContainer}>
                      <TouchableOpacity
                        style={{
                          borderRadius: 40,
                          borderColor: '#FF000000',
                          borderWidth: 10,
                        }}
                        onPress={
                        () => {this.signup(this.state.email, this.state.password, this.state.username, this.state.firstName, this.state.lastName)}
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
                        () => {this.props.navigation.navigate('Login')}
                      }>
                        <Text style = {styles.button}>
                          Login
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                    :
                  <View>
                    <Text> Butts</Text>
                  </View>
                }
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
    },
    invisText: {
      color : 'red',
      textAlign: 'center'
    }
  });
