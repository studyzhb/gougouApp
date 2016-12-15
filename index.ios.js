'use strict'
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react'
import {
  AppRegistry,
  NetInfo,
  Navigator,
} from 'react-native'

var Index = require('./app/index')
var Storage = require('./app/common/storage')


var gougouApp = React.createClass({
  getInitialState() {
    return {
      selectedTab: 'account',
      notifCount: 0,
      presses: 0,
      connectionType: 'none',//网络连接状况
    }
  },
  componentWillMount: function() {
    Storage.init()
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
    return (
      <Navigator
        initialRoute={{name: 'index', component: Index}}
        configureScene={
          (route) => {
            return Navigator.SceneConfigs.FloatFromRight
          }
        }
        renderScene={
          (route, navigator) => {
            var Component = route.component
            return <Component {...route.params} navigator={navigator} />
          }
        }
      />
    )
  }
})

AppRegistry.registerComponent('gougouApp', () => gougouApp)
