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
  ListView,
  AlertIOS,
  ActivityIndicator,
} from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

var City = React.createClass({
  getInitialState() {
   
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    return {
      dataSource: ds.cloneWithRows([]),
      selectedPlace: 0,
      searchContent: '',
    }

  },
  componentDidMount() {
    var dataSource = [
      {id: 0, name: '', desc: ''},
      {id: 1, name: '上海市', desc: ''},
      {id: 2, name: '北京市', desc: '爱上来得及（123号）'},
      {id: 3, name: '北京市', desc: '爱上来得及（123号）'},
      {id: 4, name: '北京市', desc: '爱上来得及（123号）'},
      {id: 5, name: '北京市', desc: '爱上来得及（123号）'},
      {id: 6, name: '北京市', desc: '爱上来得及（123号）'},
    ]
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(dataSource)
    })
  },
  _onChangeSearchText(text) {
    this.setState({
      searchContent: text
    })
  },
  _clearSearchText() {
    this.setState({
      searchContent: ''
    })
  },
  _select(place) {
    this.setState({
      selectedPlace: place.id,
    })
    var name = place.name || '所在位置'
    this.props.callback(name)
    this.props.navigator.pop()
  },
  _renderRow(row) {
    return (
      <TouchableOpacity style={styles.itemBox} onPress={() => this._select(row)}>
        <View style={styles.itemInfo}>
          <Text style={!row.name ? styles.noTitleDisplay : styles.itemTitle}>{row.name||'不显示位置'}</Text>
          {
            row.desc 
            ? <Text style={styles.itemDesc}>{row.desc}</Text>
            : null 
          }
        </View>
        {
          this.state.selectedPlace == row.id 
          ? <FontAwesomeIcon name='check' size={15} color='#2a90d7' style={styles.selectedIcon}/>
          : null
        }
      </TouchableOpacity>
    )
  },
  _fetchMore() {

  },
  _hasMore() {
    return true
  },
  _renderFooter() {
    if(!this._hasMore()){
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
  _pop(){
    this.props.callback('北京')
    this.props.navigator.pop()
  },
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.cancelBox}>
            <Text onPress={this._pop} style={styles.cancelText}>取消</Text>
          </View>
        </View>
        <View style={styles.searchBox}>
          <View style={styles.searchInputBox}>
            <FontAwesomeIcon name='search' style={styles.searchIcon} size={15} color='#ccc' />
            <TextInput
              ref='searchText'
              placeholder='搜索位置'
              placeholderTextColor='#999999'
              autoCorrect={true}
              autoFocus={false}
              editable={true}
              multiline={false}
              maxLength={100}
              value={this.state.searchContent}
              onChangeText={this._onChangeSearchText}
              style={styles.searchInput} />
            {
              this.state.searchContent 
              ? <TouchableOpacity style={styles.deleteSearchBox} onPress={this._clearSearchText}>
                  <FontAwesomeIcon name='close' size={8} color='#ffffff' style={styles.deleteSearchIcon} />
                </TouchableOpacity> 
              : null
            }
            
          </View>
          <Text style={styles.searchCancelText}>取消</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderFooter={this._renderFooter}
          automaticallyAdjustContentInsets={false}
          onEndReached={this._fetchMore}
          onEndReachedThreshold={20}
          enableEmptySections={true}
          showsVerticalScrollIndicator={false}
          style={styles.listView} />
      </View>
    )
  }
})

const styles = require('../../styles/common/city')

module.exports = City