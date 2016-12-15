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
var Register = require('./register')
var request = require('../common/request')
var config = require('../common/config')
var Storage = require('../common/storage')

var Login = React.createClass({
  getInitialState() {
    return {
      userName: '',
      password: '',
      showPassword: false,
      showRegisterModal: false,
      validUserName: false,
      validPassword: false,
      logining: false,
    }
  },
  componentDidMount() {
    var that = this
    Storage.get({key: 'loginHistory'}, function(data) {
      if(data && data.mobile) {
        that.setState({
          userName: data.mobile,
          validUserName: true,
        })
      }
    })
  },
  _changeUserNameText(text) {
    var _state = {userName: text}
    _state.validUserName = /^1\d{10}$/.test(text)
    this.setState(_state)
  },
  _changePasswordText(text) {
    var _state = {password: text}
    _state.validPassword = /^\w{8,20}$/.test(text)
    this.setState(_state)
  },
  _toggleShowPassword() {
    this.setState({
      showPassword: !this.state.showPassword
    })
  },
  _clearInput(textInput) {
    if(textInput == 'userName'){
      this.setState({
        userName: '',
        validUserName: false,
      })
    }else if(textInput == 'password'){
      this.setState({
        password: '',
        validPassword: false
      })
    }
  },
  _closeModal() {
    this.props.onClose()
  },
  _canLogin() {
    return this.state.validUserName && this.state.validPassword && !this.state.logining
  },
  _login() {
    if(!this._canLogin()) {
      return false
    }
    var that = this
    Storage.save({
      key: 'loginHistory',
      rawData: {
        mobile: that.state.userName
      },
      expires: null
    })
    that.setState({logining: true})
    var url = config.api.base + config.api.login
    var params = {
      userName: this.state.userName,
      password: this.state.password,
    }
    request.get(url, params)
    .then((ret) => {
      that.setState({logining: false})
      if(!ret.success) {
        AlertIOS.alert(ret.message)
        return false
      }
      var user = ret.data
      Storage.save({
        key: 'loginState',
        rawData: {
          mobile: user.mobile,
          avatar: user.avatar,//头像
          city: user.city,
          accessToken: user.accessToken,//访问token
          nickname: user.nickname,//昵称
          gender: user.gender,//性别
          age: user.age,//年龄
          desc: user.desc,//简介
          attentionNumber: user.attentionNumber,
          fansNumber: user.fansNumber,
          collectConditionNumber: user.collectConditionNumber,
        },
        expires: 1000 * 1200,
      })
      that.props.onSuccess()
    }).catch((err) => {
      console.warn(err)
      that.setState({logining: true})
    })

  },
  render() {
    return (
      <Modal
        animationType={this.props.animationType}
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
                autoFocus={false}
                keyboardType='number-pad'/>
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
            <TouchableOpacity 
              style={[styles.loginBtn, !this._canLogin() && styles.disableLoginBtn]} 
              onPress={this._login} 
              disabled={!this._canLogin()}>
              {
                !this.state.logining 
                ? <Text style={styles.loginText}>
                    登录
                  </Text>
                : <ActivityIndicator
                    animating={true}
                    style={styles.loginLoading}
                    size="small"
                  />
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.forgetPasswordBox}>
              <Text style={styles.forgetPasswordText}>忘记密码</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <View style={styles.footerBottomLine}></View>
            <TouchableOpacity style={styles.goRegisterBox} onPress={this.props.onGoRegister}>
              <Text style={styles.goRegisterText}>还没账号？去注册一个</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  },
})
const styles = require('../../styles/entry/login')
module.exports = Login 