import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoadingScreen from './src/screens/LoadingScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();

// function App() {
//   return (
//     <>
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen
//             options={{headerShown: false}}
//             name="Login"
//             component={LoginScreen}
//           />
//           <Stack.Screen
//             options={{headerShown: false}}
//             name="Signup"
//             component={SignupScreen}
//           />
//           <Stack.Screen name="Home" component={HomeScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </>
//   );
// }
export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isloggedin: null,
    };
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      this.setState({isloggedin: true});
    } else {
      this.setState({isloggedin: false});
    }
  }

  render() {
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator>
            {/* {this.state.isloggedin == null ? (
              <Stack.Screen
                options={{headerShown: false}}
                name="Loading"
                component={LoadingScreen}
              />
            ) : this.state.isloggedin == true ? (
              <Stack.Screen name="Home" component={HomeScreen} />
            ) : (
              <>
                <Stack.Screen
                  options={{headerShown: false}}
                  name="Login"
                  component={LoginScreen}
                />
                <Stack.Screen
                  options={{headerShown: false}}
                  name="Signup"
                  component={SignupScreen}
                />
                <Stack.Screen name="Home" component={HomeScreen} />
              </>
            )} */}

            <Stack.Screen
              options={{headerShown: false}}
              name="Loading"
              component={LoadingScreen}
            />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              options={{headerShown: false}}
              name="Login"
              component={LoginScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="Signup"
              component={SignupScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}

export default App;
