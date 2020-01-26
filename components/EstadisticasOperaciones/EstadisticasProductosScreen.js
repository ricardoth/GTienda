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
import { LineChart, XAxis, Grid  } from 'react-native-svg-charts'
 import * as shape from 'd3-shape'


const apis = ["http://10.52.101.135:45455/api/SumaProductos","http://10.52.101.135:45455/api/SumaStock"];


class EstadisticasProductosScreen extends Component {
    static navigationOptions = { header: null }
    constructor(props){
    super(props);
        this.state = {
            isLoading: true,
            dataSource: '',
            data: '',
            maxium: '',
            sumaMonto: '',
            maxMonto: '',
            minMonto: ''
        }
    }

    callTotaStock(){
       return fetch("http://10.52.101.135:45455/api/TotalStock")
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
            isLoading: false,
            dataSource: responseJson
            }, function() {
            // do something with new state
            });
            })
            .catch((error) => {
            console.error(error);
            });
    }

     
    callPrecioTotal(){
        return fetch("http://10.52.101.135:45455/api/PrecioTotal")
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
            isLoading: false,
            data: responseJson
            }, function() {
            // do something with new state
            });
            })
            .catch((error) => {
            console.error(error);
            });
    }

    

    callPrecioMax(){
        return fetch("http://10.52.101.135:45455/api/PrecioMaximo")
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
            isLoading: false,
            maxium: responseJson
            }, function() {
            // do something with new state
            });
            })
            .catch((error) => {
            console.error(error);
            });
    }

    callMaxMonto(){
        return fetch("http://10.52.101.135:45455/api/MayorPedido")
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
            isLoading: false,
            maxMonto: responseJson
            }, function() {
            // do something with new state
            });
            })
            .catch((error) => {
            console.error(error);
            });
    }

    callMinMonto(){
        return fetch("http://10.52.101.135:45455/api/MenorPedido")
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
            isLoading: false,
            minMonto: responseJson
            }, function() {
            // do something with new state
            });
            })
            .catch((error) => {
            console.error(error);
            });
    }

    callSumaMonto(){
        return fetch("http://10.52.101.135:45455/api/SumaMontoPedidos")
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
            isLoading: false,
            sumaMonto: responseJson
            }, function() {
            // do something with new state
            });
            })
            .catch((error) => {
            console.error(error);
            });
    }

    componentWillMount(){
        this.callTotaStock();
        this.callPrecioTotal();
        this.callSumaMonto();
        this.callMaxMonto();
        this.callMinMonto();
        this.callPrecioMax();
    }

    render(){
        const estado = this.state.dataSource;
        const SumaProductos = this.state.data;
        const preMax = this.state.maxium;
        const sumaMonto = this.state.sumaMonto;
        const maxMonto = this.state.maxMonto;
        const minMonto = this.state.minMonto;

       
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
                <Text>Total Stock de Productos</Text>
                </CardItem>
                <CardItem>
                <Body>
                <Text style={styles.text}>{estado}</Text>
                </Body>
                </CardItem>
            </Card>
            <Card>
                <CardItem header>
                <Text>Precio Total de Productos</Text>
                </CardItem>
                <CardItem>
                <Body>
                <Text style={styles.text}>{SumaProductos}</Text>
                </Body>
                </CardItem>
            </Card>

            <Card>
                <CardItem header>
                <Text>Precio Máximo</Text>
                </CardItem>
                <CardItem>
                <Body>
                <Text style={styles.text}>{preMax}</Text>
                </Body>
                </CardItem>
            </Card>

                <Card>
                <CardItem header>
                <Text>Suma Total de Pedidos</Text>
                </CardItem>
                <CardItem>
                <Body>
                <Text style={styles.text}>{sumaMonto}</Text>
                </Body>
                </CardItem>
            </Card>

           <Card>
                <CardItem header>
                <Text>Pedido con mayor monto </Text>
                </CardItem>
                <CardItem>
                <Body>
                <Text style={styles.text}>{maxMonto}</Text>
                </Body>
                </CardItem>
            </Card>

            <Card>
                <CardItem header>
                <Text>Pedido con menor monto </Text>
                </CardItem>
                <CardItem>
                <Body>
                <Text style={styles.text}>{minMonto}</Text>
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
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: "#CFD8DC",
        flexGrow: 1,
        paddingTop: 20,
        paddingBottom: 20,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 2,
        marginTop: 2,
        borderRadius: 1,
        textAlign: 'center',
        fontWeight: 'bold',
    }
  });

  export default EstadisticasProductosScreen;