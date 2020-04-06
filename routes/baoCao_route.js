var express = require('express');
var route = express.Router();

var controller = require('../controllers/baoCao_controller');
var auth_controller = require('../controllers/auth_controller');

route.get('/',auth_controller.Auth,controller.Open);

route.put('/xuatBaoCao',controller.xuatBaoCao);

route.post('/export',controller.Export_excel);

module.exports = route;