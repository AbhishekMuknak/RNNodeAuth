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
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export class SignupScreen extends Component {
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
    fetch(`http://localhost:3000/signup`, {
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
          console.log(data.token);
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
          Create new account
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
          signup
        </Button>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')}>
          <Text
            style={{
              fontSize: 18,
              marginLeft: 10,
              marginTop: 20,
              alignSelf: 'center',
            }}>
            already have an account?
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

export default SignupScreen;

// import React, {useState} from 'react';
// import {Button, TextInput} from 'react-native-paper';
// import {
//   View,
//   Text,
//   StatusBar,
//   TouchableOpacity,
//   KeyboardAvoidingView,
// } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';

// const SignupScreen = (props) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const sendCred = async (props) => {
//     fetch('http://10.0.2.2:3000/signup', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email: email,
//         password: password,
//       }),
//     })
//       .then((res) => res.json())
//       .then(async (data) => {
//         try {
//           await AsyncStorage.setItem('token', data.token);
//           props.navigation.replace('home');
//         } catch (e) {
//           console.log('error hai', e);
//         }
//       });
//   };
//   return (
//     <>
//       <KeyboardAvoidingView behavior="position">
//         <StatusBar backgroundColor="blue" barStyle="light-content" />
//         <Text
//           style={{
//             fontSize: 35,
//             marginLeft: 18,
//             marginTop: 10,
//             color: '#3b3b3b',
//           }}>
//           welcome to
//         </Text>
//         <Text style={{fontSize: 30, marginLeft: 18, color: 'blue'}}>
//           Coders Never Quit
//         </Text>
//         <View
//           style={{
//             borderBottomColor: 'blue',
//             borderBottomWidth: 4,
//             borderRadius: 10,
//             marginLeft: 20,
//             marginRight: 150,
//             marginTop: 4,
//           }}
//         />
//         <Text
//           style={{
//             fontSize: 20,
//             marginLeft: 18,
//             marginTop: 20,
//           }}>
//           create new account
//         </Text>
//         <TextInput
//           label="Email"
//           mode="outlined"
//           value={email}
//           style={{marginLeft: 18, marginRight: 18, marginTop: 18}}
//           theme={{colors: {primary: 'blue'}}}
//           onChangeText={(text) => setEmail(text)}
//         />
//         <TextInput
//           label="password"
//           mode="outlined"
//           secureTextEntry={true}
//           value={password}
//           onChangeText={(text) => {
//             setPassword(text);
//           }}
//           style={{marginLeft: 18, marginRight: 18, marginTop: 18}}
//           theme={{colors: {primary: 'blue'}}}
//         />
//         <Button
//           mode="contained"
//           style={{marginLeft: 18, marginRight: 18, marginTop: 18}}
//           onPress={() => sendCred(props)}>
//           signup
//         </Button>
//         <TouchableOpacity>
//           <Text
//             style={{
//               fontSize: 18,
//               marginLeft: 18,
//               marginTop: 20,
//             }}
//             onPress={() => props.navigation.replace('login')}>
//             already have a account ?
//           </Text>
//         </TouchableOpacity>
//       </KeyboardAvoidingView>
//     </>
//   );
// };

// export default SignupScreen;
