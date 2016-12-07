'use strict'

import {
  StyleSheet,
  Dimensions,
} from 'react-native'

var windowWidth = Dimensions.get('window').width
var windowHeight = Dimensions.get('window').height
var videoWidth = windowWidth
var videoHeight = windowWidth * .56

var styles = StyleSheet.create({
  itemBox: {
    width: windowWidth,
    marginBottom: 10,
    backgroundColor: '#fff' 
  },
  videoBox: {
    width: videoWidth,
    height: videoHeight,
    backgroundColor: '#000000',
  },
  video: {
    width: videoWidth,
    height: videoHeight,
  },
  itemTitle: {
    position: 'absolute',
    top: 15,
    left: 20,
    fontSize: 16,
    fontWeight: '200',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  playBox: {
    position: 'absolute',
    width: 40,
    height: 40,
    top: videoHeight / 2 - 20,
    left: videoWidth / 2 - 20,
    backgroundColor: 'rgba(0,0,0,.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: '#aea08f',
    borderWidth: .5,
  },
  playIcon: {
    marginLeft: 5,
  },
  videoDurationBox: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    backgroundColor: '#413525',
    padding: 5,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  videoDurationText: {
    fontSize: 12,
    color: '#ffffff'
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  itemFooterLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemAuthorAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },
  itemAuthorName: {
    fontSize: 14,
    color: '#303030'
  },
  itemFooterRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemPalyTimes: {
    fontSize: 12,
    color: '#999999',
    marginRight: 15,
  },
  videoComment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoCommentNum: {
    marginLeft: 2,
    fontSize: 12,
    color: '#999999'
  },
  videoShare: {
    marginLeft: 15,
    marginRight: 5,
  },
  playCtrlBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: videoWidth,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.5)',
    height: 50,
  },
  playCtrlTime: {
    fontSize: 12,
    color: '#ffffff',
    marginHorizontal: 10,
  },
  playCtrlSlide: {
    flex: 1,
    height: 2,
  },
  playCtrlFullScreen: {
    marginHorizontal: 10,
  },
})

module.exports = styles


