import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {DrawerNavigator, StackNavigator, createMaterialTopTabNavigator} from 'react-navigation';
import CrearCategoriaScreen from './CrearCategoriaScreen';
import ListarCategoriaScreen from './ListarCategoriaScreen';
import EliminarCategoriaScreen from './EliminarCategoriaScreen';

class CategoriaTabPage extends Component {
    render(){
        //Pestaña que contiene las tres operaciones
        const MainTab = createMaterialTopTabNavigator({
            //Pestaña crear Cuentas
            CrearCategoria: {
                //Llama al componente 
                screen: CrearCategoriaScreen,
                navigationOptions: ({navigation}) => ({
                    tabBarLabel: 'Crear',
                    headerStyle: {backgroundColor: '#283149'},
                    headerTintColor: 'white'
                })
            },
            //Pestaña listar Cuentas
            ListarCategoria: {
                //Llama al componente
                screen: ListarCategoriaScreen,
                navigationOptions: ({navigation}) => ({
                    tabBarLabel: 'Listar',
                    headerStyle: {backgroundColor: '#283149'},
                    headerTintColor: 'white'
                })
            },
        
            EliminarCategoria: {
                //Llama al componente
                screen: EliminarCategoriaScreen,
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

export default CategoriaTabPage;