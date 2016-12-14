'use strict'

var React = require('react') 
var ReactNative = require('react-native') 
var TouchableOpacity = ReactNative.TouchableOpacity
var View = ReactNative.View
var Text = ReactNative.Text
var Image = ReactNative.Image
var AlertIOS = ReactNative.AlertIOS
var Slider = ReactNative.Slider

var FontAwesomeIcon = require('react-native-vector-icons/FontAwesome')
var Video = require('react-native-video').default
var StyleSheet = ReactNative.StyleSheet
var Dimensions = ReactNative.Dimensions

var windowWidth = Dimensions.get('window').width

var Item = React.createClass({

  getInitialState() {

    return {
      paused: true,
      rate: 1,
      muted: true,
      resizeMode: 'contain',
      repeat: false,
      videoTouchedUp: false, //按下后控制显示
      startPlay: true,

      videoProgress: 0.01,
      videoLoadProgress: 0.01,
      videoTotal: 0,
      currentTime: 0,

      videoOk: true,

      videoUrl: '',

      slideProcess: 0,
      slideMaxValue: 100,
      slideMinValue: 0,
    }
  },
  componentWillMount() {
    var videoUrls = [
      'http://oh180mogg.bkt.clouddn.com/1.mp4',
      'http://oh180mogg.bkt.clouddn.com/IMG_1256.MOV',
      'http://oh180mogg.bkt.clouddn.com/IMG_1272.MOV',
      'http://oh180mogg.bkt.clouddn.com/IMG_1235.MOV',
      'http://oh180mogg.bkt.clouddn.com/IMG_1348.MOV',
      'http://oh180mogg.bkt.clouddn.com/IMG_1232.MOV',
    ]
    var url = videoUrls[Math.floor(Math.random() * videoUrls.length)]
    this.setState({
      videoUrl: url
    })
  },
  _onLoadStart(data) {
    console.log("_onLoadStart")
  },
  _onLoad(data) {
    console.log("_onLoad")
    this.setState({
      videoTotal: data.duration
    })
  },
  _onProgress(data) {
    console.log("_onProgress")
    var duration = this.state.videoTotal
    var loadDuration = data.playableDuration 
    var currentTime = data.currentTime
    var percent = Number((currentTime / duration).toFixed(2))
    var loadPercent = Number((loadDuration / duration).toFixed(2))
    var _states = {
      currentTime: Number(data.currentTime.toFixed(2)),
      videoLoadProgress: loadPercent,
      videoProgress: percent,
      slideProcess: percent * 100,
    }
    !this.state.videoLoaded ? _states.videoLoaded = true : null
    !this.state.playing ? _states.playing = true : null
    this.setState(_states)
  },
  _onEnd(data) {
    this.setState({
      videoTouchedUp: false,
      startPlay: true,
      videoProgress: 1,
      videoLoadProgress: 1,
      slideProcess: this.state.slideMaxValue
    })
  },
  _onEnd() {
    this.setState({
      videoTouchedUp: false,
      startPlay: true,
    }) 
  },
  _onSlidingComplete() {
    if(this.state.slideProcess !== this.state.slideMaxValue) {
      this.setState({
        slideProcess: this.state.slideMaxValue
      })
    }
  },
  _onValueChange(value) {
    this.videoPlayer.seek(this.state.videoTotal * value / this.state.slideMaxValue)
  },
  _showVideoTotalTime() {
    return (
      <View style={styles.videoDurationBox}>
        <Text style={styles.videoDurationText}>00:32</Text>
      </View>
    )
  },
  _showVideoCtrl() {
    return (
      <TouchableOpacity style={styles.playCtrlBox}>
        <Text style={styles.playCtrlTime}>00:14</Text>
        <Slider
          disabled={false}
          maximumValue={100}
          minimumTrackTintColor='#ff0000'
          minimumValue={0}
          onSlidingComplete={this._onSlidingComplete}
          onValueChange={this._onValueChange}
          step={5}
          style={styles.playCtrlSlide}
          value={this.state.slideProcess}
          />
        <Text style={styles.playCtrlTime}>00:15</Text>
        <TouchableOpacity onPress={this._toggleFullScreen}>
          <FontAwesomeIcon name='expand' color='#ffffff' size={10} style={styles.playCtrlFullScreen}/>
        </TouchableOpacity>
      </TouchableOpacity>
    )
  },
  _showPlayOrPause() {
    return (
      <TouchableOpacity style={styles.playBox} onPress={this._playOrPause}>
        <FontAwesomeIcon 
          name={this.state.paused ? 'play' : 'pause'} 
          size={20} 
          color='#ffffff' 
          style={this.state.paused ? styles.playIcon: null}/>
      </TouchableOpacity>
    )
  },
  _showVideoProgressBar() {
    return (
      <View style={styles.videoProgressBarBox}>
        <View style={[styles.videoProgressLoadBarValue, {width: windowWidth * this.state.videoLoadProgress}]}>
          <View style={[styles.videoProgressBarValue, {width: windowWidth * this.state.videoProgress}]}>
          </View>
        </View>
      </View>
    )
  },
  _playOrPause() {
    this.setState({
      paused: !this.state.paused
    })
  },
  _toggleFullScreen() {
    this.videoPlayer.presentFullscreenPlayer()
  },
  _touchVideoBox() {
    var _state = {
      videoTouchedUp: !this.state.videoTouchedUp
    }
    if(this.state.startPlay && this.state.paused) {
      _state.startPlay = false
      _state.paused = false
    }
    this.setState(_state)
  },
  render() {
    var data = this.props.data
    return (
      <View style={styles.itemBox}>
        <TouchableOpacity style={styles.videoBox} onPress={this._touchVideoBox}>
          <Video
            ref={(ref) => {this.videoPlayer = ref}}
            source={{uri: this.state.videoUrl}}
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
            (this.state.startPlay || this.state.videoTouchedUp) && <Text style={styles.itemTitle}>膜拜这位大叔，民间高手是这样过河的</Text>
          }
          {(this.state.startPlay || this.state.videoTouchedUp) && this._showPlayOrPause()}
          {this.state.startPlay && this._showVideoTotalTime()}
          {this.state.videoTouchedUp && this._showVideoCtrl()}
        </TouchableOpacity>
        {!this.state.videoTouchedUp && this._showVideoProgressBar()}
        <View style={styles.itemFooter}>
          <TouchableOpacity style={styles.itemFooterLeft}>
            <Image source={{uri: 'http://oh13njw2l.bkt.clouddn.com/avatar.jpg?imageView2/0/w/600/h/600'}} style={styles.itemAuthorAvatar}/>
            <Text style={styles.itemAuthorName}>我在这里等你</Text>
          </TouchableOpacity>
          <View style={styles.itemFooterRight}>
            <Text style={styles.itemPalyTimes}>35万次播放</Text>
            <TouchableOpacity style={styles.videoComment} onPress={this.props.onSelect}>
              <FontAwesomeIcon name='commenting' size={16} color='#999999' />
              <Text style={styles.videoCommentNum}>269</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.videoShare}>
              <FontAwesomeIcon name='ellipsis-h' size={16} color='#999999' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
})

const styles = require('../../styles/list/item')

module.exports = Item