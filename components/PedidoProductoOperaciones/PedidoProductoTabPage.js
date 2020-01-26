import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {DrawerNavigator, StackNavigator, createMaterialTopTabNavigator} from 'react-navigation';
import CrearPedidoProductoScreen from './CrearPedidoProductoScreen';
import ListarPedidoProductoScreen from './ListarPedidoProductoScreen';
import ListarPedProdNoVigenteScreen from './ListarPedProdNoVigenteScreen';

class PedidoProductoTabPage extends Component {
    render(){
        //Pestaña que contiene las tres operaciones
        const MainTab = createMaterialTopTabNavigator({
            //Pestaña crear Cuentas
            CrearPedidoProducto: {
                //Llama al componente 
                screen: CrearPedidoProductoScreen,
                navigationOptions: ({navigation}) => ({
                    tabBarLabel: 'Crear',
                    headerStyle: {backgroundColor: '#283149'},
                    headerTintColor: 'white'
                })
            },
            //Pestaña listar Cuentas
            ListarPedidoProducto: {
                //Llama al componente
                screen: ListarPedidoProductoScreen,
                navigationOptions: ({navigation}) => ({
                    tabBarLabel: 'Listar',
                    headerStyle: {backgroundColor: '#283149'},
                    headerTintColor: 'white'
                })
            },
             //Pestaña listar Cuentas
             ListarPedProd: {
                //Llama al componente
                screen: ListarPedProdNoVigenteScreen,
                navigationOptions: ({navigation}) => ({
                    tabBarLabel: 'Lista No Vigentes',
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

export default PedidoProductoTabPage;