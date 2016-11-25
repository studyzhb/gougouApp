'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'


var Edit = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Edit
        </Text>
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

module.exports = Edit