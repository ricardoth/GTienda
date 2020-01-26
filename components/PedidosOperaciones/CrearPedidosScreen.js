import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TextArea,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  DatePickerIOS,
  Image,
  ToastAndroid,
  Switch,
  //Picker,
  Alert
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Button, Picker, Form, Item, Label, Input,DatePicker } from "native-base";
import { Dropdown } from 'react-native-material-dropdown';
//import DatePicker from 'react-native-datepicker';
import apiPostPedido from '../Constantes/Constantes';

class CrearPedidosScreen extends Component {
    constructor(props){ 
    super(props);
    this.state = {
        fecha : '',
        monto: '',
        detalle: '',
        cliente: '',
        producto: '',
        estado: true,
        dataSource: [],
        listaClientes: [],
        listaProductos: [],
        chosenDate: new Date()
        }

        this.setDate = this.setDate.bind(this);

        this.getdataClientes = this.getdataClientes.bind(this);
        this.onChangeTextClientes = this.onChangeTextClientes.bind(this);

        this.getdataProductos = this.getdataProductos.bind(this);
        this.onChangeTextProductos = this.onChangeTextProductos.bind(this);
    }

    clearText = () => {
        this._textInput.setNativeProps({text: ''});
        this._textInput2.setNativeProps({text: ''});
      }

    setDate(newDate) {
        this.setState({ chosenDate: newDate });
      }

    getdataClientes(){
        var temp =[];
         fetch('http://10.52.101.135:45455/api/Cliente')
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
                    var joined = {value: data.id_cliente};
                    temp.push(joined);
                    
                }
             }
             //console.warn('categoria: ', JSON.stringify(temp));
             this.setState({
                listaClientes: temp
             }, function() {
             // do something with new state
             });
             })
             .catch((error) => {
             console.error(error);
             });
    }
    
    onChangeTextClientes(text){
        var temp = [];
         fetch('http://10.52.101.135:45455/api/Cliente')
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
                    var joined = {value: data.id_cliente};
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

    getdataProductos(){
        var temp =[];
         fetch('http://10.52.101.135:45455/api/Producto')
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
                    var joined = {value: data.id_producto};
                    temp.push(joined);
                    
                }
             }
             this.setState({
                listaProductos: temp
             }, function() {
             // do something with new state
             });
             })
             .catch((error) => {
             console.error(error);
             });
    }

    onChangeTextProductos(text){
        var temp = [];
         fetch('http://10.52.101.135:45455/api/Producto')
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
                    var joined = {value: data.id_producto};
                    temp.push(joined);
                   
                }
             }
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

    componentDidMount() {
        this.getdataClientes();
        this.getdataProductos();
    }


    validar = () => {
        const fec = this.state.fecha;
        const mon = this.state.monto;
        const det = this.state.detalle;
        const cli = this.state.cliente;
        const pro = this.state.producto;

        if (mon != "" && det != "" ) {
            this.crearPedido();
        } else {
            ToastAndroid.show('Debe llenar los campos! ' , ToastAndroid.SHORT)
        }
    }

    accionSwitch = () => this.setState(state => ({
        estado: !state.estado
    }))

    cargarApiPedidos(){
        return fetch('http://10.52.101.135:45455/api/Pedido')
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
    
    render(){
        return (
            <View style={{flex: 1, paddingTop: 5}}> 
            
            
            <Text style={{textAlign:"center", fontSize: 18, fontWeight: "bold"}}>Ingrese Pedido</Text>

            <DatePicker
                style={{paddingLeft: 40}}
                defaultDate={new Date(2019, 3, 20)}
                minimumDate={new Date(1991, 1, 1)}
                maximumDate={new Date(2030, 12, 31)}
                locale={"es"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Seleccione una fecha"
                textStyle={{ color: "black" }}
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                onDateChange={this.setDate}
                disabled={false}
            />
            <Text style={{marginLeft:10}}>
              Fecha: {this.state.chosenDate.toString().substr(4, 12)}
            </Text>

                        <Text style={styles.interiorTexto}>Detalle</Text> 
                            <TextInput 
                                ref={component => this._textInput = component}
                                style={styles.textInput}
                                onChangeText={(detalle) => this.setState({detalle})}
                            />

                            <Text style={styles.interiorTexto}>Monto</Text> 
                            <TextInput 
                                ref={component => this._textInput2 = component}
                                style={styles.textInput}
                                keyboardType = 'numeric'
                                onChangeText={(monto) => this.setState({monto})}
                            />
                 

                    <View style={{ width: 350, marginLeft:13 }}>
                        <Dropdown
                        label= "Clientes"
                        data={this.state.listaClientes}
                        onChangeText={(cliente) => this.setState({cliente})}
                        />
                    </View>  

                    <View style={{ width: 350, marginLeft:13 }}>
                        <Dropdown
                        label= "Productos"
                        data={this.state.listaProductos}
                        onChangeText={(producto) => this.setState({producto})}
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
    crearPedido = () => {
        //Fetch FALTA
        fetch('http://10.52.101.135:45455/api/Pedido', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                //fecha: this.state.fecha,
                fecha: this.state.chosenDate.toString().substr(4, 12),
                detalle: this.state.detalle,
                monto: this.state.monto,
                cliente: this.state.cliente,
                producto: this.state.producto,
                estado: this.state.estado
            })
        });
        this.clearText();
        ToastAndroid.show('Pedido Creado!' , ToastAndroid.SHORT);
        this.cargarApiPedidos();
        
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

export default  CrearPedidosScreen;