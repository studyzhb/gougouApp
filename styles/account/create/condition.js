'use strict'

import {
  StyleSheet,
  Dimensions,
} from 'react-native'

var windowWidth = Dimensions.get('window').width
var windowHeight = Dimensions.get('window').height
var imageWidth = parseInt((windowWidth - 60) / 4)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'flex-start',
    backgroundColor: '#f4f5f6',
  },
  header: {
    width: windowWidth,
    height: windowHeight * .1,
    backgroundColor: '#ffffff',
    paddingTop: windowHeight * .03,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cancelBtn: {
    left: 10,
  },
  cancelBtnText: {
    fontSize: 16,
    color: '#505050',
    padding: 2,
  },
  submitBtn: {
    right: 10,
  },
  headerTitle: {
    fontSize: 18,
    color: '#222222'
  },
  submitBtnText: {
    fontSize: 16,
    color: '#505050',
    padding: 2,
  },
  form: {
    width: windowWidth,
    borderTopWidth: 0.5,
    borderColor: '#e8e8e8'
  },
  content: {
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },
  titleBox: {
    marginHorizontal: 10,
    borderBottomWidth: .5,
    borderColor: '#e8e8e8',
  },
  titleInput: {
    height: windowHeight * .05,
    fontSize: 16,
  },
  descInput: {
    marginHorizontal: 10,
    height: windowHeight * .15,
    paddingVertical: 5,
    fontSize: 16,
  },
  images: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10,
  },
  imageBox: {
    margin: 5,
    width: imageWidth,
    height: imageWidth,
  },
  imageItem: {
    width: imageWidth,
    height: imageWidth,
  },
  addImage: {
    width: imageWidth,
    height: imageWidth,
    borderColor: '#e8e8e8',
    borderWidth: 2,
    margin: 5
  },
  addImageIcon: {
    textAlign: 'center',
    marginVertical: imageWidth * .25,
  },
  deleteImageBox: {
    position: 'absolute',
    right: 5,
    top: 5,
    backgroundColor: '#000000',
    opacity: 0.5,
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  extras: {
    width: windowWidth,
    height: windowHeight * .16,
    backgroundColor: '#ffffff'
  },
  extraItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: windowHeight * .08,
  },
  borderBottomLine: {
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 0.5,
  },
  extraItemIcon: {
    width: 20,
    height: 20,
    marginLeft: 20,
    marginRight: 10,
  },
  extraItemMobileInput: {
    width: windowWidth - 100,
    fontSize: 16,
    alignSelf: 'center',
    height: windowHeight * .05,
  },
  jumpViewIcon: {
    right: 10,
  },
  extraItemPlaceText: {
    width: windowWidth - 60,
  },
})

module.exports = styles
