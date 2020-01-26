import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  //Text,
  View,
  TextInput,
  TouchableOpacity,
  Switch,
  ToastAndroid,
  Alert
} from 'react-native';
import { Container, Header, Content, Textarea, Text, Form, Item, Label, Input } from "native-base";
import {DrawerNavigator, StackNavigator, TabNavigator} from 'react-navigation';


class CrearUsuarioScreen extends Component {
    //quita barra de navegacion
  static navigationOptions = { header: null }
    constructor(props){
    super(props);
        this.state = {
            nom_usuario: '',
            pass: '',
            estado: true
        }
    }

    clearText = () => {
        this._textInput.setNativeProps({text: ''});
        this._textInput2.setNativeProps({text: ''});
      }

    cargarApiUsuario = () =>{
        //Dirección ip cambiarla, más adelante de forma dinámica
        fetch('http://10.52.101.135:45455/api/Usuario')
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
        if (this.state.nom_usuario != "" && this.state.pass != "" ) {
            this.crearUsuario();
        } else {
            ToastAndroid.show('Debe llenar los campos! ' , ToastAndroid.SHORT)
        }
    }

    accionSwitch = () => this.setState(state => ({
        estado: !state.estado
    }))

    render(){
        return (
            <View style={{flex: 1, paddingTop: 20}}> 
                <Text style={{textAlign:"center", fontSize: 18, fontWeight: "bold"}}>Ingrese Usuario</Text> 
                   
                            <Text style={styles.interiorTexto}>Nombre</Text> 
                            <TextInput 
                                ref={component => this._textInput = component}
                                style={styles.textInput}
                                onChangeText={(nom_usuario) => this.setState({nom_usuario})}
                            />

                            <Text style={styles.interiorTexto}>Contraseña</Text> 
                            <TextInput 
                                secureTextEntry={true}
                                ref={component => this._textInput2 = component}
                                style={styles.textInput}
                                onChangeText={(pass) => this.setState({pass})}
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
    //desde el boton llama al metodo crear y este guarda el estado en los textInput
    crearUsuario = () => {
        //Fetch
         fetch('http://10.52.101.135:45455/api/Usuario', {
             method: 'POST',
             headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                 nom_usuario: this.state.nom_usuario,
                 pass: this.state.pass,
                 estado: this.state.estado
             })
         });
         
        this.clearText();
        ToastAndroid.show('Usuario Creado!' , ToastAndroid.SHORT);
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
        marginBottom: 60,
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

export default CrearUsuarioScreen;