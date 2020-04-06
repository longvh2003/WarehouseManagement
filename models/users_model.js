var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/WM_database');

var users_Schema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    username : String,
    password : String
});

var users = mongoose.model('users',users_Schema);

module.exports = users;