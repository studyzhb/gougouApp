'use strict'
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import {
  AppRegistry,
  StyleSheet,
  Text,
  Navigator,
  TouchableOpacity,
  TabBarIOS,
  View,
  AlertIOS,
  NetInfo
} from 'react-native'

var Home = require('../app/home/index.js')
var List = require('../app/list/index.js')
var Account = require('../app/account/index.js')

const networkInfo = {
    'none': '设备处于离线状态',
    'wifi': '当前正在使用Wifi网络',
    'cell': '当前正在使用移动网络',
    'unknown': '发生错误，网络状况不可知',
}

var Index = React.createClass({
  getInitialState() {
    return {
      selectedTab: 'list',
      notifCount: 0,
      presses: 0,
      connectionType: 'none',//网络连接状况
    }
  },
  componentWillMount: function() {
    NetInfo.addEventListener(
        'change',
        this._handleConnectionInfoChange
    );
  },
  componentWillUnmount: function() {
    NetInfo.removeEventListener(
        'change',
        this._handleConnectionInfoChange
    );
  },
  _handleConnectionInfoChange: function(connectionInfo) {
    //当前网络状态
    if(connectionInfo !== 'wifi') {
      AlertIOS.alert(networkInfo[connectionInfo])
    }

    this.setState({
      connectionType: connectionInfo
    });
  },
  _selectTab(tabName){
    this.setState({
      selectedTab: tabName
    })
  },
  render() {
    var navigator = this.props.navigator
    return (
      <TabBarIOS tintColor="#ee735c" style={{height: 100}}>
        <Icon.TabBarItemIOS
          title="首页"
          iconSize={30}
          iconName="ios-home-outline"
          selectedIconName="ios-home"
          selected={this.state.selectedTab === 'home'}
          onPress={() => this._selectTab('home')}>
          <Home navigator={navigator}/>
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="视频列表"
          iconName="ios-videocam-outline"
          selectedIconName="ios-videocam"
          selected={this.state.selectedTab === 'list'}
          onPress={() => this._selectTab('list')}>
          <List navigator={navigator}/>
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="我"
          iconName="ios-person-outline"
          selectedIconName="ios-person"
          selected={this.state.selectedTab === 'account'}
          onPress={() => this._selectTab('account')}>
          <Account navigator={navigator}/>
        </Icon.TabBarItemIOS>
      </TabBarIOS>
    )
  }
})

const styles = require('../styles/index')


module.exports = Index
