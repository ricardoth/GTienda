import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Switch,
  ToastAndroid
} from 'react-native';
import {DrawerNavigator, StackNavigator, TabNavigator} from 'react-navigation';
import { Container, Header, Content, Card, CardItem, Text, Body, Button,Item, Label, Input, Form } from "native-base";


class CrearClienteScreen extends Component {
    constructor(props){
    super(props);
        this.state = {
            nombre: '',
            apellido: '',
            rut: '',
            direccion: '',
            fono: '',
            estado: true,
           
        }
    }

    clearText = () => {
        this._textInput.setNativeProps({text: ''});
        this._textInput2.setNativeProps({text: ''});
        this._textInput3.setNativeProps({text: ''});
        this._textInput4.setNativeProps({text: ''});
        this._textInput5.setNativeProps({text: ''});
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
    

    validar = () => {
        const nom = this.state.nombre;
        const ape = this.state.apellido;
        const rut = this.state.rut;
        const dir = this.state.direccion;
        const fono = this.state.fono;
       

        if (nom != "" && ape != "" && rut != "" && dir != "" &&
        fono != "" ) {
            this.crearCliente();
        } else {
            ToastAndroid.show('Debe llenar los campos!', ToastAndroid.SHORT)
        }
    }

    accionSwitch = () => this.setState(state => ({
        estado: !state.estado
    }))

    render(){
        return (
            <View style={{flex: 1, paddingTop: 5}}>
            <Text style={{textAlign:"center", fontSize: 18, fontWeight: "bold"}}>Ingrese Cliente</Text> 
                            <Text style={styles.interiorTexto}>Nombre</Text> 
                            <TextInput 
                                ref={component => this._textInput = component}
                                style={styles.textInput}
                                onChangeText={(nombre) => this.setState({nombre})}
                            />

                            

                            <Text style={styles.interiorTexto}>Apellido</Text> 
                            <TextInput 
                                ref={component => this._textInput2 = component}
                                style={styles.textInput}
                                onChangeText={(apellido) => this.setState({apellido})}
                            />

                            <Text style={styles.interiorTexto}>Rut</Text> 
                            <TextInput 
                                ref={component => this._textInput3 = component}
                                style={styles.textInput}
                                onChangeText={(rut) => this.setState({rut})}
                            />


                            <Text style={styles.interiorTexto}>Dirección</Text> 
                            <TextInput 
                                ref={component => this._textInput4 = component}
                                style={styles.textInput}
                                onChangeText={(direccion) => this.setState({direccion})}
                            />
                   
                            <Text style={styles.interiorTexto}>Fono</Text> 
                            <TextInput 
                                ref={component => this._textInput5 = component}
                                style={styles.textInput}
                                keyboardType = 'numeric'
                                onChangeText={(fono) => this.setState({fono})}
                            />

                   
                    
                    <Text style={styles.interiorTexto}>Estado</Text>
                     <View style={{ width: 80, paddingRight: 20 }}> 
                        <Switch
                            onValueChange={this.accionSwitch}
                            value={this.state.estado}
                        />
                     </View>    

                    <TouchableOpacity
                        style={styles.btn}
                        onPress={this.validar}>
                    <Text style={styles.texto}>Crear</Text>
                    </TouchableOpacity> 
            </View> 
        );
    }

    crearCliente = () => {
         //Fetch
         fetch('http://10.52.101.135:45455/api/Cliente', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: this.state.nombre,
                apellido: this.state.apellido,
                rut: this.state.rut,
                direccion: this.state.direccion,
                fono: this.state.fono,
                estado: this.state.estado
            })
            
        })
        this.clearText();
        ToastAndroid.show('Cliente Creado!' , ToastAndroid.SHORT);
        this.cargarApiCliente();
    }
    

}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: '#E9F7EF',
        marginLeft: 10,
        marginRight: 10
        //paddingLeft: 10,
        //paddingRight: 10,
    },
    header:{
        fontSize: 14,
        color: '#000',
        fontWeight: 'bold',
    },
    interiorTexto:{
        fontSize: 11,
        paddingLeft: 20,
        marginTop:10
    },
    textInput:{
        
        alignSelf: 'stretch',
        paddingLeft: 20,
        borderWidth: 1, 
        borderColor: '#ccc'
    }, 
    btn: {
        alignSelf: 'stretch',
        backgroundColor: '#ff5722',
        padding: 15,
        alignItems: 'center',
        borderRadius: 4,
        margin: 20
    },
    texto: {
        color: '#FFF'
    }
});

export default CrearClienteScreen;