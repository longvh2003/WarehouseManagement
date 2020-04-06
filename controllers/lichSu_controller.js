var lichSu = require('../models/lichSu_model');
var users = require('../models/users_model');

var jwt = require('jsonwebtoken');

module.exports.Open = function(req,res){
    var jwtToken = req.cookies.jwt_code;
    var jwtDecode = jwt.verify(jwtToken, 'hoanganh');
    var _id = jwtDecode._id;
    lichSu.
    aggregate([
        { 
            $project : {
                date: { $dateToString: { format: "%d-%m-%Y", date: "$date" } },
                name : 1,
                trademark : 1,
                kind : 1,
                serial : 1,
                amount : 1,
                note : 1,
                time : 1,
                action : 1
            }
        }
    ]).exec(function(err,data){
        if(err) throw err;
            users.findOne({_id:_id},function(err,data1){
                if(err) throw err;
                res.render('lichSu',{
                    data_ejs : data,
                    todo : data1
                })
            })
    })
}

module.exports.Delete = function(req,res){
    var _id = req.params._id;
    lichSu.deleteOne({_id:_id},function(err,data){
        if(err) throw err;
        else {
            res.send('success');
        }
    })
}

module.exports.Print = function(req,res){
    var _id = req.params._id;

    lichSu.findOne({
        _id : _id
    },function(err,data){
        if(err) throw err;
        else {
            res.json(data);
        }
    })
}