var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/WM_database');

var hangHoa_Schema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : String,
    trademark : String,
    kind : String,
    serial : String,
    amount : Number,
    unit : String,
    note : String
});

var hangHoa = mongoose.model('hanghoas',hangHoa_Schema);

module.exports = hangHoa;