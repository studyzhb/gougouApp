'use strict'

var React = require('react') 
var ReactNative = require('react-native') 
var TouchableHighlight = ReactNative.TouchableHighlight
var View = ReactNative.View
var Text = ReactNative.Text
var Image = ReactNative.Image
var AlertIOS = ReactNative.AlertIOS
var Icon = require('react-native-vector-icons/Ionicons')
var StyleSheet = ReactNative.StyleSheet
var Dimensions = ReactNative.Dimensions

var windowWidth = Dimensions.get('window').width

var Item = React.createClass({
  getInitialState() {
    return {
      love: false
    }
  },
  _love() {
    this.setState({
      love: !this.state.love
    })
    var creationId = this.refs.creationId.props.value
    AlertIOS.alert(creationId)
    
  },
  render() {
    var data = this.props.data
    return (
        <View style={styles.item}>
          <TouchableHighlight onPress={this.props.onSelect}>
            <View>
              <Text style={styles.itemTitle}>{data.title}</Text>
              <Image
                source={{uri: data.thumb}}
                style={styles.thumb} >
                <Icon 
                  name='ios-play'
                  size={28}
                  style={styles.playIcon}/>
              </Image>
            </View>  
          </TouchableHighlight>
          <View style={styles.itemFooter}>
            <TouchableHighlight ref="creationId" value={data._id} onPress={this._love}>
              <View style={styles.handleBox}>
                <Icon
                  name={this.state.love ? 'ios-heart' : 'ios-heart-outline'}
                  size={28}             
                  style={styles.heartIcon} />
                <Text style={styles.handleText}>喜欢</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.props.onSelect}>
              <View style={styles.handleBox}>
                <Icon
                  name='ios-chatboxes-outline'
                  size={28}             
                  style={styles.commentIcon} />
                <Text style={styles.handleText}>评论</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      
    )
  }
})
var styles = StyleSheet.create({
  item: {
    width: windowWidth,
    marginBottom: 10,
    backgroundColor: '#fff' 
  },
  thumb: {
    width: windowWidth,
    height: windowWidth * 0.6,
    resizeMode: 'cover'
  },
  itemTitle: {
    fontSize: 18,
    padding: 10,
    color: '#333'
  },
  playIcon: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    width: 46,
    height: 46,
    paddingTop: 9,
    paddingLeft: 18,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 23,
    backgroundColor: 'transparent',
    color: '#ed7b66'
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee'
  },
  handleBox: {
    width: windowWidth / 2 - 0.5,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  handleText: {
    paddingLeft: 12,
    fontSize: 18,
    color: '#333'
  },
  heartIcon: {
    fontSize: 22,
    color: '#333'
  },
  commentIcon: {
    fontSize: 22,
    color: '#333'
  },
})
module.exports = Item