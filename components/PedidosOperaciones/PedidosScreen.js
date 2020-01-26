import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import { Container, Header, Title, Button, Icon, Left, Right, Body } from "native-base";
import Drawer from '../Drawer/Drawer';

class PedidosScreen extends Component {
  render() {
    return (
        <Container style={{flex: 1}}>

        <Header noShadow>
          <Left>
            <Button transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Header No Shadow</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Right>
        </Header>
           <TouchableHighlight style={{flex: 1}}
                                onPress={() => this.props.navigation.navigate('PedidosTabPage')}> 
                <Image source={require('../../images/pedidos.jpg')} style={styles.imagen}/>
          </TouchableHighlight>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
    imagen:{
        flex: 1,
        resizeMode: 'cover',
        padding: 0,
        justifyContent: 'center'
    }
});

export default PedidosScreen;