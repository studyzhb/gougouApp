'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  ActivityIndicator,
  AlertIOS,
  Navigator,
  TouchableHighlight,
  RefreshControl,
} from 'react-native'

var request = require('../common/request')
var config = require('../common/config')

var cacheResult = {
  nextPage: 1,
  items: [],
  total: 0
}

var Item = require('./item')
var Detail = require('./detail')


var List = React.createClass({
  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    return {
      dataSource: ds,
      isLoadingTail: false,
      isRefreshing: false,
    }
  },
  componentDidMount(){
    this._fetchData(1)
  },
  _fetchData(page){
    var that = this
    if(page == 0){
      this.setState({
        isRefreshing: true
      })
    } else {
      that.setState({
        isLoadingTail: true
      })
    }
    
    request.get(config.api.base + config.api.creations, {accessToken: 'asdasd', page: page})
    .then((data) => {
      if(data.success){
        var items = cacheResult.items
        if(page == 0){
          items = data.data.concat(items)
        }else{
          items = items.concat(data.data)
          cacheResult.nextPage++
        }
        cacheResult.items = items
        cacheResult.total = data.total
        
        setTimeout(function(){
          if(page == 0){
            that.setState({
              isRefreshing: false,
              dataSource: that.state.dataSource.cloneWithRows(items)
            })
          } else {
            that.setState({
              isLoadingTail: false,
              dataSource: that.state.dataSource.cloneWithRows(items)
            })
          }
        }, 1000)
      }
    })
    .catch((error) => {
      that.setState({
        isLoadingTail: false,
        isRefreshing: false,
      })
      console.error(error);
    });
  },
  _hasMore() {
    return cacheResult.total > cacheResult.items.length
  },
  _fetchMore() {
    if (!this._hasMore() || this.state.isLoadingTail){
      return;
    }
    this._fetchData(cacheResult.nextPage)
  },
  _loadPage(row){
    this.props.navigator.push({
      name: 'Detail',
      component: Detail,
      params: {
        data: row
      }
    })
  },
  _renderRow(row){
    return (
      <Item key={row._id} onSelect={() => this._loadPage(row)} data={row} />
    )
  },
  _renderFooter(){
    if(!this._hasMore() && cacheResult.total != 0){
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
  _refreshMore() {
    if(this.state.isRefreshing){
      return
    }
    this._fetchData(0)
  },
  render() {
    return (
        <View style={styles.container}>
          <View style={styles.header}> 
            <Text style={styles.headerTitle}>首页</Text>
          </View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            renderFooter={this._renderFooter}
            automaticallyAdjustContentInsets={false}
            onEndReached={this._fetchMore}
            onEndReachedThreshold={20}
            enableEmptySections={true}
            refreshControl={
              <RefreshControl
                refreshing={ this.state.isRefreshing }
                onRefresh={ this._refreshMore }
                tintColor="gray"
                title="拼命加载中..."
                colors={['#ff0000', '#00ff00', '#0000ff']}
                progressBackgroundColor="gray"/>
            }
            showsVerticalScrollIndicator={false}
          />
        </View>
    )
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header: {
  	paddingTop: 25,
  	paddingBottom: 12,
  	backgroundColor: '#ee735c',
  },
  headerTitle: {
  	fontSize: 16,
  	fontWeight: '600',
  	color: '#fff',
    textAlign: 'center'
  },
  loadingMore: {
    marginVertical: 20,
  },
  loadingMoreText: {
    color: '#777',
    textAlign: 'center'
  },
  
})

module.exports = List