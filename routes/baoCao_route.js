var express = require('express');
var route = express.Router();

var controller = require('../controllers/baoCao_controller');

route.get('/',controller.Open);

module.exports = route;