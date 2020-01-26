import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {DrawerNavigator, StackNavigator, TabNavigator} from 'react-navigation';
import CuentasScreen from './CuentasScreen';
import apiCuentas from '../Constantes/Constantes';


export default class EliminarCuentasScreen extends Component {
    constructor(props){
    super(props);

    }

    render(){
        return (
            <View> 
                <Text>HOLA </Text> 
            </View> 
        );
    }
}