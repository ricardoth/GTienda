import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight
} from 'react-native';
import {DrawerNavigator, StackNavigator, createMaterialTopTabNavigator} from 'react-navigation';
import { Icon } from 'native-base';
import CrearProductoScreen from './CrearProductoScreen';
import ListarProductoScreen from './ListarProductoScreen';
import EliminarProductoScreen from './EliminarProductoScreen';
import ProductosScreen from './ProductosScreen';

class ProductoTabPage extends Component {
    //quita barra de navegacion
  static navigationOptions = { 
      header: null
     }
    render(){   
        //Pestaña que contiene las tres operaciones
        const MainTab = createMaterialTopTabNavigator({
            //Pestaña crear producto
            CrearProducto: {
                //Llama al componente 
                screen: CrearProductoScreen,
                navigationOptions: ({navigation}) => ({
                    tabBarLabel: 'Crear',
                    headerStyle: {backgroundColor: '#283149'},
                    headerTintColor: 'white',
                  
                })
            },
            //Pestaña listar producto
            ListarProducto: {
                //Llama al componente
                screen: ListarProductoScreen,
                navigationOptions: ({navigation}) => ({
                    tabBarLabel: 'Listar',
                    headerStyle: {backgroundColor: '#283149'},
                    headerTintColor: 'white'
                })
            },
            //Pestaña eliminar producto
            EliminarProducto: {
                //Llama al componente
                screen: EliminarProductoScreen,
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

export default ProductoTabPage;