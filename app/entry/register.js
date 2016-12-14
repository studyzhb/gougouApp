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
var request = require('../common/request')
var config = require('../common/config')
var Storage = require('../common/storage')

var Register = React.createClass({
  getInitialState() {
    return {
      mobile: '',
      imageVerifyCode: '',
      smsVerifyCode: '',
      password: '',

      validMobile: false,
      validImageVerifyCode: false,
      validSmsVerifyCode: false,
      validPassword: false,

      imageVerifyCodeSource: null,
      canFetchSmsVerifyCode: true,
      fetchingImageVerifyCode: false, 
      fetchingSmsVerifyCode: false, 
      smsVerifyCodeText: '获取验证码',

      submiting: false,

      showPassword: false,
    }
  },
  componentDidMount() {
  },
  _fetchImageVerifyCode(mobile) {
    if(this.state.fetchingImageVerifyCode) {
      return false
    }
    this.setState({fetchingImageVerifyCode: true})
    var url = config.api.base + config.api.imageVerifyCode
    var params = {
      mobile: mobile,
    }
    request.get(url, params)
    .then((ret) => {
      var _state = {fetchingImageVerifyCode : false}
      if(!ret.success) {
        AlertIOS.alert(ret.message)
        _state.validMobile = false 
        this.setState(_state)
        return false
      }
      _state.validMobile = true
      _state.imageVerifyCodeSource = {uri: ret.data.captcha.image}
      this.setState(_state)
    }).catch((err) => {
      this.setState({
        fetchingImageVerifyCode: false,
        validMobile: false
      })
      console.warn(err)
    })
  },
  _fetchSmsVerifyCode() {
    if(this.state.fetchingSmsVerifyCode) {
      return false
    }
    var that = this
    var totalSecs = 10
    var timeout = setInterval(function() {
      totalSecs--
      if(totalSecs == 0) {
        clearInterval(timeout)
        that.setState({
          smsVerifyCodeText: '重新获取',
          canFetchSmsVerifyCode: true,
        })
        return 
      }
      that.setState({
        smsVerifyCodeText: totalSecs + '秒后重试',
        canFetchSmsVerifyCode: false,
      })
    }, 1000)
    //request
    this.setState({fetchingSmsVerifyCode: true})
    var url = config.api.base + config.api.smsVerifyCode
    var params = {
      mobile: this.state.mobile,
      captcha: this.state.imageVerifyCode,
    }
    request.get(url, params)
    .then((ret) => {
      this.setState({fetchingSmsVerifyCode: false, })
      if(!ret.success) {
        AlertIOS.alert(ret.message)
        return false
      }
    }).catch((err) => {
      this.setState({fetchingSmsVerifyCode: false, })
      console.warn(err)
    })
  },
  _canSubmit() {
    return this.state.validMobile && this.state.validImageVerifyCode && this.state.validSmsVerifyCode && this.state.validPassword
  },
  _changeMobileText(text) {

    var _state = {mobile: text}
    var validMobile = /^1\d{10}$/.test(text)
    _state.validMobile = validMobile
    this.setState(_state)
    if(validMobile){
      this._fetchImageVerifyCode(text)
    }
  },
  _changeImageVerifyCodeText(text) {
    var _state = {imageVerifyCode: text}
    _state.validImageVerifyCode = /^\w{6}$/.test(text)
    this.setState(_state)
  },
  _changeSmsVerifyCodeText(text) {
    var _state = {smsVerifyCode: text}
    _state.validSmsVerifyCode = /^\w{6}$/.test(text)
    this.setState(_state)
  },
  _changePasswordText(text) {
    var _state = {password: text}
    _state.validPassword = /^\w{8,20}$/.test(text)
    this.setState(_state)
  },
  _toggleShowPassword() {
    this.setState({showPassword: !this.state.showPassword})
  },
  _clearInput(textInput) {
    switch(textInput) {
      case 'mobile':
        this.setState({
          mobile: '',
          validMobile: false,
        })
        break
      case 'imageVerifyCode':
        this.setState({
          imageVerifyCode: '',
          validImageVerifyCode: false,
        })
        break
      case 'smsVerifyCode':
        this.setState({
          smsVerifyCode: '',
          validSmsVerifyCode: false
        })
        break
      case 'password':
        this.setState({
          password: '',
          canSubmit: false
        })
        break
    }
  },

  _submit() {

    if(!this._canSubmit() || this.state.submiting) {
      return false
    }

    var that = this
    that.setState({submiting: true})
    var url = config.api.base + config.api.register
    var params = {
      mobile: this.state.mobile,
      code: this.state.smsVerifyCode,
      password: this.state.password,
    }
    request.get(url,params)
    .then((ret) => {
      that.setState({submiting: false})
      if(!ret.success) {
        AlertIOS.alert(ret.message)
        return
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
      })
      that.props.onClose()
      that.props.onSuccess()
    }).catch((err) => {
      console.warn(err)
      that.setState({submiting: false})
      return
    })
  },
  
  render() {
    return (
      <Modal
        animationType='fade'
        visible={this.props.visible}
        transparent={false} >
        <View style={styles.container}>
          <View style={styles.header}>
            <FontAwesomeIcon name='chevron-left' size={18} color='#ffffff' style={styles.backIcon} 
              onPress={this.props.onClose}/>
            <Text style={styles.title}>手机注册</Text>
          </View>
          <View style={styles.content}>
            <View style={styles.form}>
              {this._mobileBox()}
              {this.state.validMobile && this._imageVerifyCodeBox()}
              {this.state.validImageVerifyCode && this._smsVerifyCodeBox()}
              {this.state.validSmsVerifyCode && this._passwordBox()}
              {this._submitBtnBox()}
            </View>
          </View>
        </View>
      </Modal>
    )
  },
  _mobileBox() {
    return (
      <View style={styles.inputBox}>
        <TextInput
          placeholder='输入您的手机号'
          placeholderTintColor='#d8dadc'
          keyboardType='numeric'
          style={styles.textInput}
          multiline={false}
          editable={true}
          onChangeText={this._changeMobileText}
          maxLength={11}
          value={this.state.mobile}
          autoFocus={true}/>
        {
          this.state.mobile 
          ? <FontAwesomeIcon name='close' onPress={() => this._clearInput('mobile')} size={12} color='#cccccc' style={styles.tipIcon} />
          : null
        }
        <FontAwesomeIcon name='mobile' size={15} color='#cccccc' style={styles.tipIcon} />
      </View>
    )
  },
  _imageVerifyCodeBox() {
    return (
      <View style={styles.inputBox}>
        <TextInput
          placeholder='输入图片验证码'
          placeholderTintColor='#d8dadc'
          keyboardType='phone-pad'
          style={styles.textInput}
          multiline={false}
          editable={true}
          onChangeText={this._changeImageVerifyCodeText}
          value={this.state.imageVerifyCode}
          maxLength={6}/>
        {
          this.state.imageVerifyCode
          ? <FontAwesomeIcon name='close' size={12} onPress={() => this._clearInput('imageVerifyCode')} color='#cccccc' style={styles.tipIcon} />
          : null
        }
        <TouchableOpacity style={styles.imageVerifyCodeBox} onPress={() => this._fetchImageVerifyCode(this.state.mobile)}>
          {
            this.state.fetchingImageVerifyCode 
            ? <ActivityIndicator
                animating={true}
                style={styles.loadingImageVerifyCode}
                size="small"
              />
            : <Image style={styles.imageVerifyCode} source={this.state.imageVerifyCodeSource}/>
          }
        </TouchableOpacity>
      </View>
    )
  },
  _smsVerifyCodeBox() {
    return (
      <View style={styles.inputBox}>
        <TextInput
          placeholder='输入您收到的验证码'
          placeholderTintColor='#d8dadc'
          keyboardType='numeric'
          style={styles.textInput}
          multiline={false}
          editable={true}
          onChangeText={this._changeSmsVerifyCodeText}
          value={this.state.smsVerifyCode}
          maxLength={6}/>
        {
          this.state.smsVerifyCode
          ? <FontAwesomeIcon name='close' onPress={() => this._clearInput('smsVerifyCode')} size={12} color='#cccccc' style={styles.tipIcon} />
          : null
        }
        <TouchableOpacity 
          disabled={!this.state.canFetchSmsVerifyCode} 
          onPress={this._fetchSmsVerifyCode}
          style={styles.getSmsVerifyCodeBox}>
          <Text style={[styles.getSmsVerifyCodeText, !this.state.canFetchSmsVerifyCode && styles.disableGetSmsVerifyCodeText]}>{this.state.smsVerifyCodeText}</Text>
        </TouchableOpacity>
      </View>
    )
  },
  _passwordBox() {
    return (
      <View style={styles.inputBox}>
        <TextInput
          placeholder='输入要设置的密码'
          placeholderTintColor='#d8dadc'
          style={styles.textInput}
          multiline={false}
          editable={true}
          onChangeText={this._changePasswordText}
          password={!this.state.showPassword}
          value={this.state.password}
          maxLength={20}/>
        {
          this.state.password
          ? <FontAwesomeIcon name='close' onPress={() => this._clearInput('password')} size={12} color='#cccccc' style={styles.tipIcon} />
          : null
        }
        <FontAwesomeIcon name='eye' size={12} onPress={this._toggleShowPassword} color='#cccccc' style={styles.tipIcon} />
      </View>
    )
  },
  _submitBtnBox() {
    return (
      <TouchableOpacity 
        style={[styles.submitBtnBox, !this._canSubmit() && styles.disableSubmitBtnBox]} 
        onPress={this._submit}
        disabled={!this._canSubmit()}>
        {
          this.state.submiting
          ? <ActivityIndicator
              animating={true}
              style={styles.submiting}
              size="small"
            />
          : <Text style={styles.submitBtnText}>提交</Text>
        }
      </TouchableOpacity>
    )
  },
})
const styles = require('../../styles/entry/register')
module.exports = Register  