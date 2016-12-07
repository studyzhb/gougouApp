'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AlertIOS,
  TextInput,
  Image,
  TouchableHighlight,
} from 'react-native'
var ImagePicker = require('react-native-image-picker')
var md5 = require('md5')
var MessageBarAlert = require('react-native-message-bar').MessageBar;
var MessageBarManager = require('react-native-message-bar').MessageBarManager;
var City = require('../../common/city')
var FontAwesomeIcon = require('react-native-vector-icons/FontAwesome')
var photoOptions = {
  title: null,
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '从相册上传',
  cameraType: 'back',
  mediaType: 'photo',
  maxWidth: '600',
  maxHeight: '600',
  quality: .8,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
var Condition = React.createClass({
  getInitialState() {
    return {
      avatarSource: {uri: 'http://oh13njw2l.bkt.clouddn.com/avatar.jpg?imageView2/0/w/300/h/300'},
      imageRows: [],
      place: '',
      titleInput: '',
      descInput: '',
      mobileInput: '',
    }
  },
  componentDidMount() {
    MessageBarManager.registerMessageBar(this.refs.alert);
  },
  componentWillUnmount() {
    MessageBarManager.unregisterMessageBar();
  },
  _pop() {
    this.props.navigator.pop()
  },
  _selectImage() {
    ImagePicker.showImagePicker(photoOptions, (response) => {
      if (response.didCancel) {
        return false
      }
      if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        AlertIOS.alert('上传失败：' + response.error)
        return false
      }
      const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
      const key = md5(response.data) 
      var row = {
        key: key,
        source: source
      }
      this.state.imageRows.push(row)
      this.setState({
        imageRows: this.state.imageRows
      })
    });
  },
  _changeImage(i) {
    ImagePicker.showImagePicker(photoOptions, (response) => {
      if (response.didCancel) {
        return false
      }
      if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        AlertIOS.alert('上传失败：' + response.error)
        return false
      }
      const key = md5(response.data) 
      const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
      var row = {
        key: key,
        source: source
      }
      this.state.imageRows[i] = row
      this.setState({
        imageRows: this.state.imageRows
      })
    });
  },
  _deleteImage(i) {
    this.state.imageRows.pop(i)
    this.setState({
      imageRows: this.state.imageRows
    })
  },
  _submit() {
    MessageBarManager.showAlert({
      title: '出错了。。',
      message: 'Your alert message goes here',
      alertType: 'error',
      duration: 3000,
      stylesheetError: {
        backgroundColor: '#ff3232', 
        strokeColor: '#FF0000' 
      },
      position: 'bottom',
    });
  },
  _selectCity() {
   this.props.navigator.push({
      name: 'City',
      component: City,
      params: {
        data: 123123,
        callback: this._callback
      },
    }) 
  },
  _callback(args){
    this.setState({
      place: args
    })
    
  },

  render() {
    var data = this.props.data
    var imageRows = this.state.imageRows.map((r, i) => {
        return <TouchableOpacity key={i} style={styles.imageBox} onPress={() => this._changeImage(i)}>
                  <Image source={r.source} style={styles.imageItem}/>
                  <TouchableHighlight style={styles.deleteImageBox} onPress={() => this._deleteImage(i)}>
                    <FontAwesomeIcon name='close' size={8} color='#ffffff' />
                  </TouchableHighlight> 
                </TouchableOpacity>
    })
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.cancelBtn} onPress={this._pop}>
            <Text style={styles.cancelBtnText}>取消</Text>
          </TouchableOpacity> 
          <Text style={styles.headerTitle}>上头条</Text>
          <TouchableOpacity style={styles.submitBtn} onPress={this._submit}>
            <Text style={styles.submitBtnText}>发送</Text>
          </TouchableOpacity> 
        </View>
        <View style={styles.form}>
          <View style={styles.content}>
            <View style={styles.titleBox}>
              <TextInput
                placeholder='标题'
                placeholderTextColor='#999999'
                autoCorrect={true}
                autoFocus={false}
                editable={true}
                multiline={false}
                maxLength={50}
                value={this.state.titleInput}
                onChangeText={this._onChangeTitleText}
                style={styles.titleInput}
              />
            </View>
            <TextInput
              placeholder='说点什么...'
              placeholderTextColor='#999999'
              autoCorrect={true}
              autoFocus={false}
              editable={true}
              multiline={true}
              maxLength={200}
              value={this.state.descInput}
              onChangeText={this._onChangeDescText}
              style={styles.descInput}
            />
            <View style={styles.images}>
              {
                imageRows
              }             
              <TouchableOpacity style={styles.addImage} onPress={this._selectImage}>
                <FontAwesomeIcon name='plus' size={40} color='#dcdcdc' style={styles.addImageIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.extras}>
            <View style={[styles.borderBottomLine, styles.extraItem]}>
              <FontAwesomeIcon name='mobile' size={22} color='#aeaeae' style={styles.extraItemIcon}/>
              <TextInput
                placeholder='联系电话（选填，仅工作人员可见）'
                placeholderTextColor='#999999'
                autoCorrect={true}
                autoFocus={false}
                editable={true}
                multiline={false}
                maxLength={50}
                value={this.state.mobile}
                onChangeText={this._onChangeTitleText}
                style={styles.extraItemMobileInput}
              />
            </View>
            <TouchableOpacity style={styles.extraItem} onPress={this._selectCity}>
              <FontAwesomeIcon name='map-marker' size={20} color='#ee735c' style={styles.extraItemIcon}/>
              <Text style={styles.extraItemPlaceText}>
              {this.state.place || '所在位置'}
              </Text>
              <FontAwesomeIcon name='chevron-right' size={20} style={styles.jumpViewIcon} color='#aeaeae' />
            </TouchableOpacity>

          </View>
        </View>
        <MessageBarAlert ref="alert" />
      </View>
    )
  },
})
const styles = require('../../../styles/account/create/condition')
module.exports = Condition 