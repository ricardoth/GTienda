import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  //Text,
  View,
  ActivityIndicator,
  ListView,
  TouchableOpacity,
  Alert,
  ToastAndroid
} from 'react-native';
import {DrawerNavigator, StackNavigator, TabNavigator} from 'react-navigation';
import { Container, Header, Content, Card, CardItem, Text, Body, Button, List, ListItem, Left, Thumbnail,Icon } from "native-base";

class ListarCategoriaScreen extends Component {
    constructor(props){
    super(props);
        this.state = {
            isLoading: true,
        }
    }

    cargarApiCategoria = async () => {
        //LLama al api
        try {
            const response = await fetch('http://10.52.101.135:45455/api/Categoria');
            const responseJson = await response.json();
            //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                isLoading: false,
                dataSource: responseJson,
            }, function () {
                // do something with new state
            });
        }
        catch (error) {
            console.error(error);
        }
    }

    //Antes de renderizar se utiliza componentWillMount
    componentWillMount(){
        this.cargarApiCategoria();
    }
    
    select = (item) => {
        //const id = this.state.id
        Alert.alert(
            'Mensaje',
            '¿Desea eliminar esta Categoría?',
            [
              //{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: 'No', onPress: () => console.log('Se cancela')},
              {text: 'Si', onPress: () => this.eliminarCategoria(item)},
            ],
            { cancelable: false }
          )
    }

    mostrarInfo = (nombre) => {
        //const id = this.state.id
        Alert.alert(
            'Información de la Categoría',
            '\nNombre: ' + nombre ,
            
            [
              //{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: 'Aceptar', onPress: () => console.log('Se cancela')},
            ],
            { cancelable: false }
          )
    }

    render(){
        const datos = this.state.dataSource
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
                    onPress={() => this.cargarApiCategoria()}
                >
                <Icon name="sync"/>
                <Text>Refrescar</Text>
            </Button>
            <Text style={styles.header}>Listado</Text>
            <List dataArray={datos}
                renderRow={(rowData) =>
                    <ListItem>
                        <Text 
                        onPress={() => this.mostrarInfo(rowData.nom_categoria)}
                        key={`rowData-${rowData.id_categoria}`} style={{color: "#000" }}>{rowData.nom_categoria} </Text>
                        <Button iconLeft transparent success
                                    onPress={() => this.select(rowData.id_categoria)}
                                    >
                                        <Icon name="trash"/>
                                    </Button>
                    </ListItem>
                }>
                </List>
            </View>
            );
    }

    eliminarCategoria = (item) => {
        this.setState({
            id_categoria: item
        })
        //Fetch
          fetch('http://10.52.101.135:45455/api/Categoria/' + item, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id_categoria: item,
            })
          })
          .catch((error) => {
          alert(error);
          });
          this.cargarApiCategoria();
          ToastAndroid.show('Categoría Eliminada ' , ToastAndroid.SHORT)
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
  })

  export default ListarCategoriaScreen;