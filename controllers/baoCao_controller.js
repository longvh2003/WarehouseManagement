var hangHoa = require('../models/hangHoa_model');
var lichSu = require('../models/lichSu_model');
var users = require('../models/users_model');

var moment = require('moment');
var excelExport = require('excel4node');
var excel = require('excel-export');
const Excel = require('exceljs');
var path = require('path');
var XLSX = require('xlsx');
var jwt = require('jsonwebtoken');


module.exports.Open = function (req, res) {
    var jwtToken = req.cookies.jwt_code;
    var jwtDecode = jwt.verify(jwtToken, 'hoanganh');
    var _id = jwtDecode._id;
    users.findOne({_id:_id}, function (err, data) {
        if (err) throw err;
        else {
            res.render('./baoCao',{todo:data});
        }
    })
}

module.exports.xuatBaoCao = function (req, res) {
    var startTime = req.body.startTime;
    var finishTime = req.body.finishTime;
    var action = req.body.action;

    // var time1 = new Date(startTime);
    // var time2 = new Date(finishTime);
    // var momentTime1 = moment(time1).format('DD-MM-YYYY');
    // console.log(momentTime1 + " / " + time2);

    lichSu.find({
        date: {
            $gte: startTime,
            $lte: finishTime
        },
        action: action
    }, function (err, data) {
        if (err) throw err;
        else if (data == null) {
            res.send('null');
        }
        else {
            res.json(data);
        }
    })
}

module.exports.Export_excel = function (req, res) {
    var startTime = req.body.startTime;
    var finishTime = req.body.finishTime;
    var action = req.body.action;

    var wb = XLSX.utils.book_new(); //new workbook
    lichSu.find({
        date: {
            $gte: startTime,
            $lte: finishTime
        },
        action: action
    },(err,data)=>{
        if(err){
            console.log(err)
        }else{
            var temp = JSON.stringify(data);
            temp = JSON.parse(temp);
            var ws = XLSX.utils.json_to_sheet(temp);
            var down = 'E:/WarehouseManagement/publics/exportdata.xlsx';
           XLSX.utils.book_append_sheet(wb,ws,"sheet1");
           XLSX.writeFile(wb,down);
           res.download(down);
        }
    });
}

