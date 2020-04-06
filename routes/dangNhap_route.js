var express = require('express');
var route = express.Router();

var controller = require('../controllers/dangNhap_controller');

route.get('/',controller.Open);

route.post('/',controller.Login);

route.post('/logout',controller.Logout);

module.exports = route;