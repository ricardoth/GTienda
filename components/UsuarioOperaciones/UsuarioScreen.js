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

class UsuarioScreen extends Component {
  //quita barra de navegacion
  static navigationOptions = { header: null }
  render() {
    return (   
        <Container>
           <TouchableHighlight style={styles.container}
                                onPress={() => this.props.navigation.navigate('UsuarioTabPage')}> 
                                
                <Image source={require('../../images/prods.jpg')} style={styles.imagen}/>
                
          </TouchableHighlight>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
    imagen:{
        flex: 1,
        resizeMode: 'cover',
        padding: 0
    }
});

export default UsuarioScreen;