import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ListView
} from 'react-native';
import {DrawerNavigator, StackNavigator, TabNavigator} from 'react-navigation';
import CuentasScreen from './CuentasScreen';
import apiCuentas from '../Constantes/Constantes';

class ListarCuentasScreen extends Component {
    constructor(props){
    super(props);
        this.state = {
            isLoading: true
        }
    }

    //Antes de renderizar se utiliza componentWillMount
    componentWillMount(){
        //LLama al api
        return fetch('http://192.168.1.34:45455/api/Cuenta')
        .then((response) => response.json())
        .then((responseJson) => {
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                isLoading: false,
                dataSource: ds.cloneWithRows(responseJson),
            }, function() {
            // do something with new state
            });
            })
            .catch((error) => {
            console.error(error);
            });
    }

    render(){
        if (this.state.isLoading) {
            return (
            <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
            </View>
            );
        }
            return (
            <View style={{flex: 1, paddingTop: 20}}>
            <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text style={styles.celda}>{rowData.nombre} {rowData.apellido}</Text>}
            />
            </View>
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
        marginBottom: 60,
        color: '#ffff',
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
        backgroundColor: '#D4E6F1',
        padding: 15,
        alignItems: 'center',
        borderRadius: 4
    },
    head: { height: 40, backgroundColor: '#E9F7EF' },
    text: { margin: 6,alignItems: 'center', },
    celda: {
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: "#CFD8DC",
        flexGrow: 1,
        paddingTop: 20,
        paddingBottom: 20,
        textAlign: 'center'
    }
  });

  export default ListarCuentasScreen;