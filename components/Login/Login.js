import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    //Text,
    View,
    ImageBackground,
    TextInput,
    Image,
    AsyncStorage,
    TouchableOpacity,
    ToastAndroid
  } from 'react-native';
  import {Container, Header, Content, Button, Icon, Text, Item, Input,Form, Label } from 'native-base';
  import { DrawerNavigator, StackNavigator, TabNavigator } from 'react-navigation';
  

class Login extends Component{
       //quita barra de navegacion
    static navigationOptions = { header: null }
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            dataSource: [],
            inicioNom: '',
            inicioPass: '',
            nom_usuario: '',
            pass: '',
            inicio: [],
            res: ''
        }
    }

    clearText = () => {
        this._textInput.setNativeProps({text: ''});
        this._textInput2.setNativeProps({text: ''});
      }

    validar = () => {
        if (this.state.nom_usuario != "" && this.state.pass != "" ) {
            this.login();
        } else {
            ToastAndroid.show('Debe llenar los campos! ' , ToastAndroid.SHORT)
        }
        //this.limpiarTexto();
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ImageBackground
                    source={require('../../images/water.jpeg')}
                    style={{flex: 1}}> 
                   
                            <Text style={{textAlign:"center", fontSize: 24, fontWeight: "bold"}}>App Control E-Commerce</Text> 
                            <Image opacity={1.0} source={require('../../images/manipulacion.png')} style={styles.images}/> 
                            <Text style={styles.interiorTexto}>Usuario</Text> 
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

                        <TouchableOpacity
                        style={styles.btn}
                        onPress={this.validar}>
                    <Text style={styles.texto}>Ingresar</Text>
                    </TouchableOpacity> 
                     
                    </ImageBackground> 
                </View> 
        );
    }

    login = () => {
        var nombre = this.state.nom_usuario;

        fetch('http://10.52.101.135:45455/api/Login/', { 
           method: 'POST',
           headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
           },
            body: JSON.stringify({
                 nom_usuario: this.state.nom_usuario,
                 pass: this.state.pass
            })
       })
       .then(res => res.json())
       .then(responseJson => {
           if(responseJson == 1)
           {
                this.props.navigation.navigate('DrawerRaiz');
                ToastAndroid.show('Bienvenido: '  + nombre, ToastAndroid.SHORT);
           } 
           else {
            ToastAndroid.show('No existe el usuario en la base de datos', ToastAndroid.SHORT);
           }
         this.clearText();
          this.setState({
             respuesta: responseJson
          }, function() {

          });
          })
       .catch(error => console.warn('Error', error));
       
    }

  }

  

//Constante estilos
const styles = StyleSheet.create({
    container:{
        flex: 1,
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
    images:{
        marginLeft: 50,
        alignContent: 'center',
        resizeMode: 'cover',
        alignItems: 'center',
        
    },
    texto: {
        color: '#FFF'
    }
});

export default Login;