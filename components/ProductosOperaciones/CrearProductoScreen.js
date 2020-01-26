import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Switch,
  ToastAndroid,
  Alert
} from 'react-native';
import { Container, Header, Content, Textarea, Form, Picker, Item, Label, Input, Left,Body,Right, Title, Button, Icon } from "native-base";
import {DrawerNavigator, StackNavigator, TabNavigator} from 'react-navigation';
import { Dropdown } from 'react-native-material-dropdown';
import ProductosScreen from './ProductosScreen';
import apiProductos from '../Constantes/Constantes';

class CrearProductoScreen extends Component {
    //quita barra de navegacion
  //static navigationOptions = { header: null }
    constructor(props){
    super(props);
        this.state = {
            nom_prod: '',
            detalle: '',
            estado: true,
            precio: '',
            stock: '',
            categoria: '',
            listaCategorias: [],
            listaSubCategorias: []
        }
        this.getdata = this.getdata.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
    }

    clearText = () => {
        this._textInput.setNativeProps({text: ''});
        this._textInput2.setNativeProps({text: ''});
        this._textInput3.setNativeProps({text: ''});
        this._textInput4.setNativeProps({text: ''});
      }

    getdata(){
        var temp =[];
         fetch('http://10.52.101.135:45455/api/Categoria')
         .then((response) => response.json())
         .then((responseJson) => {
             var len = responseJson;
             var longitud = 0;
             var cont = Object.keys(responseJson).forEach(function (key) {
                 longitud++;
             })

             if(longitud > 0){
                for (let i = 0; i < longitud; i++) {
                    var data = responseJson[i];
                    var joined = {value: data.id_categoria};
                    temp.push(joined);
                    
                }
             }
             //console.warn('categoria: ', JSON.stringify(temp));
             this.setState({
                listaCategorias: temp
             }, function() {
             // do something with new state
             });
             })
             .catch((error) => {
             console.error(error);
             });
    }

     onChangeText(text){
         var temp = [];
          fetch('http://10.52.101.135:45455/api/Categoria')
          .then((response) => response.json())
          .then(responseJson => {
            var len = responseJson;
            var longitud = 0;
            var cont = Object.keys(responseJson).forEach(function (key) {
                longitud++;
            })
              if(longitud > 0){
                 for (let i = 0; i < longitud; i++) {
                     var data = responseJson[i];
                     var joined = {value: data.id_categoria};
                     temp.push(joined);
                    
                 }
              }
              //console.warn('categoria: ', JSON.stringify(temp));
              this.setState({
                 listaCategorias: temp
              }, function() {
              // do something with new state
              });
              })
              .catch((error) => {
              console.error(error);
              });
     }

    cargarApiProductos(){
        // alert('Entre')
         return fetch('http://10.52.101.135:45455/api/Producto')
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
        const nom = this.state.nom_prod;
        const det = this.state.detalle;
        const pre = this.state.precio;
        const sto = this.state.stock;
        const cat = this.state.categoria;
       

        if (nom != "" && det != "" && pre != "" && sto != "") {
            this.crearProducto();
        } else {
            ToastAndroid.show('Debe llenar los campos! ' , ToastAndroid.SHORT)
        }
    }

    accionSwitch = () => this.setState(state => ({
        estado: !state.estado
    }))

    componentDidMount() {
        this.getdata();
    }

    onValueChange = (value) => this.props.chooseItem(value)

    render(){
          return (
            <View style={{flex: 1, paddingTop: 20}}>
                <Text style={{textAlign:"center", fontSize: 18, fontWeight: "bold"}}>Ingrese Producto</Text> 
                            <Text style={styles.interiorTexto}>Nombre</Text> 
                            <TextInput 
                                ref={component => this._textInput = component}
                                style={styles.textInput}
                                onChangeText={(nom_prod) => this.setState({nom_prod})}
                            />

                        <Text style={styles.interiorTexto}>Detalle</Text> 
                            <TextInput 
                                ref={component => this._textInput2 = component}
                                style={styles.textInput}
                                onChangeText={(detalle) => this.setState({detalle})}
                            />

                 <Text style={styles.interiorTexto}>Precio Sin IVA</Text> 
                            <TextInput 
                                ref={component => this._textInput3 = component}
                                style={styles.textInput}
                                keyboardType = 'numeric'
                                onChangeText={(precio) => this.setState({precio})}
                            />

                <Text style={styles.interiorTexto}>Stock</Text> 
                            <TextInput 
                                ref={component => this._textInput4 = component}
                                style={styles.textInput}
                                keyboardType = 'numeric'
                                onChangeText={(stock) => this.setState({stock})}
                            />
            

                    <View style={{ width: 350, marginLeft:13 }}>
                    <Dropdown
                        label= "Categorías"
                        data={this.state.listaCategorias}
                        onChangeText={(categoria) => this.setState({categoria})}
                        />
                    </View>  

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
    crearProducto = () => {
        //Fetch
        fetch('http://10.52.101.135:45455/api/Producto', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nom_prod: this.state.nom_prod,
                detalle: this.state.detalle,
                estado: this.state.estado,
                precio: this.state.precio,
                stock: this.state.stock,
                categoria: this.state.categoria
                
            })
        });
        this.clearText();
        ToastAndroid.show('Producto Creado!' , ToastAndroid.SHORT);
        this.cargarApiProductos();
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

export default CrearProductoScreen;