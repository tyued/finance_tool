import _ from 'lodash';
const mockjs = require('mockjs');
const Random = mockjs.Random;
const userRoles = mockjs.mock({
	'list|2': [{
		_id: '@string(16)',
		'roleName|1': [
			'administrator',
			'super administrator',
		],
		'status|1': [0, 1],
		rolePermission: [
			'reserve',
			'backend',
			'backend.user',
			'backend.user.account',
			'backend.user.account.list',
		],
	}],
});
module.exports = {
	'GET /api/userinfo': (req, res) => {
		const data = mockjs.mock({
			'data': {
				"code": "2000",
				"userInfo": {
					"user_id": 1,
					"mid": "0",
					"realName": "Citcon",
					"merchant_legal_name": "Citcon", "roleList": ["*"], "status": "A"
				}
			},
		});

		res.json({
			code: 0,
			data: data.data
		});
	},

	// get user login info
	'GET /api/user': (req, res) => {
		const auth = req.get('Authorization');
		if (auth.indexOf('null') !== -1) {
			return res.status(401).send('UnAuthorization');
		}
		res.json({
			username: 'test user',
			authorities: `reserve,backend,backend.merchant,backend.account`,
		});
	},
	'POST /login'(req, res) {
		res.json({
			code: 0,
			token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmODEyODhkMzU3OGJiMDA1YTc5Y2RjMSIsInVzZXJOYW1lIjoicHdzdHJpY2tAMTYzLmNvbSIsInJlYWxOYW1lIjoic3RyaWNrIiwiaWF0IjoxNjA5MDY5ODQ0LCJleHAiOjE2MDkxMTMwNDR9.H8WtilifQQEighczhXtpA_W-YP0Nm4Ci48OITRlmnCg',
			expireDays: 90
		});
	},
	'POST /api/user/logout': (req, res) => {
		res.json({
			code: 0,
		});
	},
	// get role list
	'GET /api/user/role/list': (req, res) => {

		const data = mockjs.mock({
			'data|100': [{
				role: /\w{5}/,
				mid: /\w{16}/,
				name: '@string(lower,20)',
				permissionList: [{
					type: "1",
					component: "*",
					operation: "",
					permission_id: 23
				}],
			}],
			count: 100
		});

		res.json({
			data: {
				list: data.data,
				code: '2000',
			},
			count: data.count,
		});
	},
	// query merchant account list
	'GET /api/user/list'(req, res) {
		const data = mockjs.mock({
			'data|20': [{
				_id: /\w{16}/,
				mid: /\w{16}/,
				accountName: '@email',
				realName: '@name',
				"roles|1": ['admin', 'merchant_admin'],
				"status|1": [0, 1],
			}],
			count: 20
		});

		res.json({
			code: 0,
			data: data.data,
			count: data.count,
		});
	},
	// add user
	'POST /api/user': (req, res) => {
		const _id = Random.string(16);
		res.json({
			...req.body,
			code: 0,
			_id,
		});
	},
	// update
	'PUT /api/user': (req, res) => {
		res.json(req.body);
	},
	// disable
	'POST /api/user/disable': (req, res) => {
		res.json({
			code: 0,
		});
	},
	// delete
	'DELETE /api/user': (req, res) => {
		res.json({
			code: 0,
		});
	},
	'GET /api/merchant/list'(req, res) {
		const data = mockjs.mock({
			'data|100': [{
				_id: /\w{16}/,
				merchant_id: /\w{16}/,
				merchant_name: '@string(lower,20)',
				merchant_email: '@email',
				merchant_phone: /(13|14|15|18)[0-9]{9}/,
				"status|1": ['A', 'B', 'C'],
			}],
			count: 100
		});

		res.json({
			data: {
				list: data.data,
				code: '2000',
			},
			count: data.count,
		});
	},

	'GET /api/users/list'(req, res) {
		const data = mockjs.mock({
			'data|100': [{
				user_id: /\w{16}/,
				mid: /\w{16}/,
				user_name: '@string(lower,20)',
				first_name: '@string(lower,20)',
				last_name: '@string(lower,20)',
				role_name: '@string(lower,20)',
				"status|1": ['A', 'B', 'C'],
			}],
			count: 100
		});

		res.json({
			data: {
				list: data.data,
				code: '2000',
			},
			count: data.count,
		});
	},

	'GET /api/fixedreserve/list'(req, res) {
		const data = mockjs.mock({
			'data|100': [{
				transaction_id: /\w{4}/,
				request_id: /\w{4}/,
				merchant_legal_name: '@string(lower,20)',
				amount_init: 20,
				rolling_days: '5',
				daily_settlements: '60',
				time_completed: '12-03-2023',
				"status|1": ['Pending'],
			}],
			count: 100
		});

		res.json({
			data: {
				list: data.data,
				code: '2000',
			},
			count: data.count,
		});
	},
};