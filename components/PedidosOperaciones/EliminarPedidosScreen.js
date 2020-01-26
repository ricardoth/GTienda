import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid,
  Alert
} from 'react-native';
import {DrawerNavigator, StackNavigator, TabNavigator} from 'react-navigation';
import { Container, Header, Content, Card, CardItem, Text, Body, Button, List, ListItem, Left, Thumbnail,Icon } from "native-base";
import PedidosScreen from './PedidosScreen';

class EliminarPedidosScreen extends Component {
    constructor(props){
    super(props);
        this.state = {
            isLoading: true,
           
        }
    }

    cargarApiPedidos(){
        return fetch('http://10.52.101.135:45455/api/Pedido/NoVigente')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
            isLoading: false,
            dataSource: responseJson,
            }, function() {
            // do something with new state
            });
            })
            .catch((error) => {
            console.error(error);
            });
    }

    componentDidMount(){
        this.cargarApiPedidos();
    }

    select = (item) => {
        //const id = this.state.id
        Alert.alert(
            'Mensaje',
            '¿Desea activar este producto?',
            [
              //{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: 'No', onPress: () => console.log('Se cancela')},
              {text: 'Si', onPress: () => this.activarPedido(item)},
            ],
            { cancelable: false }
          )
    }

    mostrarInfo = (fecha, detalle, monto, producto, cliente) => {
        //const id = this.state.id
        Alert.alert(
            'Información del Pedido',
            '\nFecha: ' + fecha +
            '\nDetalle: ' + detalle +
            '\nMonto: ' + monto +
            '\nProducto: ' + producto +
            '\nCliente: ' + cliente,
            [
              //{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: 'Aceptar', onPress: () => console.log('Se cancela')},
            ],
            { cancelable: false }
          )
    }

    render(){
        const datos = this.state.dataSource;
        if (this.state.isLoading) {
            return (
            <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
            </View>
            );
        }
            return (
            <View style={{flex: 1, paddingTop: 20}}>
            <Button iconLeft success
                                    style={{marginLeft: 5}}
                                    onPress={() => this.cargarApiPedidos()}
                                    >
                                        <Icon name="sync"/>
                                        <Text>Refrescar</Text>
                                    </Button>
            <Text style={styles.header}>Listado No Vigentes</Text>
            <List dataArray={datos}
                renderRow={(rowData) =>
                    <ListItem>
                        <Text 
                        onPress={() => this.mostrarInfo(rowData.fecha, rowData.detalle,rowData.monto, rowData.producto, rowData.cliente)}
                        key={`rowData-${rowData.id_pedido}`} style={{color: "#000" }}>{rowData.detalle}</Text>
                        <Button iconLeft transparent success
                                    onPress={() => this.select(rowData.id_pedido)}
                                    >
                                        <Icon name="ios-checkmark-circle-outline"/>
                                    </Button>
                    </ListItem>
                }>
                </List>
            </View>
            );
    }

    activarPedido = (item) => {
        //Fetch
            fetch('http://10.52.101.135:45455/api/Pedido/Activar/' + item, {
              method: 'POST',
              headers: {
              Accept: 'application/json',
            'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id_pedido: item,
              })
            })
            .catch((error) => {
            alert(error);
            });
            this.cargarApiPedidos();
            ToastAndroid.show('Pedido Activado ' , ToastAndroid.SHORT)
          // alert("Producto Eliminado!")
          
        }       
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E9F7EF',
        paddingLeft: 40,
        paddingRight: 40,
    },
    header:{
        fontSize: 24,
        marginBottom: 10,
        color: '#000',
        fontWeight: 'bold',
        alignItems: 'center',
        textAlign: 'center'
    },
    textInput:{
        alignSelf: 'stretch',
        padding: 5,
        marginTop: 10,
        marginBottom:10,
        backgroundColor: '#fff',
        borderRadius: 4
    }, 
    btn: {
        alignSelf: 'stretch',
        backgroundColor: '#D4E6F1',
        padding: 15,
        alignItems: 'center',
        borderRadius: 4
    },
    head: { height: 40, backgroundColor: '#E9F7EF' },
    text: { margin: 6,alignItems: 'center', },
    celda: {
        alignContent: 'center',
        backgroundColor: "#ff5722",
        flex: 3,
        padding: 15,
        borderRadius: 1,
        alignItems: 'center'
    }
  });

  export default EliminarPedidosScreen;