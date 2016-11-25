'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ActivityIndicator,
  AlertIOS,
  Image,
  ScrollView,
  ListView,
} from 'react-native'

var Video = require('react-native-video').default
var windowWidth = Dimensions.get('window').width
var Icon = require('react-native-vector-icons/Ionicons')
var request = require('../common/request')
var config = require('../common/config')

var Detail = React.createClass({
  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged : (r1, r2) => r1 !== r2})
    return {
      reate: 1,
      muted: false,
      resizeMode: 'contain',
      repeat: false,
      videoLoaded: false,
      paused: true,
      playing: false,

      videoOk: true,

      videoProgress: 0.01,
      videoLoadProgress: 0.01,
      videoTotal: 0,
      currentTime: 0,

      commentsDataSource: ds.cloneWithRows([])
    }
  },
  componentDidMount(){
    //获取评论列表数据
    this._fetchCommentsData(1)
  },
  _fetchCommentsData(page) {
    request.get(config.api.base + config.api.comments, {page: page})
    .then((data) => {
      console.log(data)
    })
    .catch((err) => {

      console.log("-----error-------", err)
    });
  },
  _pop() {
    this.props.navigator.pop()
  },
  _onLoadStart(data) {
  },
  _onLoad(data) {
    this.setState({
      videoTotal: data.duration
    })
  },
  _onProgress(data) {
    var duration = this.state.videoTotal
    var loadDuration = data.playableDuration 
    var currentTime = data.currentTime
    var percent = Number((currentTime / duration).toFixed(2))
    var loadPercent = Number((loadDuration / duration).toFixed(2))
    var _states = {
      currentTime: Number(data.currentTime.toFixed(2)),
      videoLoadProgress: loadPercent,
      videoProgress: percent
    }
    !this.state.videoLoaded ? _states.videoLoaded = true : null
    !this.state.playing ? _states.playing = true : null
    this.setState(_states)
  },
  _onEnd(data) {
    this.setState({
      videoProgress: 1,
      videoLoadProgress: 1,
      playing: false,
    })
  },
  _onError(err) {
    this.setState({
      videoOk: false
    })
    console.log(err)
  },
  _rePlay() {
    this.refs.videoPlayer.seek(0)
  },
  _pause() {
    if(!this.state.paused) {
      this.setState({
        paused: true
      })
    }
  },
  _resume() {
    if(this.state.paused) {
      this.setState({
        paused: false
      })
    }
  },
  _proceedPlay(){
    this.refs.proceedPlay.measure((a, b, width, height, px,py ) => console.log(width))
  },
  render() {
    var data = this.props.data
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBox} onPress={this._pop}>
            <Icon name='ios-arrow-back'size={30} style={styles.backIcon} />
            <Text style={styles.backText}>返回</Text> 
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOflines={1}> 视频详情页 </Text> 
          <Text style={styles.headerMore}>更多...</Text> 
        </View>
        <View style={styles.videoBox}>
          <Video
            ref='videoPlayer'
            source={{uri: 'http://oh180mogg.bkt.clouddn.com/1.mp4'}}
            style={styles.video}
            volume={5}
            paused={this.state.paused}
            rate={this.state.rate}
            muted={this.state.muted}
            resizeMode={this.state.resizeMode}
            repeat={this.state.repeat}
            onLoadStart={this._onLoadStart}
            onLoad={this._onLoad}
            onProgress={this._onProgress}
            onEnd={this._onEnd}
            onError={this._onError}
          />
          {
            !this.state.videoOk
            ? <Text style={styles.errorText}>视频出错了。。。</Text>
            : null
          }
          {
            //视频加载
            !this.state.videoLoaded ? <ActivityIndicator color='#ee735c' style={styles.loading}/> : null
          }
          {
            //播放控制
            this.state.videoLoaded && !this.state.playing
            ? <Icon 
                onPress={this._rePlay}
                name='ios-play'
                size={30}
                style={styles.playIcon} />
            : null
          }
          {
            //视频暂停
            this.state.videoLoaded && this.state.playing
            ? <TouchableOpacity style={styles.pauseBtn} onPress={this._pause}>
                {
                  this.state.paused
                  ? <Icon 
                      onPress={this._resume}
                      name='ios-play'
                      size={30}
                      style={styles.resumeIcon} />
                  : <Text></Text> 
                }
              </TouchableOpacity>
            : null
          }
          <TouchableOpacity ref='proceedPlay' style={styles.progressBox} onPress={this._proceedPlay}>
            <View style={[styles.loadProgressBar, {width: windowWidth * this.state.videoLoadProgress}]}>
              <View style={[styles.progressBar, {width: windowWidth * this.state.videoProgress}]}>
              </View>
            </View>
          </TouchableOpacity>
         </View>
         <ScrollView 
          enableEmptySections={true}
          showsVerticalScrollInsets={false}
          automaticallyAdjustContentInsets={false}
          style={styles.scrollView}>
          <View style={styles.infoBox}>
            <Image source={{uri: 'http://oh13njw2l.bkt.clouddn.com/1.jpg'}} style={styles.avatar} />
            <View style={styles.descBox}>
              <Text style={styles.nickname}>里的骄傲是来</Text>
              <Text style={styles.title}>大山里的骄傲是来得及案例三等奖爱丽丝爱神的箭asdlkas asd </Text>
            </View>
          </View>
         </ScrollView>
      </View>
    )
  }
})

var videoWidth = windowWidth
var videoHeight = windowWidth * 0.8
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
  playIcon: {
    position: 'absolute',
    width: 40,
    height: 40,
    left: videoWidth / 2 - 20,
    top: videoWidth / 2 - 20,
    paddingTop: 5,
    paddingLeft: 15,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: 'transparent',
    color: '#ed7b66'
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
    marginTop: 10,
    width: windowWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    margin: 5,
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  descBox: {
    flex: 1,
  },
  nickname: {
    fontSize: 18,
  },
  title: {
    marginTop: 8,
    fontSize: 16,
    color: '#666'
  },


})

module.exports = Detail 