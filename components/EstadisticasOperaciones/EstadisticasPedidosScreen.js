import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  //Text,
  View,
  ActivityIndicator,
  Flatlist,
  ListView,
} from 'react-native';
import { Container, Header, Content, Card, CardItem, 
    Text, 
    Body, Button, Icon, Right, List, ListItem } from "native-base";
import {DrawerNavigator, StackNavigator, TabNavigator} from 'react-navigation';
//import { Text } from 'react-native-svg';
import { PieChart, BarChart, Grid  } from 'react-native-svg-charts'
 import * as shape from 'd3-shape'

class EstadisticasPedidosScreen extends Component {
    static navigationOptions = {header : null}
    constructor(props){
    super(props);
        this.state = {
            graph: [],
            fuente: [],
            
        }
    }

    callGraphicIVA(){
        return fetch('http://10.52.101.135:45455/api/IVAGrafico')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                isLoading: false,
                graph: responseJson
            }, function() {
            // do something with new state
            //return fuente;
            });
            })
            .catch((error) => {
            console.error(error);
            });
    }

    callIvaIncluido(){
        return fetch('http://10.52.101.135:45455/api/IVAIncluido')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                isLoading: false,
                fuente: responseJson
            }, function() {
            // do something with new state
            //return fuente;
            });
            })
            .catch((error) => {
            console.error(error);
            });
    }

    callApiProductos(){
        return fetch('http://10.52.101.135:45455/api/Producto')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                isLoading: false,
                productos: responseJson
            }, function() {
            // do something with new state
            //return fuente;
            });
            })
            .catch((error) => {
            console.error(error);
            });
    }

    componentDidMount(){
       this.callGraphicIVA();
       this.callIvaIncluido();
       //this.callApiProductos();
    }

    render(){
        const grafico = this.state.graph;
        const conIva = this.state.fuente;
        const data = [10,2,42,51]

          const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)
 
          const pieData = grafico
              .filter(value => value > 0)
              .map((value, index) => ({
                  value,
                  svg: {
                      fill: randomColor(),
                      onPress: () => console.warn('Soy el n°: ', index),
                    
                 },
                 key: `pie-${index}`,
              }))

        const CUT_OFF = 20;
        const Labels = ({x,y, bandwith, data}) => (
            data.map((value, index) => (
                <Text
                key={index}
                x={x(index) + (bandwith / 2)}
                y={value < CUT_OFF ? y(value) -10: y(value) + 15}
                fontSize={14}
                fill={value >= CUT_OFF ? 'white': 'black'}
                alignmentBaseline={'middle'}
                textAnchor={'middle'}
                >{value}</Text>
            ))
        )
        
        return (
        <Container>
            <View style={{ height: 200, padding: 20 }}>
            <Text style={styles.text}>Gráfico de Productos con IVA</Text>
            <Card>
            <CardItem header>
                <Text>Iva Incluido</Text>
                </CardItem>
               <List dataArray={conIva}
                renderRow={(rowData) =>
                    <ListItem>
                        <Text>{rowData.precio}</Text>
                    </ListItem>
                }>
                </List> 
                </Card>
                      <PieChart
                            style={ { height: 200} }
                            data={ pieData }
                            showGrid= {true}
                            //innerRadius={ <Text>Hola</Text>}
                           
                        />  
                   {/* <BarChart
                        style={{flex: 1}}
                        data={data}
                        svg={{fill: 'rgba(134,65,244,0.8)'}}
                        contentInset={{top:10, bottom: 10}}
                        spacing={0.2}
                        gridMin={0}
                   >
                        <Grid direction={Grid.Direction.HORIZONTAL}/>
                        <Labels/> 
                   </BarChart> */}
                </View>
        </Container>
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
        marginBottom: 10,
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center'
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
    head: { 
        height: 40, 
        backgroundColor: '#E9F7EF' 
      },
    text: { 
        margin: 6,
        alignItems: 'center', 
        alignContent: 'center',
        color: '#000',
      },
    celda: {
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: "#CFD8DC",
        flexGrow: 1,
        paddingTop: 20,
        paddingBottom: 20,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 2,
        marginTop: 2,
        borderRadius: 1,
        textAlign: 'center',
        fontWeight: 'bold',
    }
  });

  export default EstadisticasPedidosScreen;