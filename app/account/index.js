'use strict'

import React from 'react'
import {
  StyleSheet,
  Text,
  Switch,
  TouchableOpacity,
  View,
  Image,
  AlertIOS,
} from 'react-native'
import IonIcons from 'react-native-vector-icons/Ionicons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
var Condition = require('./create/condition')
var Storage = require('../common/storage')
var Entry = require('../entry/index')
var Setting = require('./setting')

var Account = React.createClass({
  getInitialState() {
    return {
      nightMode: false,
      defaultAvatar: null,
      unLoginBackImage: null,
      
      hasLogin: false,
      loginState: {},
    }
  },
  componentWillMount() {
    this._checkLoginState()
  },
  componentDidMount() {
    this.setState({
      defaultAvatar: {uri: 'http://oh13njw2l.bkt.clouddn.com/defaultAvatar.jpg?imageView2/0/w/200/h/200'},
      unLoginBackImage: {uri: 'http://oh13njw2l.bkt.clouddn.com/accountBack.jpg?imageView2/0/w/800/h/600'},
    })
  },
  _checkLoginState() {
    var that = this
    Storage.get('loginState', function(ret){
      that.setState({
        hasLogin: ret ? true : false,
        loginState: ret,
      })
    })
  },
  _pushToMakeCondition(){
    this.props.navigator.push({
      name: 'Condition',
      component: Condition,
      params: {
      }
    })
  },
  _pushToSetting() {
    if(!this.state.hasLogin){
      this._goLogin()
      return 
    }
    this.props.navigator.push({
      name: 'Setting',
      component: Setting,
      params: {
        logoutCallback: this._checkLoginState
      }
    })
  },

  _goLogin() {
    this.props.navigator.push({
      name: 'Entry',
      component: Entry,
      params: {
        loginSuccessCallBack: this._checkLoginState
      }
    })
  },
  render() {
    return (
      <View style={styles.container}>
        {
          this.state.hasLogin
          ? (
              <View style={styles.header}>
                <View style={styles.me}>
                  <Image source={this.state.defaultAvatar} style={styles.avatar} />
                  <View style={styles.meInfo}>
                    <View style={styles.meDesc}>
                      <Text style={styles.nickname}>{this.state.loginState.nickname || '未设置'}</Text>
                      <View style={styles.genderIconBox}>
                        <FontAwesomeIcon style={styles.genderIcon} name='mars' color='#ffffff' size={10} />
                      </View>
                    </View>
                    <View style={styles.meStat}>
                      <Text style={styles.meStatItem}>学习时长  339小时</Text>
                      <Text style={styles.meStatItemDivision}>|</Text>
                      <Text style={styles.meStatItem}>经验  13489</Text>
                    </View>
                  </View>
                  <FontAwesomeIcon name="envelope-o" size={20} color='#ffffff' style={styles.mailIcon}/>
                </View>
                <View style={styles.navs}>
                  <View style={styles.navItem}>
                    <Text style={styles.navItemTitle}>关注</Text>
                    <Text style={styles.navItemNum}>1</Text>
                  </View>
                  <Text style={styles.meStatItemDivision}>|</Text>
                  <View style={styles.navItem}>
                    <Text style={styles.navItemTitle}>粉丝</Text>
                    <Text style={styles.navItemNum}>0</Text>
                  </View>
                  <Text style={styles.meStatItemDivision}>|</Text>
                  <View style={styles.navItem}>
                    <Text style={styles.navItemTitle}>积分</Text>
                    <Text style={styles.navItemNum}>1</Text>
                  </View>
                </View>
              </View>
            )
            : (
              <Image style={[styles.headerUnLogin]} source={this.state.unLoginBackImage}>
                <TouchableOpacity style={styles.goLoginBox} onPress={this._goLogin}>
                  <Image source={this.state.defaultAvatar} style={styles.defaultAvatar} />
                  <Text style={styles.loginText}>点击登录</Text>
                </TouchableOpacity>
              </Image>
            )
          }
        <View style={styles.tabs}>
          <View style={styles.tabItem}>
            <FontAwesomeIcon name='qq' size={25} color='#14b4ff' style={styles.tabIcon} />
            <Text style={styles.tabTitle}>我的课程</Text>      
          </View>
          <View style={styles.tabItem}>
            <FontAwesomeIcon name='weixin' size={25} color='#ffa01e' style={styles.tabIcon} />
            <Text style={styles.tabTitle}>我的实战</Text>    
          </View>
          <View style={styles.tabItem}>
            <FontAwesomeIcon name='weibo' size={25} color='#20cc85' style={styles.tabIcon} />
            <Text style={styles.tabTitle}>我的猿问</Text>  
          </View>
          <View style={styles.tabItem}>
            <FontAwesomeIcon name='twitter' size={25} color='#14b4ff' style={styles.tabIcon} />
            <Text style={styles.tabTitle}>我的手记</Text>  
          </View>
        </View>
        <View style={styles.contentItem}>
          <TouchableOpacity style={styles.bar}>
            <FontAwesomeIcon name='history' size={20} style={styles.barItemIcon} color='#14b4ff' />
            <View style={[styles.itemLine, styles.itemTitle]}>
              <Text style={styles.itemText}>历史记录</Text>
              <FontAwesomeIcon name='chevron-right' size={15} style={styles.barForwardIcon} color='#b7bbbf' />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._pushToMakeCondition} style={styles.bar}>
            <FontAwesomeIcon name='calendar-check-o' size={20} style={styles.barItemIcon} color='#ffa01e' />
            <View style={styles.itemTitle}>
              <Text style={styles.itemText}>发一个</Text>
              <FontAwesomeIcon name='chevron-right' size={15} style={styles.barForwardIcon} color='#b7bbbf' />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.contentItem}>
          <View style={styles.bar}>
            <FontAwesomeIcon name='moon-o' size={20} style={styles.barItemIcon} color='#8adaff' />
            <View style={[styles.itemLine, styles.itemTitle]}>
              <Text style={styles.itemText}>夜间模式</Text>
              <Switch 
                onValueChange={() => {
                  this.setState({
                    nightMode: !this.state.nightMode
                  })
                }}
                value={this.state.nightMode}
                onTintColor='red'
                thumbTintColor='#f9f9f9'
                tintColor='#e3e3e3'
                style={styles.nightMode}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.bar} onPress={this._pushToSetting}>
            <FontAwesomeIcon name='gear' size={20} style={styles.barItemIcon} color='#73dfb3' />
            <View style={styles.itemTitle}>
              <Text style={styles.itemText}>设置</Text>
              <FontAwesomeIcon name='chevron-right' size={15} style={styles.barForwardIcon} color='#b7bbbf' />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
})

const styles = require('../../styles/account/index')

module.exports = Account