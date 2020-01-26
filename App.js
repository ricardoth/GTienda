

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { createStackNavigator, TabNavigator, DrawerNavigator, createDrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Login from './components/Login/Login';
import DrawerRaiz from './components/Drawer/Drawer';

const Application = createStackNavigator({
  Home: {
    screen: Login
  },
  DrawerRaiz: {
    screen: DrawerRaiz,
    navigationOptions: ({navigation}) => ({
      headerLeft:<Text>    <Icon name="md-menu"
                          size={35} 
                          color="#FFF"
                          onPress={ () => navigation.navigate('DrawerOpen')}/>
                </Text>,
      headerStyle: {backgroundColor: '#283149'},
      headerTintColor: 'white',
      
  })
  }
    },{
      initialRouteName: 'Home',
      headerMode: 'none',
      header: null
});


 class App extends Component {
  //quita barra de navegacion
  static navigationOptions = { header: null }
  render() {
    return (
      <Application />
    );
  }
}

export default App;