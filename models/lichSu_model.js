var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/WM_database');

var lichSu_Schema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    id_goods : mongoose.Schema.Types.ObjectId,
    name : String,
    trademark : String,
    kind : String,
    serial : String,
    amount : Number,
    unit : String,
    note : String,
    time : String,
    action : String
});

var lichSu = mongoose.model('lichsus',lichSu_Schema);

module.exports = lichSu;