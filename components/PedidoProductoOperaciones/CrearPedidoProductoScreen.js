import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
  ToastAndroid
} from 'react-native';
import {DrawerNavigator, StackNavigator, TabNavigator} from 'react-navigation';
import { Container, Header, Content, Card, CardItem, Text, Body, Button } from "native-base";


class CrearPedidoProductoScreen extends Component {
    constructor(props){
    super(props);
        this.state = {
            producto: '',
            pedido: '',
            estado: true
        }
    }

    validar = () => {;
       
        if (this.state.producto != "" && this.state.pedido != "")
        {
            this.crearPedProd();
        } else {
            alert("Debe llenar los campos requeridos")
        }
    }

    accionSwitch = () => this.setState(state => ({
        estado: !state.estado
    }))

    render(){
        return (
            <Container style={styles.container}> 
                <Text style={styles.header}>Ingrese Ped Prod</Text> 

                <Image source={require('../../images/user.png')} style={styles.images}/>

                    <TextInput
                        style={styles.textInput} placeholder='Producto: '
                        onChangeText={(producto) => this.setState({producto})}
                        underlineColorAndroid='transparent'
                    />

                    <TextInput
                        style={styles.textInput} placeholder='Pedido: '
                        onChangeText={(pedido) => this.setState({pedido})}
                        underlineColorAndroid='transparent'
                    />

                     <Switch
                        onValueChange={this.accionSwitch}
                        value={this.state.estado}
                     />

                    <TouchableOpacity
                        style={styles.btn}
                        onPress={this.validar}>
                        <Text style={styles.texto}>Crear</Text>
                    </TouchableOpacity> 
            </Container> 
        );
    }

    crearPedProd = () => {
         //Fetch
         fetch('http://192.168.1.34:45455/api/PedidoProducto', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                producto: this.state.producto,
                pedido: this.state.pedido,
                estado: this.state.estado
            })
            
        })
        .catch((error) => {
            alert(error);
            });
            ToastAndroid.show('Ped Prod Creado!', ToastAndroid.SHORT)
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
        marginBottom: 60,
        color: '#000',
        fontWeight: 'bold',
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
        backgroundColor: '#ff5722',
        padding: 15,
        alignItems: 'center',
        borderRadius: 4
    },
    texto: {
        color: '#FFF'
    },
    images:{
        padding: 50,
        marginBottom: 30,
        alignContent: 'center',
        resizeMode: 'cover',
        
    }
});

export default CrearPedidoProductoScreen;