var express = require('express');
var route = express.Router();

var controller = require('../controllers/lichSu_controller');
var auth_controller = require('../controllers/auth_controller');


route.get('/',auth_controller.Auth,controller.Open);

route.delete('/:_id',controller.Delete);

route.put('/in/:_id',controller.Print);

module.exports = route;