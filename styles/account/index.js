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
  header:{
    width: windowWidth,
    height: windowHeight * .25,
    backgroundColor: '#34394b',
    paddingTop: windowHeight * .05,   
  },
  me: {
    flexDirection: 'row',
    width: windowWidth,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginLeft: 20,
    marginRight: 10,
  },
  meInfo:{
    flex: 1,
    justifyContent: 'center',
  },
  meDesc:{
    flexDirection: 'row',
    marginBottom: 10
  },
  nickname: {
    fontSize: 16,
    color: '#ffffff',
    marginRight: 10
  },
  genderIconBox: {
    width: 20,
    height: 20,
    backgroundColor: '#14b4ff',
    borderRadius: 10,
  },
  genderIcon: {
    width: 10,
    height: 10,
    left: 5,
    top: 5,
  },
  meStatItemDivision: {
    marginHorizontal: 10,
    color: '#717581',
  },
  meStat: {
    flexDirection: 'row',
  },
  meStatItem: {
    fontSize: 14,
    color: '#717581',
  },
  mailIcon: {
    right: 10,
    width: 20,
    height: 20,
  },
  navs: {
    width: windowWidth,
    position:'absolute',
    bottom: 5,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  navItem: {
    flexDirection: 'row',
  },
  navItemTitle: {
    fontSize: 14,
    color: '#656876',
    marginRight: 5,
  },
  navItemNum: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    bottom: 2 
  },
  tabs: {
    flexDirection: 'row',
    width: windowWidth,
    height: windowHeight * .12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    marginBottom: 20
  },
  tabTitle: {
    fontSize: 14,
    color: '#2b333b'
  },
  contentItem: {
    marginTop: 10,
    backgroundColor: '#ffffff',
  },
  bar: {
    flexDirection: 'row',
    width: windowWidth,
    height: windowHeight * .07,
  },
  barItemIcon: {
    alignSelf: 'center',
    marginHorizontal: 15
  },
  itemTitle: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  itemText: {
    fontSize: 16,
    fontWeight: '200',
    color: '#41484f',
  },
  itemLine: {
    borderBottomWidth:1,
    borderColor: '#d9dde1'
  },
  barForwardIcon: {
    // position: 'absolute',
    marginRight: 10
  }












})

module.exports = styles