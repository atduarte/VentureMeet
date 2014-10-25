module.exports = {
	getUserInfo : function(id, accessToken, cb){

		var fb = require('fb');

		fb.setAccessToken(accessToken)
		fb.api(
			id, 
			{fields: ['id', 'name', 'gender', 'email', 'birthday', 'location', 'friends', 'verified'] },
			function(response){
				cb(response);
			});		
	},

	login : function() {

	},

	register : function() {

	},

}