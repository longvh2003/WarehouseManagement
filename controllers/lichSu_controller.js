var lichSu = require('../models/lichSu_model');

module.exports.Open = function(req,res){
    lichSu.find({},function(err,data){
        if(err) throw err;
        else{
            res.render('./lichSu',{data_ejs : data});
        }
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