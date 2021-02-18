import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export class LoadingScreen extends Component {
  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      this.props.navigation.replace('Home'); //use replace when dont want stock mean layers
    } else {
      this.props.navigation.replace('Login');
    }
  }
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
}

export default LoadingScreen;
