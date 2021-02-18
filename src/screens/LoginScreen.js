import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

export class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  sendCred = async () => {
    var data = {email: this.state.email, password: this.state.password};
    console.warn(data);
    // axios
    //   .post('https://10.0.2.2:3000/signup', {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     data,
    //   })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
    fetch(`http://localhost:3000/signin`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        try {
          await AsyncStorage.setItem('token', data.token);
          this.props.navigation.replace('Home');
        } catch (e) {
          console.log('error hai', e);
          Alert.alert(e);
        }
      });
  };
  render() {
    return (
      <KeyboardAvoidingView behavior="position">
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <Text
          style={{
            fontSize: 35,
            marginLeft: 18,
            marginTop: 10,
            color: '#1b1b1b',
          }}>
          Welcome to
        </Text>
        <Text style={{fontSize: 30, marginLeft: 18, color: 'blue'}}>
          Coders Never Quite
        </Text>
        <View
          style={{
            borderBottomColor: 'blue',
            borderBottomWidth: 4,
            marginTop: 4,
            marginLeft: 20,
            marginRight: 150,
          }}
        />
        <Text style={{fontSize: 20, marginLeft: 10, marginTop: 20}}>
          Login with email
        </Text>
        <TextInput
          style={{marginLeft: 18, marginRight: 18, marginTop: 18}}
          mode="outlined"
          label="email"
          theme={{colors: {primary: 'blue'}}}
          value={this.state.email}
          onChangeText={(text) => this.setState({email: text})}
        />
        <TextInput
          style={{marginLeft: 18, marginRight: 18, marginTop: 18}}
          mode="outlined"
          label="password"
          theme={{colors: {primary: 'blue'}}}
          value={this.state.password}
          onChangeText={(text) => this.setState({password: text})}
        />
        <Button
          style={{marginLeft: 18, marginRight: 18, marginTop: 18}}
          mode="contained"
          onPress={() => this.sendCred()}>
          Login
        </Button>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Signup')}>
          <Text
            style={{
              fontSize: 18,
              marginLeft: 10,
              marginTop: 20,
              alignSelf: 'center',
            }}>
            don't have an account?
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

export default LoginScreen;
