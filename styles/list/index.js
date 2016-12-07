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
    backgroundColor: '#f4f5f6',
  },
  header: {
    paddingTop: windowWidth * .08,
    paddingBottom: 10,
    backgroundColor: '#ffffff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#505050',
    textAlign: 'center'
  },
  loadingMore: {
    marginVertical: 20,
  },
  loadingMoreText: {
    color: '#777',
    textAlign: 'center'
  }, 
})

module.exports = styles
