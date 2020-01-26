import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {DrawerNavigator, StackNavigator, createMaterialTopTabNavigator} from 'react-navigation';
import CrearClienteScreen from './CrearClienteScreen';
import ListarClienteScreen from './ListarClienteScreen';
import EliminarClienteScreen from './EliminarClienteScreen';

class ClienteTabPage extends Component {
    render(){
        //Pestaña que contiene las tres operaciones
        const MainTab = createMaterialTopTabNavigator({
            //Pestaña crear Cuentas
            CrearCliente: {
                //Llama al componente 
                screen: CrearClienteScreen,
                navigationOptions: ({navigation}) => ({
                    tabBarLabel: 'Crear',
                    headerStyle: {backgroundColor: '#283149'},
                    headerTintColor: 'white'
                })
            },
            //Pestaña listar Cuentas
            ListarCliente: {
                //Llama al componente
                screen: ListarClienteScreen,
                navigationOptions: ({navigation}) => ({
                    tabBarLabel: 'Listar',
                    headerStyle: {backgroundColor: '#283149'},
                    headerTintColor: 'white'
                })
            },
            EliminarCliente: {
                //Llama al componente
                screen: EliminarClienteScreen,
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

export default ClienteTabPage;