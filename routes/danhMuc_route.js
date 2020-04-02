var express = require('express');
var route = express.Router();

var controller = require('../controllers/danhMuc_controller');

route.get('/',controller.Open);

route.post('/',controller.Insert);

route.delete('/:_id',controller.Delete);

route.put('/:_id',controller.Update);

route.put('/xuatKho/:_id',controller.Export_Hand_Made);

route.post('/nhapExcel/:name',controller.upload_nhap.single('ip_nhap_excel'),controller.Nhap_excel);

route.put('/xuatExcel/:name',controller.upload_xuat.single('ip_xuat_excel'),controller.Xuat_excel);


module.exports = route;