/**
* MealRequest.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/


module.exports.model ={
			date: Number,
			user: require('./User').model,
			costA: Number,
			range: Number,
			closed: Boolean,
			accepted: [require('./User').model],
		};
