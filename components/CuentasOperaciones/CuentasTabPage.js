import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {DrawerNavigator, StackNavigator, TabNavigator} from 'react-navigation';
import CrearCuentasScreen from './CrearCuentasScreen';
import ListarCuentasScreen from './ListarCuentasScreen';
import EliminarCuentasScreen from './EliminarCuentasScreen';

export default class CuentasTabPage extends Component {
    render(){
        //Pestaña que contiene las tres operaciones
        const MainTab = TabNavigator({
            //Pestaña crear Cuentas
            CrearCuentas: {
                //Llama al componente 
                screen: CrearCuentasScreen,
                navigationOptions: ({navigation}) => ({
                    tabBarLabel: 'Crear',
                    headerStyle: {backgroundColor: '#283149'},
                    headerTintColor: 'white'
                })
            },
            //Pestaña listar Cuentas
            ListarCuentas: {
                //Llama al componente
                screen: ListarCuentasScreen,
                navigationOptions: ({navigation}) => ({
                    tabBarLabel: 'Listar',
                    headerStyle: {backgroundColor: '#283149'},
                    headerTintColor: 'white'
                })
            },
            //Pestaña eliminar Cuentas
            EliminarCuentas: {
                //Llama al componente
                screen: EliminarCuentasScreen,
                navigationOptions: ({navigation}) => ({
                    tabBarLabel: 'Eliminar',
                    headerStyle: {backgroundColor: '#283149'},
                    headerTintColor: 'white'
                })
            }

        })
        return(
            <MainTab screenProps={{rootNavigation: this.props.screenProps.navigation}} />
        );
    }
}