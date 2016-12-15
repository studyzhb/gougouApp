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
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    width: windowWidth,
    height: windowHeight * .1,
    backgroundColor: '#34394b',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  backIconBox: {
    position: 'absolute',
    left: 10,
    bottom: 10,
  },
  title: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '400',
    color: '#ffffff',
  },
  content: {
    flex: 1,
  },
  contentItem: {
    marginTop: 15,
    backgroundColor: '#ffffff',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth,
    paddingHorizontal: 15,
  },
  avatar: {
    width: windowWidth * .14,
    height: windowWidth * .14,
    borderRadius: windowWidth * .07,
    marginVertical: 5,
  },
  itemTitle: {
    flexDirection: 'row',
    height: windowHeight * .07,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  itemLine: {
    borderBottomWidth: .5,
    borderColor: '#f8fafb',
  },
  itemText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#41484f',
  },
  barForwardIcon: {
    marginRight: 5 
  },
  itemRightText: {
    marginRight: 5,
    fontSize: 14,
    color: '#cfd1d3',
  },
  nightMode: { 
    right: 10, 
    shadowColor: '#f0f0f0', 
    shadowOffset: { 
      width: 3, 
      height: 3 
    },
    shadowOpacity: .8,
    shadowRadius: 2
  },
  logoutBox: {
    width: windowWidth * .9,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
    borderWidth: .2,
    borderColor: '#f8fafb',
    backgroundColor: '#ffffff',
  },
  logoutText: {
    fontSize: 18,
    color: '#ff0000',
  },
})

module.exports = styles
