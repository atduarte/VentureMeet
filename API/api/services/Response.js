module.exports = {
	errorResponse : function(desc,code){
		return {success: false , code : code , description : desc };
	},
	successResponse : function(desc,code,data){
		return {success: true  , code : code 	, description : desc , data: data};	
	}

}