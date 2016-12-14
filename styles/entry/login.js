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
    backgroundColor: 'rgba(17,27,39,.8)'
  },
  header: {
    width: windowWidth,
    height: windowHeight * .3,
    backgroundColor: 'rgba(59,60,67, .8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: windowHeight * .03,
    left: 10,
  },
  title: {
    marginVertical: 20,
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '400',
  },
  thirdPartBox: {
    width: windowWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

  },
  thirdPartItem: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdPartItemWeixin: {
    backgroundColor: '#44ac23',
  },
  thirdPartItemQq: {
    backgroundColor: '#369dcb',
  },
  thirdPartItemWeibo: {
    backgroundColor: '#bb2e37',
  },
  content: {
    flex: 1,
    width: windowWidth,
  },
  inputBox: {
    flexDirection: 'row',
    width: windowWidth,
    height: windowHeight * .08,
    paddingVertical: 2,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(81,89,93,.6)',
    marginBottom: 2,
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 3,
    color: '#ffffff',
  },
  inputIcon: {
    marginHorizontal: 5,
  },
  loginBtn: {
    width: windowWidth * .7,
    height: windowHeight * .07,
    backgroundColor: '#147aab',
    opacity: 0.8,
    borderRadius: 5,
    padding: 10,
    marginVertical: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 18,
    letterSpacing : 2,
    color: '#ffffff'
  },
  forgetPasswordBox: {
    marginTop: 5,
    width: windowWidth,
    height: windowHeight * .05,
    alignItems: 'center',
  },
  forgetPasswordText: {
    fontSize: 14,
    color: '#202932',
  },
  footer: {
    width: windowWidth,
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
  },
  footerBottomLine: {
    width: windowWidth * .8,
    height: 1,
    borderBottomWidth: .2,
    borderColor: '#ffffff',
  },
  goRegisterBox: {
    width: windowWidth * .8,
    height: windowHeight * .08,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goRegisterText: {
    fontSize: 16,
    color: '#ffffff',
  },

})

module.exports = styles
