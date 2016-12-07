import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  AlertIOS,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Animated,
  PanResponder
} from 'react-native';

import Swiper from 'react-native-swiper';
var windowWidth = Dimensions.get('window').width
var windowHeight = Dimensions.get('window').height

var styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    width: windowWidth,
    height: windowHeight/2,
  }
})

var swiper = React.createClass({
  
  _renderPagination(index,total,contxt) {
    return (
      <View style={{backgroundColor:'red',position:'absolute', width:100, height: 50,left: 100,top: 10}}>
        <Text style={{backgroundColor:'red',position:'absolute',left: 100,top: 10}}>{index+1}/{total}</Text>
        <Text onPress={this.props.close} style={{backgroundColor:'red',position:'absolute',left: 100,top: 50}}>关闭</Text>
      </View>
    )
  },
  getInitialState() {
    return {
      fadeAnimWidth: new Animated.Value(0),
      
    }
  },
  componentDidMount() {
    Animated.timing(this.state.fadeAnimWidth, {
          toValue: 1,
          duration: 100,
          // easing: Easing.linear
    }).start();
  },
  _close() {
    AlertIOS.alert('123')
  },
  render: function() {
    return (
      <Animated.View 
        style={{
          opacity: this.state.fadeAnimWidth,

        }}
        >
      <Swiper 
        renderPagination={this._renderPagination}
        index={0}
        showsButtons={false}>
        <View style={styles.slide}>
          <Image resizeMode='stretch' source={{uri: 'http://oh13njw2l.bkt.clouddn.com/1.jpg?imageView2/0/w/300/h/300'}} style={styles.image} />
        </View>
        <TouchableOpacity onPress={this.props.close}  style={styles.slide}>
          <Image source={{uri: 'http://oh13njw2l.bkt.clouddn.com/2.jpg?imageView2/0/w/300/h/300'}} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.slide}>
          <Image source={{uri: 'http://oh13njw2l.bkt.clouddn.com/3.jpg?imageView2/0/w/300/h/300'}} style={styles.image} />
        </View>
      </Swiper>
      </Animated.View>
    )
  }
})
module.exports = swiper