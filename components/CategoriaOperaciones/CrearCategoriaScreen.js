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
import { Container, Header, Content, Card, CardItem, 
    Text, Item, Input, Form, Label,
    Body, Button, Icon, Right, List, ListItem, Picker } from "native-base";
import {DrawerNavigator, StackNavigator, TabNavigator} from 'react-navigation';


class CrearCategoriaScreen extends Component {
    constructor(props){
    super(props);
        this.state = {  
            nom_categoria: '',
            estado: true,
            blankNom: ''
           
        }
    }

    clearText = () => {
        this._textInput.setNativeProps({text: ''});
      }

    cargarApiCategoria = () =>{
        //LLama al api
        fetch('http://10.52.101.135:45455/api/Categoria')
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

    validar = () => {
        if (this.state.nom_categoria != "") {
            this.crearCategoria();
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
                <Text style={{textAlign:"center", fontSize: 18, fontWeight: "bold"}}>Ingrese Categoria</Text> 
                    <Text style={styles.interiorTexto}>Nombre</Text> 
                    <TextInput 
                        ref={component => this._textInput = component}
                        style={styles.textInput}
                        onChangeText={(nom_categoria) => this.setState({nom_categoria})}
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
                            onPress={this.validar}
                            >
                        <Text style={styles.texto}>Crear</Text>
                    </TouchableOpacity>
            </View> 
        );
    }

    crearCategoria = () => {
                //Fetch
                 fetch('http://10.52.101.135:45455/api/Categoria', {
                     method: 'POST',
                     headers: {
                         Accept: 'application/json',
                         'Content-Type': 'application/json'
                     },
                         body: JSON.stringify({
                             nom_categoria: this.state.nom_categoria,
                             estado: this.state.estado
                         })
                 });
                ToastAndroid.show('Categoría Creada! ' , ToastAndroid.SHORT);
               this.clearText();
               this.cargarApiCategoria();
           
        }       
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E9F7EF',
        marginLeft: 10,
        marginRight: 10
    },
    header:{
        fontSize: 24,
        marginBottom: 10,
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
    },
    images:{
        alignContent:"center",
        marginLeft: 140,
        marginTop: 10,
        marginBottom: 5,
        alignContent: 'center',
        resizeMode: 'cover',
        
    }
})

export default CrearCategoriaScreen;