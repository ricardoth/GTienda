import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {DrawerNavigator, StackNavigator, createMaterialTopTabNavigator} from 'react-navigation';
import EstadisticasCuentasScreen from './EstadisticasCuentasScreen';
import EstadisticasPedidosScreen from './EstadisticasPedidosScreen';
import EstadisticasProductosScreen from './EstadisticasProductosScreen';

class EstadisticasTabPage extends Component {
    render(){
        //Pestaña que contiene las tres operaciones
        const MainTab = createMaterialTopTabNavigator({
            //Pestaña crear producto
            EstadisticasProductos: {
                //Llama al componente 
                screen: EstadisticasProductosScreen,
                navigationOptions: ({navigation}) => ({
                    tabBarLabel: 'Stats Prods',
                    headerStyle: {backgroundColor: '#283149'},
                    headerTintColor: 'white'
                })
            },
            //Pestaña listar producto
            EstadisticasPedidos: {
                //Llama al componente
                screen: EstadisticasPedidosScreen,
                navigationOptions: ({navigation}) => ({
                    tabBarLabel: 'Stats Pedidos',
                    headerStyle: {backgroundColor: '#283149'},
                    headerTintColor: 'white'
                })
            },
            //Pestaña eliminar producto
            EstadisticasCuentas: {
                //Llama al componente
                screen: EstadisticasCuentasScreen,
                navigationOptions: ({navigation}) => ({
                    tabBarLabel: 'Stats Cuentas',
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

export default EstadisticasTabPage;