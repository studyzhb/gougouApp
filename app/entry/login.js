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
} from 'react-native'
var FontAwesomeIcon = require('react-native-vector-icons/FontAwesome')
var Register = require('./register')

var Login = React.createClass({
  getInitialState() {
    return {
      userName: '',
      password: '',
      showPassword: false,
      showRegisterModal: false,
    }
  },
  componentDidMount() {
  },
  _changeUserNameText(text) {
    this.setState({
      userName: text
    })
  },
  _changePasswordText(text) {
    this.setState({
      password: text
    })
  },
  _toggleShowPassword() {
    this.setState({
      showPassword: !this.state.showPassword
    })
  },
  _clearInput(textInput) {
    if(textInput == 'userName'){
      this.setState({userName: ''})
    }else if(textInput == 'password'){
      this.setState({password: ''})
    }
  },
  _showRegisterModal() {
    this.setState({showRegisterModal: true})
  },
  _closeRegisterModal() {
    this.setState({showRegisterModal: false})
  },
  _closeModal() {
    this.props.onClose()
  },
  _registerSuccess() {
    this._closeModal()
    this.props.onSuccess()
  },
  render() {
    return (
      <Modal
        animationType='slide'
        visible={this.props.visible}
        transparent={false} >
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeIcon} onPress={this._closeModal}>
              <FontAwesomeIcon name='close' size={20} color='#ffffff' />
            </TouchableOpacity>
            <Text style={styles.title}>欢迎登录</Text>
            <TouchableOpacity style={styles.thirdPartBox}>
              <View style={[styles.thirdPartItem,styles.thirdPartItemWeixin]} >
                <FontAwesomeIcon name='weixin' size={25} color='#ffffff' />
              </View>
              <View style={[styles.thirdPartItem,styles.thirdPartItemQq]} >
                <FontAwesomeIcon name='qq' size={25} color='#ffffff' />
              </View>
              <View style={[styles.thirdPartItem,styles.thirdPartItemWeibo]} >
                <FontAwesomeIcon name='weibo' size={25} color='#ffffff' />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.textInput}
                placeholder='手机号'
                placeholderTextColor='#868b91'
                maxLength={20}
                multiline={false}
                onChangeText={this._changeUserNameText}
                value={this.state.userName}
                editable={true}
                autoFocus={true}
                keyboardType='numeric'/>
              {
                this.state.userName
                ? <FontAwesomeIcon name='close' onPress={() => this._clearInput('userName')} size={15} color='#ffffff' style={styles.inputIcon}/>
                : null
              }
              <FontAwesomeIcon name='user' size={15} color='#ffffff' style={styles.inputIcon}/>
            </View>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.textInput}
                placeholder='密码'
                placeholderTextColor='#868b91'
                maxLength={20}
                multiline={false}
                onChangeText={this._changePasswordText}
                value={this.state.password}
                editable={true}
                autoFocus={true}
                password={!this.state.showPassword} />
              {
                this.state.password 
                ? <FontAwesomeIcon name='close' onPress={() => this._clearInput('password')} size={15} color='#ffffff' style={styles.inputIcon}/>
                : null
              }
              <FontAwesomeIcon name='eye' size={15} color='#ffffff' onPress={this._toggleShowPassword} style={styles.inputIcon}/>
            </View>
            <TouchableOpacity style={styles.loginBtn}>
              <Text style={styles.loginText}>登录</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.forgetPasswordBox}>
              <Text style={styles.forgetPasswordText}>忘记密码</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <View style={styles.footerBottomLine}></View>
            <TouchableOpacity style={styles.goRegisterBox} onPress={this._showRegisterModal}>
              <Text style={styles.goRegisterText}>还没账号？去注册一个</Text>
            </TouchableOpacity>
          </View>
          <Register visible={this.state.showRegisterModal} onClose={this._closeRegisterModal} onSuccess={this._registerSuccess}/>
        </View>
      </Modal>
    )
  },
})
const styles = require('../../styles/entry/login')
module.exports = Login 