import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {DrawerNavigator, StackNavigator, createMaterialTopTabNavigator} from 'react-navigation';
import CrearUsuarioScreen from './CrearUsuarioScreen';
import ListarUsuarioScreen from './ListarUsuarioScreen';
import EliminarUsuarioScreen from './EliminarUsuarioScreen';

class UsuarioTabPage extends Component {
    //quita barra de navegacion
  static navigationOptions = { header: null }
    render(){
        //Pestaña que contiene las tres operaciones
        const MainTab = createMaterialTopTabNavigator({
            //Pestaña crear producto
            CrearUsuario: {
                //Llama al componente 
                screen: CrearUsuarioScreen,
                navigationOptions: ({navigation}) => ({
                    tabBarLabel: 'Crear',
                    headerStyle: {backgroundColor: '#283149'},
                    headerTintColor: 'white'
                })
            },
            //Pestaña listar producto
            ListarUsuario: {
                //Llama al componente
                screen: ListarUsuarioScreen,
                navigationOptions: ({navigation}) => ({
                    tabBarLabel: 'Listar',
                    headerStyle: {backgroundColor: '#283149'},
                    headerTintColor: 'white'
                })
            },
            EliminarUsuario: {
                //Llama al componente
                screen: EliminarUsuarioScreen,
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

export default UsuarioTabPage;