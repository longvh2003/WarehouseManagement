var users = require('../models/users_model');
var jwt = require('jsonwebtoken');

module.exports.Auth = function (req, res, next) {
    var cookies = req.cookies;
    console.log(cookies.jwt_code);
    if (cookies.jwt_code != undefined) {
        var decode = jwt.verify(cookies.jwt_code, 'hoanganh');
        var _id = decode._id;
        users.findOne({ _id: _id }, function (err, data) {
            if (data) {
                req.user = data;
                next();
            } else {
                res.send('Vui lòng đăng nhập vào hệ thống qua http://localhost:3000/dangNhap');

            }
        })
    }
    else {
        res.send('Vui lòng đăng nhập vào hệ thống qua http://localhost:3000/dangNhap');
    }
}

