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
    }
  },
  _onLoad() {
    
  },
  _onProgress() {

  },
  _onEnd() {

  },
  _onError(err) {
    console.log(err)
  },
  _onSlidingComplete() {

  },
  _onValueChange(value) {

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
      <View style={styles.playCtrlBox}>
        <Text style={styles.playCtrlTime}>00:14</Text>
        <Slider
          disabled={false}
          maximumValue={100}
          minimumTrackTintColor='red'
          minimumValue={0}
          onSlidingComplete={this._onSlidingComplete}
          onValueChange={this._onValueChange}
          step={5}
          style={styles.playCtrlSlide}
          value={50}
          />
        <Text style={styles.playCtrlTime}>00:15</Text>
        <FontAwesomeIcon name='expand' color='#ffffff' size={10} style={styles.playCtrlFullScreen}/>
      </View>
    )
  },
  render() {
    var data = this.props.data
    return (
      <View style={styles.itemBox}>
        <TouchableOpacity style={styles.videoBox} onPress={this.props.onSelect}>
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
          <Text style={styles.itemTitle}>膜拜这位大叔，民间高手是这样过河的</Text>
          <View style={styles.playBox}>
            <FontAwesomeIcon name={true?'play':'pause'} size={20} color='#ffffff' style={true ? styles.playIcon: null}/>
          </View>
          {
            false 
            ? this._showVideoTotalTime()
            : this._showVideoCtrl()
          }
        </TouchableOpacity>
        <View style={styles.itemFooter}>
          <TouchableOpacity style={styles.itemFooterLeft}>
            <Image source={{uri: 'http://oh13njw2l.bkt.clouddn.com/avatar.jpg?imageView2/0/w/600/h/600'}} style={styles.itemAuthorAvatar}/>
            <Text style={styles.itemAuthorName}>我在这里等你</Text>
          </TouchableOpacity>
          <View style={styles.itemFooterRight}>
            <Text style={styles.itemPalyTimes}>35万次播放</Text>
            <TouchableOpacity style={styles.videoComment}>
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