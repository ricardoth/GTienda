import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  //Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  ListView,
  ScrollView,
  TouchableOpacity,
  Alert,
  ToastAndroid
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Button, List, ListItem, Left, Thumbnail, Icon } from "native-base";
import {DrawerNavigator, StackNavigator, TabNavigator} from 'react-navigation';

class EliminarProductoScreen extends Component {
  //quita barra de navegacion
  static navigationOptions = { header: null }
    constructor(props){
    super(props);
    this.state = {
        isLoading: true,
        data: '',
        dataSource: [],
        id_producto: ''
      };
    }

    cargarApiProductos(){
       // alert('Entre')
        return fetch('http://10.52.101.135:45455/api/Producto/NoVigente')
        .then((response) => response.json())
        .then((responseJson) => {
            //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
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
        //Dirección ip cambiarla, más adelante de forma dinámica
       this.cargarApiProductos();
      }
    
  

    select = (item) => {
        //const id = this.state.id
        Alert.alert(
            'Mensaje',
            '¿Desea activar este producto?',
            [
              //{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: 'No', onPress: () => console.log('Se cancela')},
              {text: 'Si', onPress: () => this.activarProducto(item)},
            ],
            { cancelable: false }
          )
    }

    mostrarInfo = (nom_prod, detalle,precio, stock, categoria) => {
        //const id = this.state.id
        Alert.alert(
            'Información del Producto',
            '\nNombre: ' + nom_prod +
            '\nDetalle: ' + detalle +
            '\nPrecio: ' + precio +
            '\nStock: ' + stock +
            '\nCategoría: ' + categoria,
            [
              //{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: 'Aceptar', onPress: () => console.log('Se cancela')},
            ],
            { cancelable: false }
          )
    }

    render(){
       const id = this.state.id_producto;
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
                                    onPress={() => this.cargarApiProductos()}
                                    >
                                        <Icon name="sync"/>
                                        <Text>Refrescar</Text>
                                    </Button>
            <Text style={styles.header}>Listado No Vigentes</Text>
               <List dataArray={datos}
                renderRow={(rowData) =>
                    <ListItem>
                       
                                    <Text 
                                    onPress={() => this.mostrarInfo(rowData.nom_prod,rowData.detalle,rowData.precio,rowData.stock, rowData.categoria)}
                                    key={`rowData-${rowData.id_producto}`} style={styles.text}>{rowData.nom_prod}</Text>
                                    
                                    <Button iconLeft transparent success
                                    onPress={() => this.select(rowData.id_producto)}
                                    >
                                        <Icon name="ios-checkmark-circle-outline"/>
                                    </Button>
                      
                    </ListItem>
                }>
                </List>
           
            </View>


            
            );
    }

    activarProducto = (item) => {
        //Fetch
            fetch('http://10.52.101.135:45455/api/Producto/Activar/' + item, {
              method: 'POST',
              headers: {
              Accept: 'application/json',
            'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id_producto: item,
              })
            })
            .catch((error) => {
            alert(error);
            });
            this.cargarApiProductos();
            ToastAndroid.show('Producto Activado ' , ToastAndroid.SHORT)
         
        }       
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
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
      //marginTop: 10,
      //marginBottom:10,
      //backgroundColor: '#fff',
      borderRadius: 4
  }, 
  btn: {
      //alignSelf: 'stretch',
      backgroundColor: '#D4E6F1',
      padding: 0,
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
      color: "#000" 
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

export default EliminarProductoScreen;