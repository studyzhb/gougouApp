'use strict'

var config = {
	header: {
		method: 'POST',
		headers: {
			'Accept': 'applicatopn/json',
			'Content-Type': 'applicatopn/json',
		}
	},
	api: {
		// base: 'http://rap.taobao.org/mockjs/10135/api',
		base: 'http://1.0.1.119:9999/api',
		imageVerifyCode: '/verify/code/image',
		smsVerifyCode: '/verify/code/sms',
		register: '/user/register',
		login: '/user/login',
	  userInfo: '/user/info',
	  userConditions: '/user/conditions',
	  userCollects: '/user/collects',
	  userFans: '/user/fans',
	  userAttentions: '/user/attentions',
	  userAttentionAdd: '/user/attention/add',
	  //状态
	  conditionAdd: '/condition/add',
	  conditionList: '/condition/list',
	  conditionDetail: '/condition/detail',
	  conditionCollect: '/condition/collect',
	  //评论
	  commentAdd: '/comment/add',
	  commentList: '/comment/list',
	  commentDetail: '/comment/detail',
	  commentVote: '/comment/vote',
	}

}

module.exports = config