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
		base: 'http://192.168.2.7:9999/api',
		creations: '/creations',
		creationsAdd: '/creations/add',
		comments: '/comments',
	}

}

module.exports = config