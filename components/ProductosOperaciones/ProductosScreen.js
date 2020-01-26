import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import {Container, Header, Content, Button, Icon, Text, Left } from 'native-base';
import { DrawerNavigator, StackNavigator, TabNavigator } from 'react-navigation';
import ProductoTabPage from '../ProductosOperaciones/ProductosTabPage';

class ProductosScreen extends Component {
  //quita barra de navegacion
  //static navigationOptions = { header: null }
  render() {
    return (   
        <Container style={styles.container}>
        <Text style={{textAlign:"center", fontSize: 18, fontWeight: "bold"}}>Bienvenido</Text> 
            <TouchableHighlight
                                style={{backgroundColor:'#ff5722'}}
                                onPress={() => this.props.navigation.navigate('ProductoTabPage')}> 
                                
                {/* <Image source={require('../../images/prods.jpg')} style={styles.imagen}/> */}
                
          </TouchableHighlight> 
        </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#2196F3'
  },
    imagen:{
        flex: 1,
        resizeMode: 'cover',
        padding: 0
    }
});

export default ProductosScreen;