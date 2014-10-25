/**
 * MealRequestController
 *
 * @description :: Server-side logic for managing Mealrequests
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	add: function(req,res){
		if(req.session.logged === true){

  			var currentDate = new Date();
  			var currentDate = currentDate.getTime();
  			var costA = 30; /* req.body.costA */
  			var range = 10; /* req.body.range */
  			var user = req.session.user;

  			var MealRequest = sails.mongoose.model('MealRequest');

  			var mealRequest = {date: currentDate, user: user, costA: costA, range: range, closed: false, accepted: []};
  			var newMR = new MealRequest(mealRequest);

  				
	        newMR.save(function(err){
	            if(err){
	            	res.json({success: "false", error: {title: "could not insert into database the requested mealrequest.", description: err} });
	            }
	            else{
	            	res.json({success: "true", actionPerformed: "insertedMealRequest", mealrequest: mealRequest}) 
	            }
	        }); 
		}
		else{
			res.json({success: false, error:  {description:"no session found"} });
		}
	},

	search: function(req,res){
		var lat = req.query.lat;
		var lon = req.query.lon;
		var range = req.query.range;

		var MealRequest = sails.mongoose.model('MealRequest');

		MealRequest.find( { 
							location: { 
								'$geoWithin': {
									$centerSphere: [[lon,lat], range/6378]
								 }, 
							}
						},
				function(err, queryResult){
					if(err) res.json({ success: "false", err: err, result: [queryResult]});
					if(queryResult) res.json( {success: "true", result: queryResult});
		});

		// Add to Accepted Array

	},

	testAdd: function(req,res){
		var lat = req.query.lat;
		var lon = req.query.lon;
		var name = req.query.name;

		var MealRequest = sails.mongoose.model('MealRequest');

		var currentDate = new Date().getTime();

		var mealRequestCoo = {name: name, date: currentDate, location: [lon, lat]};
  		var newMRCoo = new MealRequest(mealRequestCoo);
  		newMRCoo.save(function(err){
  			if(err) res.json(err);
  			else res.json(newMRCoo);
  		});

	}
};

