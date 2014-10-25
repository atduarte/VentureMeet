module.exports = {
	connect: function(){
		var username ="";
		var password ="";
		var port = sails.config.connections.MongooseDB.port;
		var host = sails.config.connections.MongooseDB.host;
		var database = sails.config.connections.MongooseDB.database;
		var mongoose = sails.mongoose;
		try{ 
			//mongoose.connect('mongodb://'+host+':'+port+'/'+database);
			//mongoose.connect('mongodb://username:password@host:port/database?options...');
		}catch(err){
			console.log(err);
			return false;
			console.log("Nao consegui acessar ao mundo digital!")
		}
		return mongoose;
	}
}