import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  //Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  ToastAndroid
} from 'react-native';
import {DrawerNavigator, StackNavigator, TabNavigator} from 'react-navigation';
import { Container, Header, Content, Card, CardItem, Text, Body, Button, List, ListItem, Left, Thumbnail,Icon } from "native-base";
//import apiPostCliente from '../Constantes/Constantes';
class ListarClienteScreen extends Component {
    constructor(props){
    super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
            id_cliente: ''
        }
    }

    cargarApiCliente(){
    //LLama al api
    return fetch('http://10.52.101.135:45455/api/Cliente')
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

    //Antes de renderizar se utiliza componentWillMount
    componentDidMount(){
       this.cargarApiCliente();
    }

    select = (item) => {
        //const id = this.state.id
        Alert.alert(
            'Mensaje',
            '¿Desea eliminar este Cliente?',
            [
              //{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: 'No', onPress: () => console.log('Se cancela')},
              {text: 'Si', onPress: () => this.eliminarCliente(item)},
            ],
            { cancelable: false }
          )
    }
    
    mostrarInfo = (nombre, apellido,rut, direccion, fono) => {
        //const id = this.state.id
        Alert.alert(
            'Información del Cliente',
            '\nNombre: ' + nombre +
            '\nApellido: ' + apellido +
            '\nRut: ' + rut +
            '\nDirección: ' + direccion +
            '\nFono: ' + fono,
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
                    onPress={() => this.cargarApiCliente()}
                >
                <Icon name="sync"/>
                <Text>Refrescar</Text>
            </Button>
            <Text style={styles.header}>Listado</Text>
            <List dataArray={datos}
                renderRow={(rowData) =>
                    <ListItem>
                        <Text 
                        onPress={() => this.mostrarInfo(rowData.nombre, rowData.apellido,rowData.rut, rowData.direccion, rowData.fono)}
                        key={`rowData-${rowData.id_cliente}`} style={{color: "#000" }}>{rowData.nombre} {rowData.apellido}</Text>
                        <Button iconLeft transparent success
                                    onPress={() => this.select(rowData.id_cliente)}
                                    >
                                        <Icon name="trash"/>
                                    </Button>
                    </ListItem>
                }>
                </List>
            </View>
            );
    }

    eliminarCliente = (item) => {
        //Fetch
          fetch('http://10.52.101.135:45455/api/Cliente/' + item, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
          'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id_cliente: item
            })
          })
          .catch((error) => {
          alert(error);
          });
          this.cargarApiCliente();
          ToastAndroid.show('Cliente Eliminado!', ToastAndroid.SHORT);
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
  })

  export default ListarClienteScreen;