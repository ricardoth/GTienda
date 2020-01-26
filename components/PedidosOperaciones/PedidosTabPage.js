import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {DrawerNavigator, StackNavigator, createMaterialTopTabNavigator} from 'react-navigation';
import CrearPedidosScreen from './CrearPedidosScreen';
import ListarPedidosScreen from './ListarPedidosScreen';
import EliminarPedidosScreen from './EliminarPedidosScreen';

class PedidosTabPage extends Component {
    render(){
        //Pestaña que contiene las tres operaciones
        const MainTab = createMaterialTopTabNavigator({
            //Pestaña crear Pedidos
            CrearPedido: {
                //Llama al componente 
                screen: CrearPedidosScreen,
                navigationOptions: ({navigation}) => ({
                    tabBarLabel: 'Crear',
                    headerStyle: {backgroundColor: '#283149'},
                    headerTintColor: 'white'
                })
            },
            //Pestaña listar Pedidos
            ListarPedidos: {
                //Llama al componente
                screen: ListarPedidosScreen,
                navigationOptions: ({navigation}) => ({
                    tabBarLabel: 'Listar',
                    headerStyle: {backgroundColor: '#283149'},
                    headerTintColor: 'white'
                })
            },
            //Pestaña eliminar Pedidos
            EliminarPedidos: {
                //Llama al componente
                screen: EliminarPedidosScreen,
                navigationOptions: ({navigation}) => ({
                    tabBarLabel: 'Listar No Vigentes',
                    headerStyle: {backgroundColor: '#283149'},
                    headerTintColor: 'white'
                })
            }
            //animationEnabled: true

        })
        return(
            <MainTab screenProps={{rootNavigation: this.props.screenProps.navigation}} />
        );
    }
}

export default PedidosTabPage;