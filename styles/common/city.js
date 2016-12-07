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
    width: windowWidth,
    height: windowHeight * .1,
    backgroundColor: '#ffffff',
    paddingTop: windowHeight * .06,
  },
  cancelBox: {
    marginLeft: 20
  },
  cancelText: {
    fontSize: 16,
    color: '#505050',
    fontWeight: '200'
  },
  searchBox: {
    width: windowWidth,
    height: windowHeight * .06,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f4f5f6',
  },
  searchInputBox: {
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff', 
    flexDirection: 'row',
    alignItems:'center',
    width: windowWidth - 60,
    height: windowHeight * .04,
    paddingLeft: 5,
  },
  searchIcon: {
    margin: 5,
    alignSelf: 'center'
  },
  searchInput: {
    flex:1,
    fontSize: 12,
  },
  deleteSearchBox: {
    alignSelf: 'center',
    width: 16,
    height: 16,
    borderRadius: 8,
    right: 10,
    marginLeft: 5,
    padding: 4,
    backgroundColor: '#000000',
    opacity: .5,
  },
  deleteSearchIcon: {
    alignSelf: 'center',
  },
  searchCancelText: {
    color: '#2a90d7',
    fontSize: 16,
  },
  listView: {
    backgroundColor: '#ffffff',
    paddingLeft: 20,
    width: windowWidth,
  },
  itemBox: {
    height: windowHeight * 0.07,
    borderBottomWidth: .5,
    borderColor: '#e8e8e8',
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemInfo: {
    flex: 1,
  },
  noTitleDisplay: {
    fontSize: 16,
    color: '#406599'
  },
  itemTitle: {
    fontSize: 16,
    color: '#2a2a2a',
    marginBottom: 5 
  },
  itemDesc: {
    fontSize: 14,
    color: '#a2a2a2'
  },
  selectedIcon: {
    right: 20
  },
})

module.exports = styles
