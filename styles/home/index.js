'use strict'

import {
  StyleSheet,
  Dimensions,
} from 'react-native'

var windowWidth = Dimensions.get('window').width
var windowHeight = Dimensions.get('window').height

var itemWidth = windowWidth - 20
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  header: {
    width: windowWidth,
    height: windowHeight * .1,
    backgroundColor: '#d43d3d',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  title: {
    marginHorizontal: 15,
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: windowHeight * .02,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: windowHeight * .05,
    backgroundColor: '#ffffff',
    marginBottom: windowHeight * .02,
    marginRight: 15,
    borderRadius: 5,
    padding: 5,
  },
  searchIcon: {
    alignSelf: 'center',
    marginHorizontal: 5,
  },
  searchInput: {
    flex:1,
    marginRight: 10,
  },
  clearIconBox: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#000000',
    opacity: .5,
    justifyContent: 'center',
  },
  clearSearchIcon: {
    alignSelf: 'center',
    color: '#ffffff'
  },
  navs: {
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth,
    height: windowHeight * .06,
    paddingLeft: 10,
    backgroundColor: '#f6f5f4',
    overflow: 'hidden',
  },
  navItemBox: {
    paddingHorizontal: 5,
    margin: 0,
  },
  navItemTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  activeNavItemTitle: {
    color: 'red',
  },
  hotDot: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'red',
  },
  navPlusBox: {
    position: 'absolute',
    width: windowHeight * .06,
    height: windowHeight * .06 - 10,
    right: 0,
    top: 5,
    backgroundColor: 'rgba(246,245,244, .8)',
    borderLeftWidth: 1,
    borderColor: '#e8e8e8',
    justifyContent: 'center',
  },
  navPlus: {
    alignSelf: 'center',
    fontWeight: '100',
    color: '#222222'
  },
  itemBox: { 
    flexDirection: 'row',
    width: itemWidth,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderBottomWidth: .5,
    borderColor: '#e8e8e8',
  },
  itemInfo: {
    flex: 1,
    flexWrap: 'wrap',
    marginVertical: 5,
    width: windowWidth * .7,
  },
  itemTitle: {
    fontSize: 18,
    letterSpacing: 0,
    lineHeight: 22,
    fontWeight: '400',
    flexWrap: 'wrap',
    marginBottom: 5,
    marginRight: 5,
  },
  itemTipBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 20,
  },
  tipText: {
    fontSize: 14,
    color: '#999999',
  },
  itemCloseBox: {
    width: 16,
    height: 12,
    borderRadius: 4,
    borderWidth: .5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#c3c3c3',
  },
  itemSingleImage: {
    width: windowWidth * .3,
    height: windowWidth * .2,
    resizeMode: 'cover',
    marginLeft: 10,
  },
  itemMultiImageBox: {
    flexDirection: 'row',
    width: itemWidth,
    marginVertical: 5,
    justifyContent: 'space-between'
  },
  itemMultiImage: {
    width: parseInt((windowWidth - 30) / 3),
    height: parseInt((windowWidth - 30) / 4),
    resizeMode: 'cover',
  },
  vdieoBox: {
    width: itemWidth,
    height: itemWidth * .6,
    marginVertical: 5,
  },
  itemVedioThumb: {
    width: itemWidth,
    height: itemWidth * .6,
    resizeMode: 'cover',
  },
  playBox: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,.5)',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    left: itemWidth / 2 - 20,
    top: (itemWidth * .6)/ 2 - 20,
  },
  playIcon: {
    marginLeft: 5,
  },
  vdieoDuiationBox: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0, .5)',
  },
  vdieoDuiationText: {
    fontSize: 10,
    color: '#ffffff'
  },

  modalBox: {
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  modalContent: {
    position: 'absolute',
    width: itemWidth, 
    marginHorizontal: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10
  },
  modalTitleBox: {
    marginVertical: 5,
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#505050',
  },
  modalBtnBox: {
    height: 40,
    backgroundColor: 'red',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  modalBtn: {
    fontSize: 18,
    color: '#ffffff',
  },
  modalOptionBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: itemWidth - 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  modalOption: {
    width: (itemWidth - 40) / 2,
    height: 40,
    margin: 5,
    padding: 5,
    borderRadius: 8,
    borderWidth: .5,
    borderColor: '#e8e8e8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOptionText: {
    fontSize: 16,
    fontWeight: '200',
    color: '#505050',
  },
  modalPopBox: {
    position: 'absolute',
    top: 120,
    right: 30,
    height: 30,
    width: 30,
    backgroundColor: '#ffffff',
  }

})

module.exports = styles
