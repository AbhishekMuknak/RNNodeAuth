import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

export class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      email: '',
      password: '',
    };
  }

  Boiler = async () => {
    const token = await AsyncStorage.getItem('token');
    fetch('http://localhost:3000/', {
      headers: new Headers({
        Authorization: 'Bearer ' + token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({email: data.email});
      });
  };

  componentDidMount() {
    this.Boiler();
  }

  logout = () => {
    AsyncStorage.removeItem('token').then(() => {
      this.props.navigation.replace('Login');
    });
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Welcome to {this.state.email}</Text>
        <Button
          style={{marginLeft: 18, marginRight: 18, marginTop: 18}}
          mode="contained"
          onPress={() => this.logout()}>
          logout
        </Button>
      </View>
    );
  }
}

export default HomeScreen;
