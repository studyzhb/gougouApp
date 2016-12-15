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
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
var Storage = require('../common/storage')


var Setting = React.createClass({
  getInitialState() {
    return {
      defaultAvatar: null,
    }
  },
  componentDidMount() {
    this.setState({
      defaultAvatar: {uri: 'http://oh13njw2l.bkt.clouddn.com/defaultAvatar.jpg?imageView2/0/w/200/h/200'},
    })
  },
  _logout() {
    Storage.remove({key: 'loginState'})
    this.props.logoutCallback()
    this.props.navigator.pop() 
  },
  _back() {
    this.props.navigator.pop()
  },
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backIconBox} onPress={this._back}>
            <FontAwesomeIcon name='chevron-left' size={16} color='#ffffff' />
          </TouchableOpacity>
          <Text style={styles.title}>设置</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.contentItem}>
            <View style={styles.bar}>
              <Image source={this.state.defaultAvatar} style={styles.avatar} />
              <View style={styles.itemTitle}>
                <Text style={styles.itemText}>zhuifeng740643787</Text>
                <FontAwesomeIcon name='chevron-right' size={15} style={styles.barForwardIcon} color='#b7bbbf' />
              </View>
            </View>
          </View>
          <View style={styles.contentItem}>
            <View style={styles.bar}>
              <View style={styles.itemTitle}>
                <Text style={styles.itemText}>推送设置</Text>
                <FontAwesomeIcon name='chevron-right' size={15} style={styles.barForwardIcon} color='#b7bbbf' />
              </View>
            </View>
          </View>
          <View style={styles.contentItem}>
            <View style={styles.bar}>
            <View style={[styles.itemLine, styles.itemTitle]}>
                <Text style={styles.itemText}>清除缓存</Text>
                <Text style={styles.itemRightText}>814KB</Text>
              </View>
            </View>
            <View style={styles.bar}>
              <View style={styles.itemTitle}>
                <Text style={styles.itemText}>视频自动播放</Text>
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
          </View>
          <View style={styles.contentItem}>
            <View style={styles.bar}>
              <View style={[styles.itemLine, styles.itemTitle]}>
                <Text style={styles.itemText}>给我评分</Text>
                <FontAwesomeIcon name='chevron-right' size={15} style={styles.barForwardIcon} color='#b7bbbf' />
              </View>
            </View>
            <View style={styles.bar}>
            <View style={[styles.itemLine, styles.itemTitle]}>
                <Text style={styles.itemText}>意见反馈</Text>
                <FontAwesomeIcon name='chevron-right' size={15} style={styles.barForwardIcon} color='#b7bbbf' />
              </View>
            </View>
            <View style={styles.bar}>
              <View style={styles.itemTitle}>
                <Text style={styles.itemText}>关于APP</Text>
                <FontAwesomeIcon name='chevron-right' size={15} style={styles.barForwardIcon} color='#b7bbbf' />
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={this._logout} style={styles.logoutBox}>
            <Text style={styles.logoutText}>退出登录</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
})

const styles = require('../../styles/account/setting')

module.exports =Setting 