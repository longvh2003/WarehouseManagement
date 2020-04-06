var Users = require('../models/users_model');

var jwt = require('jsonwebtoken');

module.exports.Open = function(req,res){
    res.render('dangNhap');
}

module.exports.Login = function(req,res,next){
    var username = req.body.username;
    var password = req.body.password;
    Users.findOne({
        username : username,
        password : password
    },function(err,data){
        if(err) throw err;
        else if (data == null){
            res.send('fail');
        }
        else{
            var payload = {_id:data._id};
            var jwtToken = jwt.sign(payload,'hoanganh',{expiresIn : 30000});
            console.log('jwtToken: ' +jwtToken);
            // var jsonResponse = {'access_token': jwtToken};
            // var deencode = jwt.verify(jwtToken,'hoanganh');
            // console.log(deencode);
            res.cookie('jwt_code',jwtToken);
            res.send('success');
            next();
        }
    })
    
}

module.exports.Logout =function(req,res){
    res.clearCookie('jwt_code');
    res.send('success');
}