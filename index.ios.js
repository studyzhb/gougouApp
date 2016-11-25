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
  View
} from 'react-native'

var List = require('./app/list/index.js')
var Edit = require('./app/edit/index.js')
var Account = require('./app/account/index.js')

var gougouApp = React.createClass({
  getInitialState() {
    return {
      selectedTab: 'account',
      notifCount: 0,
      presses: 0,
    }
  },
  _selectTab(tabName){
    this.setState({
      selectedTab: tabName
    })
  },
  render() {
    return (
      <TabBarIOS tintColor="#ee735c">
        <Icon.TabBarItemIOS
          title="首页"
          iconSize={30}
          iconName="ios-home-outline"
          selectedIconName="ios-home"
          selected={this.state.selectedTab === 'list'}
          onPress={() => this._selectTab('list')}>
          <Navigator
            initialRoute={{name: 'list', component: List }}
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
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="视频"
          iconName="ios-videocam-outline"
          selectedIconName="ios-videocam"
          selected={this.state.selectedTab === 'edit'}
          onPress={() => this._selectTab('edit')}>
          <Edit />
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="我"
          iconName="ios-person-outline"
          selectedIconName="ios-person"
          selected={this.state.selectedTab === 'account'}
          onPress={() => this._selectTab('account')}>
          <Account />
        </Icon.TabBarItemIOS>
      </TabBarIOS>
    )
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
})

AppRegistry.registerComponent('gougouApp', () => gougouApp)
