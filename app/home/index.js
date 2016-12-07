'use strict'

import React from 'react'
import {
  StyleSheet,
  Text,
  Switch,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  ScrollView,
  ListView,
  AlertIOS,
  Modal,
  Dimensions,
} from 'react-native'
import IonIcons from 'react-native-vector-icons/Ionicons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
var windowHeight = Dimensions.get('window').height

var Test = require('../test')
var Home = React.createClass({
  getInitialState() {
    var navRows = [
      {id: 0, name: '推荐'},
      {id: 1, name: '热点'},
      {id: 2, name: '上海'},
      {id: 3, name: '视频'},
      {id: 4, name: '头条号'},
      {id: 5, name: '社会'},
      {id: 6, name: '图片'},
      {id: 7, name: '视频'},
      {id: 9, name: '视频'},
      {id: 10, name: '视频'},
      {id: 11, name: '视频'},
      {id: 12, name: '视频'},
      {id: 13, name: '视频'},
      {id: 14, name: '视频'},
    ]
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    return {
      dataSource: ds.cloneWithRows([]),
      searchContent: '',
      navRows: navRows,
      activeNavId: 0,
      hotNavId: 4,
      swiper: false,
      itemCloseModalVisible: false,
      modalPosition: {
        top: 0,
        right: 10,
      },
    }
  },
  _swiper() {
    this.setState({
      swiper: true
    })
  },
  componentDidMount() {

    var dataSource = [
      {id: 0, title: '推荐', desc:'件莱卡就是点击阿萨德加拉数据库', type: 1},
      {id: 1, title: '热点', desc:'件莱卡就是点击阿萨德加拉数据库', type: 3},
      {id: 2, title: '上海', desc:'件莱卡就是点击阿萨德加拉数据库', type: 2},
      {id: 3, title: '视频', desc:'件莱卡就是点击阿萨德加拉数据库', type: 1},
      {id: 4, title: '头条号', desc:'件莱卡就是点击阿萨德加拉数据库', type: 1},
      {id: 5, title: '社会', desc:'件莱卡就是点击阿萨德加拉数据库', type: 1},
      {id: 6, title: '图片', desc:'件莱卡就是点击阿萨德加拉数据库', type: 3},
      {id: 7, title: '视频', desc:'件莱卡就是点击阿萨德加拉数据库', type: 2},
      {id: 9, title: '视频', desc:'件莱卡就是点击阿萨德加拉数据库', type: 1},
    ]
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(dataSource)
    })
  },
  _changeNav(navId) {
    this.setState({
      activeNavId: navId
    })
  },
  _rendRow(row) {
    switch(row.type) {
      case 1 : // 单图
        return this._showType1(row) 
      case 2: // 无图或多图(>=3)
        return this._showType2(row) 
      case 3 : // 视频
        return this._showType3(row) 
    }
    return (
      <Text>Error</Text>
    )
  },
  _showType1(row) {
    return (
      <TouchableOpacity style={styles.itemBox}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}>国内成品油调价窗口今开启或迎今年第八次上调</Text>
          {this._showTipView(row)}
        </View>
        <Image source={{uri: 'http://oh13njw2l.bkt.clouddn.com/avatar.jpg?imageView2/0/w/600/h/600'}} style={styles.itemSingleImage}/>
      </TouchableOpacity>
    )
  },
  _showType2(row) {
    return (
      <TouchableOpacity style={styles.itemBox}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}>国内成品油调价窗口今开启或迎今年第八次上调</Text>
          {
            true 
            ? <View style={styles.itemMultiImageBox}>
                <Image source={{uri: 'http://oh13njw2l.bkt.clouddn.com/1.jpg?imageView2/0/w/600/h/600'}} style={styles.itemMultiImage}/>
                <Image source={{uri: 'http://oh13njw2l.bkt.clouddn.com/2.jpg?imageView2/0/w/600/h/600'}} style={styles.itemMultiImage}/>
                <Image source={{uri: 'http://oh13njw2l.bkt.clouddn.com/3.jpg?imageView2/0/w/600/h/600'}} style={styles.itemMultiImage}/>
              </View>
            : null
          }
          {this._showTipView(row)}
        </View>
      </TouchableOpacity>
    )
  },
  _showType3(row) {
    return (
      <TouchableOpacity style={styles.itemBox}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}>国内成品油调价窗口今开启或迎今年第八次上调</Text>
          <View style={styles.vdieoBox}>
            <Image source={{uri: 'http://oh13njw2l.bkt.clouddn.com/3.jpg?imageView2/0/w/600/h/600'}} style={styles.itemVedioThumb}>
              <View style={styles.playBox}>
                <FontAwesomeIcon name={true ?'play':'pause'} color='#ffffff' size={20} style={true ? styles.playIcon : null}/>
              </View>
              <View style={styles.vdieoDuiationBox}>
                <Text style={styles.vdieoDuiationText}>10:32</Text>
              </View>
            </Image>
          </View>
          {this._showTipView(row)}
        </View>
      </TouchableOpacity>
    )
  },
  _showTipView(row) {
    return (
      <View style={styles.itemTipBox}>
        <Text style={styles.tipText}>中国新闻网  744评论</Text>
        <TouchableOpacity style={styles.itemCloseBox} onPress={(event) => this._showModal(event, row)}>
          <FontAwesomeIcon name='close' size={8} color='#dddddd'/>
        </TouchableOpacity>
      </View>
    )
  },
  _showModal(event,row) {
    var elementPageY = event.nativeEvent.pageY
    var modalPosition = {right: 10}
    if(elementPageY > windowHeight / 2) {
      modalPosition.bottom = windowHeight - elementPageY + 20 
    } else {
      modalPosition.top = elementPageY + 20 
    }
    this.setState({
      itemCloseModalVisible: true,
      modalPosition: modalPosition
    })
  },
  _onEndReached() {
    return 1
  },
  _closeSwiper() {
    this.setState({
      swiper: false
    })
  },
  _onChangeTitleText(text) {
    this.setState({
      searchContent: text
    })
  },
  _clearSearchContent() {
    this.setState({
      searchContent: ''
    })
  },
  render() {
    var navRows = this.state.navRows.map((r, i) => {
      return <TouchableOpacity key={i} style={styles.navItemBox} onPress={() => this._changeNav(r.id)}>
               <Text style={[styles.navItemTitle, this.state.activeNavId == r.id && styles.activeNavItemTitle]}>{r.name}</Text>
               {
                r.id == this.state.hotNavId && <View style={styles.hotDot}></View>
               }
             </TouchableOpacity>
    })
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text onPress={this._swiper} style={styles.title}>今日头条</Text>
          <View style={styles.searchBox}>
            <FontAwesomeIcon name='search' size={15} color='#989898' style={styles.searchIcon} />
            <TextInput 
              placeholder='搜你想搜的'
              placeholderColor='#adadad'
              editable={true}
              value={this.state.searchContent}
              maxLength={100}
              multiline={false}
              onChangeText={this._onChangeTitleText}
              style={styles.searchInput}
            />
            {
              this.state.searchContent 
              ? <TouchableOpacity style={styles.clearIconBox} onPress={this._clearSearchContent}>
                  <FontAwesomeIcon name='close' size={8} color='#000000' style={styles.clearSearchIcon} />
                </TouchableOpacity>
              : null
            }
          </View>
        </View>
        <View style={styles.navs}>
          <ScrollView 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            automaticallyAdjustContentInsets={false}>
            {navRows}
          </ScrollView>
          <TouchableOpacity style={styles.navPlusBox}> 
            <FontAwesomeIcon name='plus' size={20} color='#000000' style={styles.navPlus} />
          </TouchableOpacity>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          automaticallyAdjustContentInsets={false}
          showsVerticalScrollIndicator={false}
          enableEmptySections={true}
          renderRow={this._rendRow}
          onEndReached={this._onEndReached}
          />
          {
            this.state.swiper && <Test close={this._closeSwiper} />
          }
          <Modal
            animationType='fade'
            visible={this.state.itemCloseModalVisible}
            transparent={true} >
            <TouchableOpacity style={styles.modalBox} onPress={() => {this.setState({itemCloseModalVisible: false})}}>
              <TouchableOpacity style={[styles.modalContent, this.state.modalPosition]}>
                <View style={styles.modalTitleBox}>
                  <Text style={styles.modalTitle}>可选理由，精准屏蔽</Text>
                  <View style={styles.modalBtnBox}>
                    <Text style={styles.modalBtn}>不感兴趣</Text>
                  </View>
                </View>
                <View style={styles.modalOptionBox}>
                  <View style={styles.modalOption}>
                    <Text style={styles.modalOptionText}>重复、旧闻</Text>
                  </View>
                  <View style={styles.modalOption}>
                    <Text style={styles.modalOptionText}>内容质量差</Text>
                  </View>
                  <View style={styles.modalOption}>
                    <Text style={styles.modalOptionText}>来源：风诺儿</Text>
                  </View>
                  <View style={styles.modalOption}>
                    <Text style={styles.modalOptionText}>社会视频</Text>
                  </View>
                  <View style={styles.modalOption}>
                    <Text style={styles.modalOptionText}>小偷</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>
      </View>
    )
  }
})

const styles = require('../../styles/home/index')

module.exports = Home