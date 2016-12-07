'use strict'

import {
  StyleSheet,
  Dimensions,
} from 'react-native'

var windowWidth = Dimensions.get('window').width
var windowHeight = Dimensions.get('window').height

var videoWidth = windowWidth
var videoHeight = windowWidth * 0.56
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  header:{
    width: windowWidth,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#ee735c',
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    backgroundColor: '#fff'
  },
  backBox: {
    flexDirection: 'row',
    position: 'absolute',
    left: 12,
    bottom: 5,
    width: 50,
    alignItems: 'center',
  },
  headerTitle: {
    width: windowWidth - 120,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
  },
  backIcon: {
    color: '#999',
    fontSize: 20,
    marginRight: 5
  },
  backText: {
    fontSize: 14,
    color: '#999',
  },
  headerMore: {
    position: 'absolute',
    right: 10,
    fontSize: 14,
    top: 32,
  },

  videoBox:{
    width: videoWidth,
    height: videoHeight,
    backgroundColor: '#000'
  },
  video: {
    width: videoWidth,
    height: videoHeight,
  },
  loading: {
    position: 'absolute',
    left: 0,
    top: videoHeight / 2,
    width: videoWidth,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  progressBox:{
    width: windowWidth,
    height: 3,
    backgroundColor: '#fff'
  },
  progressBar: {
    width: 1,
    height: 3,
    backgroundColor: '#ee735c'
  },
  loadProgressBar: {
    width: 1,
    height: 3,
    backgroundColor: '#ccc'
  },
  pauseBtn: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: videoWidth,
    height: videoHeight
  },
  resumeIcon: {
    width: 40,
    height: 40,
    left: videoWidth / 2 - 20,
    top: videoHeight / 2 - 20,
    paddingTop: 5,
    paddingLeft: 15,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: 'transparent',
    color: '#ed7b66'
  },
  errorText: {
    position: 'absolute',
    width: windowWidth,
    height: 30,
    fontSize: 14,
    fontWeight: '200',
    color: 'red',
    alignSelf: 'center',
    left: videoWidth / 2 - 40,
    top: videoHeight / 2 + 20,
  },
  infoBox: {
    marginTop: 3,
    width: windowWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: '#fff'
  },
  avatar: {
    margin: 5,
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  descBox: {
    flex: 1,
    marginHorizontal: 10
  },
  nickname: {
    fontSize: 16,
  },
  title: {
    marginTop: 8,
    fontSize: 14,
    color: '#666'
  },
  commentArea: {
    flex: 1,
    width: windowWidth
  },
  commentBox: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginHorizontal: 5, 
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 10
  },
  commentInfo: {
    flex: 1
  },
  commentTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
  },
  commentNickName: {
    fontSize: 14
  },
  commentStar: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 10
  },
  commentContent: {
    fontSize: 12,
    color: '#ccc'
  },
  commentTime: {
    fontSize: 10,
    color: '#666',
    textAlign: 'right',
    paddingRight: 10,
    marginVertical: 5,
  },
  loadingMoreText: {
    alignSelf: 'center',
    fontSize: 14,
    color: '#666',
    marginVertical: 5
  },
  bottomBox: {
    position: 'absolute',
    bottom: 48,
    width: windowWidth,
    backgroundColor: '#fff'
  },
  commentInput: {
    width: windowWidth * 0.5,
    minHeight: 30,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 5,
    fontSize: 12,
    marginVertical: 2,
    alignSelf: 'flex-start',
    padding: 5
  },
  //modal
  modalBox: {
    flex: 1,
    width: windowWidth,
    height: 300,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: windowWidth * .2,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '500',
    alignSelf: 'center'
  },
  modalColseIcon: {
    width: 40,
    height: 40,
    color: 'red',
    paddingLeft: 13,
    paddingTop: 5,
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 20,
    borderColor: '#ee735c',
    borderWidth: 1,
  },
  modalInput: {
    width: windowWidth * .9,
    height: 60,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    alignSelf: 'center',
    borderRadius: 5,
    color: 'red',
    fontSize: 14
  },
  commentSubmitBtn: {
    width: windowWidth * 0.8,
    height: 50,
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ee735c',
    marginHorizontal: 10,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee'
  },
  commentSubmitBtnText: {
    fontSize: 18,
    color: '#ee735c',
    fontWeight: '600'
  }

})


module.exports = styles
