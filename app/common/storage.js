'use strict'

import {
  AsyncStorage,
} from 'react-native'

import Storage from 'react-native-storage'
/*
  * url: https://github.com/sunnylqm/react-native-storage
*/
module.exports = {
  init: function() {
    //设置全局变量
    global._storage = new Storage({
      size: 1000,
      storageBackend: AsyncStorage,
      defaultExpires: null,
      enableCache: true,
    })
  },

  get: function(options, callback) {
    if(typeof(options) == 'string') {
      options = {
        key: options
      }
    }
    _storage.load(options)
    .then((ret) => {
      callback && callback(ret) 
    }).catch((err) => {
      callback && callback(null) 
    })
  },

  save: function (options) {
    _storage.save(options);
  },

  getIdsForKey: function(key, callback){
    _storage.getIdsForKey(key)
    .then((ids) => {
      callback && callback(ids)
    })
  },
  // getAllDataForKey
  getAllDataForKey: function(key, callback) {
    _storage.getAllDataForKey('user').then((rets)=> {
      callback && callback(rets)
    });
  },

  // !! clear all data under a key
  clearMapForKey: function(key) {
    _storage.clearMapForKey(key);
  },

  // remove single record
  remove: function(options) {
    // storage.remove({
    //   key: 'lastPage'
    // });
    // storage.remove({
    //   key: 'user',
    //   id: '1001'
    // });
    _storage.remove(options);
  },

  // !! clear map and remove all key-id data (but keep the key-only data)
  clearMap: function() {
    _storage.clearMap();
  },

}