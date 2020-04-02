var express = require('express');
var route = express.Router();

var controller = require('../controllers/lichSu_controller');

route.get('/',controller.Open);

route.delete('/:_id',controller.Delete);

route.put('/in/:_id',controller.Print);

module.exports = route;