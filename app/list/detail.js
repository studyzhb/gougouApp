'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  ActivityIndicator,
  AlertIOS,
  Image,
  ScrollView,
  ListView,
  Modal,
  TouchableHighlight,
} from 'react-native'

var Video = require('react-native-video').default
var windowWidth = Dimensions.get('window').width
var Icon = require('react-native-vector-icons/Ionicons')
var request = require('../common/request')
var config = require('../common/config')

var cacheResults = {
  comments: {
    list: [],
    nextPage: 1
  }
}
var Detail = React.createClass({
  getInitialState() {
    //重置数据
    cacheResults = {
      comments: {
        list: [],
        nextPage: 1
      }
    }
    var ds = new ListView.DataSource({rowHasChanged : (r1, r2) => r1 !== r2})
    return {
      reate: 1,
      muted: false,
      resizeMode: 'contain',
      repeat: false,
      videoLoaded: false,
      paused: false,
      playing: false,

      videoOk: true,

      videoProgress: 0.01,
      videoLoadProgress: 0.01,
      videoTotal: 0,
      currentTime: 0,

      commentsDataSource: ds.cloneWithRows([]),
      isLoadingComments: false,
      hasMoreComments: true,
  
      modalVisible: false, 
      commentContent: '',

    }
  },
  _pop() {
    this.refs.videoPlayer.seek(135)

    // this.props.navigator.pop()
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
    this.setState({
      paused: true
    })
  },
  _resume() {
    if(this.state.paused) {
      this.setState({
        paused: false
      })
    }
    if(this.state.videoProgress == 1) {
      this._rePlay()
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
            //视频播放控制
            this.state.videoLoaded
            ? <TouchableOpacity style={styles.pauseBtn} onPress={this._pause}>
                {
                  this.state.paused || this.state.videoProgress == 1
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
          <View style={styles.infoBox}>
            <Image source={{uri: 'http://oh13njw2l.bkt.clouddn.com/1.jpg?imageView2/0/w/200/h/200'}} style={styles.avatar} />
            <View style={styles.descBox}>
              <Text style={styles.nickname}>里的骄傲是来</Text>
              <Text style={styles.title}>大山里的骄傲是来得及案例三等奖爱丽丝爱神的箭asdlkas asd </Text>
            </View>
          </View>
          <View style={styles.commentArea}>
            <ListView
              dataSource={this.state.commentsDataSource}
              renderRow={this._renderCommentRow}
              renderFooter={this._renderCommentsFooter}
              automaticallyAdjustContentInsets={false}
              onEndReached={this._fetchMoreComments}
              onEndReachedThreshold={20}
              enableEmptySections={true}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View style={styles.bottomBox}>
            <TextInput
              placeholder='请评论...'
              placeholderTextColor='red'
              autoCorrect={true}
              autoFocus={false}
              editable={true}
              multiline={true}
              maxLength={200}
              onFocus={this._focusComment}
              style={styles.commentInput}
            />
          </View>
          <Modal
            animationType={"fade"}
            transparent={false}
            visible={this.state.modalVisible}
            onShow={this._onModalShow}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>请填写评论内容</Text>
              <TouchableHighlight onPress={() => {
                this._setModalVisible(!this.state.modalVisible)
              }}>
                <Icon
                  name='ios-close'
                  size={30}
                  style={styles.modalColseIcon}
                />
              </TouchableHighlight>
              <TextInput
                multiline={true}
                maxLength={200}
                style={styles.modalInput}
                onChange={this._changeCommentContent}
              />

              <TouchableOpacity 
                style={styles.commentSubmitBtn}
                onPress={this._submitComment}>
                <Text style={styles.commentSubmitBtnText}>评论</Text>
              </TouchableOpacity>
            </View>
          </Modal>

      </View>
    )
  },
  _changeCommentContent(event) {
    var text = event.nativeEvent.text
    this.setState({
      commentContent: text
    })
  },
  _submitComment() {
    this._setModalVisible(false)
  },
  _focusComment(){
    this.setState({
      modalVisible: true
    })
  },
  _setModalVisible(visible) {
    this.setState({
      modalVisible: visible
    })
  },
  componentDidMount(){
    //获取评论列表数据
    this._fetchCommentsData(cacheResults.comments.nextPage)
  },
  _hasMoreComments() {
    return this.state.hasMoreComments
  },
  _renderCommentsFooter(){
    if(this.state.isLoadingComments) {
      return null
    }
    if(!this._hasMoreComments()){
      return (
        <View style={styles.loadingMore}>
          <Text style={styles.loadingMoreText}>没有更多了</Text>
        </View>
      )
    }
    return (
      <ActivityIndicator
        animating={true}
        color={'#ee735c'}
        style={styles.loadingMore} />
    )
  },
  _fetchMoreComments(){
    if(!this.state.isLoadingComments && this._hasMoreComments()){
     this._fetchCommentsData(cacheResults.comments.nextPage)
    }
  },
  _fetchCommentsData(page) {
    this.setState({
      isLoadingComments: true,
    })
    var that = this
    var url = config.api.base + config.api.comments
    request.get(
      url,
      {
        page: page,

        take: 2,
        creationId: '5833f6f4ab266a18181c933e'
      }
    )
    .then((data) => {
      if(!data.status) {
        AlertIOS.alert('评论加载失败')
      }else{
        var _state = {}
        if(data.data.length > 0) {
          cacheResults.comments.list = cacheResults.comments.list.concat(data.data)
          cacheResults.comments.nextPage += 1
          _state.commentsDataSource = that.state.commentsDataSource.cloneWithRows(cacheResults.comments.list)
        } else {
          _state.hasMoreComments = false
        }
        _state.isLoadingComments = false
        that.setState(_state)
      }
    })
    .catch((err) => {
      that.setState({
        isLoadingComments: false,
        hasMoreComments: false
      })
      console.log("-----error-------", err)
    });
  },
  _renderCommentRow(row){
    var data = row
    return (
      <View style={styles.commentBox}>
        <Image source={{uri: 'http://oh13njw2l.bkt.clouddn.com/2.jpg?imageView2/0/w/100/h/100'}} style={styles.commentAvatar} />
        <View style={styles.commentInfo}>
          <View style={styles.commentTitle}>
            <Text style={styles.commentNickName}>{data.userId._id}</Text>
            <Icon name="ios-star-outline" size={20} style={styles.commentStar} />
          </View>
          <Text style={styles.commentContent}>{data.comment.content}</Text>
          <Text style={styles.commentTime}>{data.meta.createAt}</Text>
        </View>
      </View>
    )
  },

})

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

module.exports = Detail 