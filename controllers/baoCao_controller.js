var hangHoa = require('../models/hangHoa_model');

module.exports.Open = function(req,res){
    hangHoa.find({},function(err,data){
        if(err) throw err;
        else{
            res.render('./baoCao',{data_ejs : data});
        }
    })
}