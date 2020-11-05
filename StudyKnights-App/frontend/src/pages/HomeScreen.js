// Homescreen.js
import React, { Component } from 'react';
import {SafeAreaView, StyleSheet, Dimensions, View, ScrollView} from 'react-native';
import image from '../../assets/ucfMap.png';
import ImageMapper from 'react-native-image-mapper';
import ImageViewer from 'react-native-image-zoom-viewer';

const imageSource = require('../../assets/ucfMap.png');
const MAPPING = [
  {
    id: '1',
    name: 'Student Union',
    shape: 'rectangle',
    width: 30,
    height: 10,
    x1: 180,
    y1: 155,
    prefill: 'red',
    fill: 'blue'
  },
]


export default class Home extends Component {
  render() {
    return (
      <View>
         <ImageMapper
        imgHeight={422}
        imgWidth={328}
        imgSource={imageSource}
        imgMap={MAPPING}
        onPress={(item, idx, event) => this.onAnyAreaPress(item, idx, event)}
        />
     </View>

      
    );
  }
};

const styles = StyleSheet.create({
  mapStyle: {
    flex: 1,
    flexDirection: 'column-reverse',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  description: {
    //margin: 15,
    fontSize: 15,
    fontFamily: 'monospace',
    padding: 5,
    color: 'white',
    backgroundColor: 'rgba(52, 52, 52, 1.0)'
  },
  rating: {
    //margin: 15,
    fontSize: 15,
    fontFamily: 'monospace',
    padding: 5,
    color: 'white',
    backgroundColor: 'rgba(52, 52, 52, 1.0)'
  },
});