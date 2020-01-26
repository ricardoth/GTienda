import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import {Container, Header, Content, Button, Icon, Text } from 'native-base';
import { DrawerNavigator, StackNavigator, TabNavigator } from 'react-navigation';


export default class CuentasScreen extends Component {
  render() {
    return (
        <View style={{flex: 1}}>
           <TouchableHighlight style={{flex: 1}}
                                onPress={() => this.props.navigation.navigate('CuentasTabPage')}> 
                <Image source={require('../../images/usuarios.jpg')} style={styles.imagen}/>
          </TouchableHighlight>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    imagen:{
        flex: 1,
        resizeMode: 'cover',
        padding: 0
    }
});