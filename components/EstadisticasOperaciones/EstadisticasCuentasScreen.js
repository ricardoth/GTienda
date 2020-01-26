import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  //Text,
  View,
  ActivityIndicator,
  Flatlist,
  ListView,
 
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Button, Icon, Right, List, ListItem } from "native-base";
import {DrawerNavigator, StackNavigator, TabNavigator} from 'react-navigation';

class EstadisticasCuentasScreen extends Component {
    static navigationOptions = {header: null}
    constructor(props){
    super(props);
        this.state = {
            isLoading: true,
            clientes: '',
            usuarios: ''
        }
    }

    callTotalClientes(){
        return fetch("http://10.52.101.135:45455/api/TotalClientes")
         .then((response) => response.json())
         .then((responseJson) => {
             this.setState({
             isLoading: false,
             clientes: responseJson
             }, function() {
             // do something with new state
             });
             })
             .catch((error) => {
             console.error(error);
             });
     }

     callTotalUsuarios(){
        return fetch("http://10.52.101.135:45455/api/TotalUsuarios")
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
            isLoading: false,
            usuarios: responseJson
            }, function() {
            // do something with new state
            });
            })
            .catch((error) => {
            console.error(error);
            });
     }

    componentWillMount(){
        this.callTotalClientes();
        this.callTotalUsuarios();
    }

    render(){
        const clientes = this.state.clientes;
        const usuarios = this.state.usuarios;
        if (this.state.isLoading) {
            return (
            <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
            </View>
            );
        }
        return (
            <Container style={{flex: 1, paddingTop: 20}}>
            <Content>
            <Card>
                <CardItem header>
                <Text>Total de Clientes</Text>
                </CardItem>
                <CardItem>
                <Body>
                <Text style={styles.text}>{clientes}</Text>
                </Body>
                </CardItem>
            </Card>

            <Card>
                <CardItem header>
                <Text>Total de Usuarios</Text>
                </CardItem>
                <CardItem>
                <Body>
                <Text style={styles.text}>{usuarios}</Text>
                </Body>
                </CardItem>
            </Card>
           
            </Content>
            </Container>
        );
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
      backgroundColor: "#D4E6F1",
      flexGrow: 1,
      paddingTop: 5,
      borderRadius: 5,
      alignItems: 'center'
    }
  });

  export default  EstadisticasCuentasScreen;