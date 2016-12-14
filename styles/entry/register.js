'use strict'

import {
  StyleSheet,
  Dimensions,
} from 'react-native'

var windowWidth = Dimensions.get('window').width
var windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth,
    height: windowHeight * .1,
    backgroundColor: '#34394b',
    paddingTop: windowHeight * .06,
    paddingBottom: 10,
  },
  backIcon: {
    position: 'absolute',
    left: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '300',
    color: '#ffffff',
  },
  content: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  form: {
    marginVertical: 20,
  },
  inputBox: {
    flexDirection: 'row',
    width: windowWidth,
    height: windowHeight * .07,
    backgroundColor: '#ffffff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: .25,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
  },
  tipIcon: {
    marginHorizontal: 5,
  },
  imageVerifyCodeBox: {
    width: windowWidth * .2,
    height: windowWidth *  .08,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageVerifyCode: {
    width: windowWidth * .2,
    height: windowWidth *  .08,
    resizeMode: 'cover',
  },
  loadingImageVerifyCode: {
    height: windowWidth *  .08,
  },
  getSmsVerifyCodeBox: {
    width: windowWidth * .2,
    height: windowWidth *  .08,
    justifyContent: 'center',
  },
  getSmsVerifyCodeText: {
    fontSize: 13,
    color: '#14b4ff',
  },
  disableGetSmsVerifyCodeText: {
    color: '#dfe1e2',
  },
  submitBtnBox: {
    width: windowWidth * .7,
    height: windowHeight * .08,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    backgroundColor: '#14b4ff'
  },
  disableSubmitBtnBox: {
    backgroundColor: '#dfe1e2',
  },
  submitBtnText: {
    fontSize: 20,
    color: '#ffffff',
    letterSpacing: 2,
  },
  submiting: {
    height: windowHeight *  .06,
  },
})

module.exports = styles
