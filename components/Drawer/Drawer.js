import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    //Text,
    View,
    ImageBackground,
    TouchableHighlight
  } from 'react-native';
  import {Container, Header, Content, Button, Icon, Text, Item,Drawer, Input } from 'native-base';
  import { DrawerNavigator, createStackNavigator,TabNavigator } from 'react-navigation';


  import ProductosScreen from '../ProductosOperaciones/ProductosScreen';
  import ProductoTabPage from '../ProductosOperaciones/ProductosTabPage';

  import PedidosScreen from '../PedidosOperaciones/PedidosScreen';
  import PedidosTabPage from '../PedidosOperaciones/PedidosTabPage';

//   import CuentasScreen from '../CuentasOperaciones/CuentasScreen';
//   import CuentasTabPage from '../CuentasOperaciones/CuentasTabPage';

  import CategoriaScreen from '../CategoriaOperaciones/CategoriaScreen';
  import CategoriaTabPage from '../CategoriaOperaciones/CategoriaTabPage';

  import ClienteScreen from '../ClienteOperaciones/ClienteScreen';
  import ClienteTabPage from '../ClienteOperaciones/ClienteTabPage';

  import UsuarioScreen from '../UsuarioOperaciones/UsuarioScreen';
  import UsuarioTabPage from '../UsuarioOperaciones/UsuarioTabPage';

  import PedidoProductoScreen from '../PedidoProductoOperaciones/PedidoProductoScreen';
  import PedidoProductoTabPage from '../PedidoProductoOperaciones/PedidoProductoTabPage';

  import EstadisticasScreen from '../EstadisticasOperaciones/EstadisticasScreen';
  import EstadisticasTabPage from '../EstadisticasOperaciones/EstadisticasTabPage';

  //Menu 
const ProductosStack = createStackNavigator({
    ProductoTabPage: {
        screen: ({navigation}) => <ProductoTabPage screenProps={{ rootNavigation: navigation}} />,
        navigationOptions: ({navigation}) => ({
            title: "Control E-Commerce",
            headerStyle: {backgroundColor: '#1976D2'},
            headerTintColor: 'white',
            headerRight:
                         <View> 
                             <TouchableHighlight> 
                                       <Icon name="md-menu"
                                        size={35} 
                                        color={"#FFF"}
                                        //color="#000"
                                        style={{color: "#FFF",paddingRight:10}}
                                        onPress={ () => navigation.openDrawer()}/>
                           </TouchableHighlight>
                         </View> ,
            headerMode: 'none',
            //header: null
        })
    }
   
})
//Stack pedidos
const PedidosStack = createStackNavigator({
    PedidosTabPage: {
        screen: ({navigation}) => <PedidosTabPage screenProps={{ rootNavigation: navigation}} />,
        navigationOptions: ({navigation}) => ({
            title: "Control E-Commerce",
            headerStyle: {backgroundColor: '#1976D2'},
            headerTintColor: 'white',
            headerRight:
                         <View> 
                             <TouchableHighlight> 
                                       <Icon name="md-menu"
                                        size={35} 
                                        color={"#FFF"}
                                        //color="#000"
                                        style={{color: "#FFF",paddingRight:10}}
                                        onPress={ () => navigation.openDrawer()}/>
                           </TouchableHighlight>
                         </View> ,
            headerMode: 'none',
            //header: null
        })
    }
})



//Stack Estadisticas

const EstadisticasStack = createStackNavigator({
    EstadisticasTabPage: {
        screen: ({navigation}) => <EstadisticasTabPage screenProps={{ rootNavigation: navigation}} />,
        navigationOptions: ({navigation}) => ({
            title: "Control E-Commerce",
            headerStyle: {backgroundColor: '#1976D2'},
            headerTintColor: 'white',
            headerRight:
                         <View> 
                             <TouchableHighlight> 
                                       <Icon name="md-menu"
                                        size={35} 
                                        color={"#FFF"}
                                        //color="#000"
                                        style={{color: "#FFF",paddingRight:10}}
                                        onPress={ () => navigation.openDrawer()}/>
                           </TouchableHighlight>
                         </View> ,
            headerMode: 'none',
            //header: null
        })
    }
})

const CategoriaStack = createStackNavigator({
    CategoriaTabPage: {
        screen: ({navigation}) => <CategoriaTabPage screenProps={{ rootNavigation: navigation}} />,
        navigationOptions: ({navigation}) => ({
            title: "Control E-Commerce",
            headerStyle: {backgroundColor: '#1976D2'},
            headerTintColor: 'white',
            headerRight:
                         <View> 
                             <TouchableHighlight> 
                                       <Icon name="md-menu"
                                        size={35} 
                                        color={"#FFF"}
                                        //color="#000"
                                        style={{color: "#FFF",paddingRight:10}}
                                        onPress={ () => navigation.openDrawer()}/>
                           </TouchableHighlight>
                         </View> ,
            headerMode: 'none',
            //header: null
        })
    }
})

const UsuarioStack = createStackNavigator({
    UsuarioTabPage: {
        screen: ({navigation}) => <UsuarioTabPage screenProps={{ rootNavigation: navigation}} />,
        navigationOptions: ({navigation}) => ({
            title: "Control E-Commerce",
            headerStyle: {backgroundColor: '#1976D2'},
            headerTintColor: 'white',
            headerRight:
                         <View> 
                             <TouchableHighlight> 
                                       <Icon name="md-menu"
                                        size={35} 
                                        color={"#FFF"}
                                        //color="#000"
                                        style={{color: "#FFF",paddingRight:10}}
                                        onPress={ () => navigation.openDrawer()}/>
                           </TouchableHighlight>
                         </View> ,
            headerMode: 'none',
            //header: null
        })
    }
})

const ClienteStack = createStackNavigator({
    ClienteTabPage: {
        screen: ({navigation}) => <ClienteTabPage screenProps={{ rootNavigation: navigation}} />,
        navigationOptions: ({navigation}) => ({
            title: "Control E-Commerce",
            headerStyle: {backgroundColor: '#1976D2'},
            headerTintColor: 'white',
            headerRight:
                         <View> 
                             <TouchableHighlight> 
                                       <Icon name="md-menu"
                                        size={35} 
                                        //color={"#FFF"}
                                        style={{color: "#FFF",paddingRight:10}}
                                        onPress={ () => navigation.openDrawer()}/>
                           </TouchableHighlight>
                         </View> ,
            headerMode: 'none',
            //header: null
        })
    }
})

// Constante que contiene el menú lateral
const DrawerRaiz = DrawerNavigator({
    Productos:{
        screen: ProductosStack,
    },
    Pedidos: {
        screen: PedidosStack
    },
    Categoria: {
        screen: CategoriaStack
    },
    Usuario: {
        screen: UsuarioStack
    },
    Cliente: {
        screen: ClienteStack
    },
    Estadisticas: {
        screen: EstadisticasStack
    }
}, {
});
export default DrawerRaiz;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    drawerImage: {
        height: 150,
        width: 150,
        borderRadius: 75,
    }
})

