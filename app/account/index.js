'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,

} from 'react-native'
import IonIcons from 'react-native-vector-icons/Ionicons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

var Account = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.me}>
            <Image source={{uri: 'http://oh13njw2l.bkt.clouddn.com/avatar.jpg?imageView2/0/w/300/h/300'}} style={styles.avatar} />
            <View style={styles.meInfo}>
              <View style={styles.meDesc}>
                <Text style={styles.nickname}>zhuifeng740643787</Text>
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
          <View style={styles.bar}>
            <FontAwesomeIcon name='history' size={20} style={styles.barItemIcon} color='#14b4ff' />
            <View style={[styles.itemLine, styles.itemTitle]}>
              <Text style={styles.itemText}>历史记录</Text>
              <FontAwesomeIcon name='chevron-right' size={15} style={styles.barForwardIcon} color='#b7bbbf' />
            </View>
          </View>
          <View style={styles.bar}>
          <FontAwesomeIcon name='calendar-check-o' size={20} style={styles.barItemIcon} color='#ffa01e' />
            <View style={styles.itemTitle}>
              <Text style={styles.itemText}>我的路径</Text>
              <FontAwesomeIcon name='chevron-right' size={15} style={styles.barForwardIcon} color='#b7bbbf' />
            </View>
          </View>
        </View>
        <View style={styles.contentItem}>
          <View style={styles.bar}>
            <FontAwesomeIcon name='moon-o' size={20} style={styles.barItemIcon} color='#8adaff' />
            <View style={[styles.itemLine, styles.itemTitle]}>
              <Text style={styles.itemText}>夜间模式</Text>
              <FontAwesomeIcon name='chevron-right' size={15} style={styles.barForwardIcon} color='#b7bbbf' />
            </View>
          </View>
          <View style={styles.bar}>
            <FontAwesomeIcon name='gear' size={20} style={styles.barItemIcon} color='#73dfb3' />
            <View style={styles.itemTitle}>
              <Text style={styles.itemText}>设置</Text>
              <FontAwesomeIcon name='chevron-right' size={15} style={styles.barForwardIcon} color='#b7bbbf' />
            </View>
          </View>
        </View>
      </View>
    )
  }
})

const styles = require('../../styles/account/index')

module.exports = Account