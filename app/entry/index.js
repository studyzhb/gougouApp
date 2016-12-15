'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AlertIOS,
  TextInput,
  Image,
  Modal,
  ActivityIndicator,
} from 'react-native'
var FontAwesomeIcon = require('react-native-vector-icons/FontAwesome')

var Login = require('./login')
var Register = require('./register')

var Index = React.createClass({
  getInitialState() {
    return {
      showLoginModal: false,
      showRegisterModal: false,
      loginAnimationType: 'slide',
      registerAnimationType: 'fade',
    }
  },
  componentDidMount() {
    this.setState({showLoginModal: true})
  },
  _showLoginModal() {
    this.setState({
      showLoginModal: true
    })
  },
  _closeLoginModal() {
    this.setState({
      showLoginModal: false 
    })
    this.props.navigator.pop()
  },
  _showRegisterModal() {
    this.setState({
      showRegisterModal: true,
      showLoginModal: false, 
    })
  },
  _closeRegisterModal() {
    this.setState({
      loginAnimationType: 'none',
      showLoginModal: true, 
      showRegisterModal: false,
      registerAnimationType: 'none',
    })
  },
  _onSuccess() {
    this.props.loginSuccessCallBack()
    this.props.navigator.pop() 
  },
  render() {
    return (
      <View style={styles.container}>
        <Login 
          animationType={this.state.loginAnimationType}
          visible={this.state.showLoginModal} 
          onClose={this._closeLoginModal} 
          onGoRegister={this._showRegisterModal}
          onSuccess={this._onSuccess}/>
        <Register 
          animationType={this.state.registerAnimationType}
          visible={this.state.showRegisterModal} 
          onClose={this._closeRegisterModal} 
          onSuccess={this._onSuccess}/>
      </View>     
    )
  },
})

const styles = require('../../styles/entry/index')
module.exports = Index 