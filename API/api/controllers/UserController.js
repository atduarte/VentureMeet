/**
 * ExampleController
 *
 * @description :: Server-side logic for managing examples
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
  validate: function (req, res) {

    /*
    var id = req.body.id;
    var token = req.body.token;
    */
    
    id = "710216942401898";
    token = "CAANi3yj39ZCYBAKoNj4EC6pTcpdHfr1skeYGL60eZAcvK9D7ROyHoFe9ULMnHTqZB8JZCZAZA5hhdbRvoZAEKtygmRnTiXYgWPVxHQHZCthBp0mkTeCp7mg8bQWc0R4bNO7iZBy50mPnAFMosJtRUeVkPB3Hydit1wH3X4FHFTqLfgpyb3nGbApNQw6xlozlssW04fTSG2EC0vidkc4iw89ZC7";
    
    sails.services.facebook.getUserInfo(id, token, 
      function(fbUser){
        if (!fbUser.name){
          return res.json(
            sails.services.response.errorResponse( 
              req.__("facebook_authError"),
              req.__("facebook_authError_code")
              )
          );
        }

        var user = {
          name      : fbUser.name,
          email     : fbUser.email,
          facebookid: fbUser.id,
          birthdate : fbUser.birthday
        }
        var User = sails.mongoose.model('User');

        User.find({ facebookid : fbUser.id },
          function(err,queryResult){
            if(queryResult.length === 0){
              if( fbUser.verified === true || fbUser.friends.summary.total_count > 50 ){
                var newUser = new User(user);
                newUser.save(function(err){
                  if(err){
                    return req.json(
                      sails.services.response.errorResponse( 
                        req.__("user_registry_failed") ,
                        req.__("user_registry_failed_code")  
                        )
                  );
                  }
                  else{
                    req.session.logged = true;
                    req.session.fbid = fbUser.id;
                    req.session.user = user;
                    return res.json(
                      sails.services.response.successResponse(
                        req.__("user_registry_success"),
                        req.__("user_registry_success_code"),
                        user
                      )
                    );
                  }
              });
            }
          }
          else{
            req.session.logged = true;
            req.session.fbid = fbUser.id;
            req.session.user = user;
            return res.json(
              sails.services.response.successResponse(
                req.__("user_login_success"),
                req.__("user_login_success_code"),
                user
              )
            )
          }
        })
    	});
  },


  userinfo: function(req, res) {
    var User = sails.mongoose.model('User');
  	User.findOne({facebookid: req.params.fbid }, 
      function(err,queryResult){
        if( queryResult === null ){
          return res.json(
            sails.services.response.errorResponse(
              req.__("user_invalid"),
              req.__("user_invalid_code")
            )
          );
        }
        else {
          var user = {
            name      : queryResult.name,
            email     : queryResult.email,
            facebookid: queryResult.id,
            };
          return res.json(
            sails.services.response.successResponse(
              req.__("user_info_success"),
              req.__("user_info_success_code"),
              user
            )
          );
        }
      });
    }
};


