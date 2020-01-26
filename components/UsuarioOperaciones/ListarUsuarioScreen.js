import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  //Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid,
  Alert
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Button, List, ListItem, Left, Thumbnail,Icon } from "native-base";
//import { Table, Row, Grid,Rows } from 'react-native-table-component';
import { Col, Row, Grid } from "react-native-easy-grid";
import {DrawerNavigator, StackNavigator, TabNavigator} from 'react-navigation';

class ListarUsuarioScreen extends Component {
  //quita barra de navegacion
  static navigationOptions = { header: null }
    constructor(props){
    super(props);
    this.state = {
        isLoading: true,
        dataSource: [],
        id_usuario: ''
      };
    }

    cargarApiUsuario(){
         //Dirección ip cambiarla, más adelante de forma dinámica
         return fetch('http://10.52.101.135:45455/api/Usuario')
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

    componentDidMount() {
       this.cargarApiUsuario();
    }

    select = (item) => {
        //const id = this.state.id
        Alert.alert(
            'Mensaje',
            '¿Desea eliminar este Usuario?',
            [
              {text: 'No', onPress: () => console.log('Se cancela')},
              {text: 'Si', onPress: () => this.eliminarUsuario(item)},
            ],
            { cancelable: false }
          )
    }

    mostrarInfo = (item, pass) => {
        //const id = this.state.id
        Alert.alert(
            'Mensaje',
            'Información del Usuario\n'+
            '\nNombre: ' + item ,
            [

              {text: 'Cancelar', onPress: () => console.log('Se cancela')},
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
                    onPress={() => this.cargarApiUsuario()}
                >
                <Icon name="sync"/>
                <Text>Refrescar</Text>
            </Button>
            <Text style={styles.header}>Listado</Text>
            <List dataArray={datos}
                renderRow={(rowData) =>
                    <ListItem>
                        <Text onPress={() => this.mostrarInfo(rowData.nom_usuario, rowData.pass)} 
                        key={`rowData-${rowData.id_usuario}`} style={{color: "#000" }}>{rowData.nom_usuario}</Text>
                        <Button iconLeft transparent success
                                    onPress={() => this.select(rowData.id_usuario)}
                                    >
                                        <Icon name="trash"/>
                                    </Button>
                    </ListItem>
                }
                >
                </List>
           
            </View>
            );
    }

    eliminarUsuario = (item) => {
        //Fetch
          fetch('http://10.52.101.135:45455/api/Usuario/' + item, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
          'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id_usuario: item,
            })
          })
          .catch((error) => {
          alert(error);
          });
          
          ToastAndroid.show('Usuario Eliminado! ' , ToastAndroid.SHORT)
          this.cargarApiUsuario();
          
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
  head: { 
      height: 40, 
      backgroundColor: '#E9F7EF' 
    },
  text: { 
      margin: 6,
      alignItems: 'center', 
    },
  celda: {
        alignContent: 'center',
        backgroundColor: "#ff5722",
        flex: 3,
        padding: 15,
        borderRadius: 1,
        alignItems: 'center'
  }
});

export default ListarUsuarioScreen;