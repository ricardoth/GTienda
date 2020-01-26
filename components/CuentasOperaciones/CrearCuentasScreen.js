import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import {DrawerNavigator, StackNavigator, TabNavigator} from 'react-navigation';
import CuentasScreen from './CuentasScreen';
import apiCuentas from '../Constantes/Constantes';

export default class CrearCuentasScreen extends Component {
    constructor(props){
    super(props);
        this.state = {
            nombre: '',
            apellido: '',
            correo: '',
            pass: '',
        }
    }

    render(){
        return (
            <View style={styles.container}> 
                <Text style={styles.header}>Ingrese Cuenta</Text> 

                <Image source={require('../../images/user.png')} style={styles.images}/>

                 <TextInput
                        style={styles.textInput} placeholder='Nombre: '
                        onChangeText={(nombre) => this.setState({nombre})}
                        underlineColorAndroid='transparent'
                    />

                    <TextInput
                        style={styles.textInput} placeholder='Apellido: '
                        onChangeText={(apellido) => this.setState({apellido})}
                        underlineColorAndroid='transparent'
                    />

                    <TextInput
                        style={styles.textInput} placeholder='Correo: '
                        onChangeText={(correo) => this.setState({correo})}
                        underlineColorAndroid='transparent'
                    />
                    <TextInput
                        style={styles.textInput} placeholder='Contraseña: '
                        onChangeText={(pass) => this.setState({pass})}
                        underlineColorAndroid='transparent'
                    />
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={this.crearCuenta}>
                    <Text style={styles.texto}>Crear</Text>
                    </TouchableOpacity> 
            </View> 
        );
    }

    crearCuenta = () => {
         //Fetch
         fetch('http://192.168.0.105:45455/api/Cuenta', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: this.state.nombre,
                apellido: this.state.apellido,
                correo: this.state.correo,
                pass: this.state.pass,
                
            })
            
        });
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
})