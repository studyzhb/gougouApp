'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
var Test = require('../list/detail')

var Account = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <Test data={1}/>
      </View>
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
})

module.exports = Account