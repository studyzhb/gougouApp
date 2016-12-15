'use strict'

import {
  StyleSheet,
  Dimensions,
} from 'react-native'

var windowWidth = Dimensions.get('window').width
var windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(17,27,39,.8)'
  },
})

module.exports = styles