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
import { Container, Header, Content, Card, CardItem, Text, Body, Button, List, ListItem,Icon } from "native-base";

class ListarPedProdNoVigenteScreen extends Component {
    constructor(props){
    super(props);
        this.state = {
            isLoading: true
        }
    }

  
    cargarApiPedProd(){
         //LLama al api
         return fetch('http://192.168.1.34:45455/api/PedidoProducto/NoVigente')
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
    componentWillMount(){
       this.cargarApiPedProd();
    }

    select = (item) => {
        //const id = this.state.id
        Alert.alert(
            'Mensaje',
            '¿Desea eliminar este producto?',
            [
              //{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: 'No', onPress: () => console.log('Se cancela')},
              {text: 'Si', onPress: () => this.activarPedProd(item)},
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
                                    style={{marginLeft: 10}}
                                    onPress={() => this.cargarApiPedProd()}
                                    >
                                        <Icon name="sync"/>
                                    </Button>
            <Text style={styles.header}>Listado No Vigentes</Text>
            <List dataArray={datos}
                renderRow={(rowData) =>
                    <ListItem>
                        <Text key={`rowData-${rowData.id_ped_prod}`} style={{color: "#000" }}>{rowData.pedido} | {rowData.producto}</Text>
                        <Button iconLeft transparent success
                                    onPress={() => this.select(rowData.id_ped_prod)}
                                    >
                                        <Icon name="ios-checkmark-circle-outline"/>
                                    </Button>
                    </ListItem>
                }>
                </List>
            </View>
            );
    }

    activarPedProd = (item) => {
        //Fetch
            fetch('http://192.168.1.34:45455/api/PedidoProducto/Activar/' + item, {
              method: 'POST',
              headers: {
              Accept: 'application/json',
            'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id_ped_prod: item,
              })
            })
            .catch((error) => {
            alert(error);
            });
            this.cargarApiPedProd();
            ToastAndroid.show('Ped Prod Activado ' , ToastAndroid.SHORT)
          
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

  export default ListarPedProdNoVigenteScreen;
