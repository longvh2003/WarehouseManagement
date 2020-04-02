// require model
var hangHoa = require('../models/hangHoa_model');
var lichSu = require('../models/lichSu_model');
// require npm
var multer = require('multer');
var xlsx = require('mongo-xlsx');
module.exports.Open = function (req, res) {
    hangHoa.find({}, function (err, data) {
        if (err) throw err;
        else {
            res.render('./danhMuc', { data_ejs: data });
        }
    })
}

module.exports.Insert = function (req, res) {
    var kind = req.body.kind;
    var name = req.body.name;
    var trademark = req.body.trademark;
    var serial = req.body.serial;
    var amount = req.body.amount;
    var unit = req.body.unit;
    var note = req.body.note;

    var action = "Nhập kho";
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    hangHoa.findOne({
        kind: kind,
        trademark: trademark,
        serial: serial
    }, function (err, data) {
        if (err) throw err;
        else if (data != null) {
            res.send("conflict serial");
        }
        else {
            hangHoa.insertMany({
                name: name,
                kind: kind,
                trademark: trademark,
                serial: serial,
                amount: amount,
                unit: unit,
                note: note
            }, function (err, data) {
                if (err) throw err;
                else {
                    lichSu.insertMany({
                        name: name,
                        kind: kind,
                        trademark: trademark,
                        serial: serial,
                        amount: amount,
                        unit: unit,
                        note: note,
                        time: dateTime,
                        action: action
                    });
                    res.send('success');
                }
            });

        }
    })

}

module.exports.Delete = function (req, res) {
    var _id = req.params._id;
    var name = req.body.name;
    var trademark = req.body.trademark;
    var kind = req.body.kind;
    var serial = req.body.serial;
    var amount = req.body.amount;
    var unit = req.body.unit;
    var note = req.body.note;


    var action = "Xoá";
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    hangHoa.findOne({
        _id: _id
    }).remove(function (err, data) {
        if (err) throw err;
        else {
            lichSu.insertMany({
                _id_goods: _id,
                name: name,
                kind: kind,
                trademark: trademark,
                serial: serial,
                amount: amount,
                unit: unit,
                note: note,
                time: dateTime,
                action: action
            });
            res.send('success');
        }
    })
}

module.exports.Update = function (req, res) {
    var _id = req.params._id;
    var name = req.body.name_update;
    var trademark = req.body.trademark_update;
    var kind = req.body.kind_update;
    var serial = req.body.serial_update;
    var amount = req.body.amount_update;
    var unit = req.body.unit_update;
    var note = req.body.note_update;

    var name_old = req.body.name;
    var trademark_old = req.body.trademark;
    var kind_old = req.body.kind;
    var serial_old = req.body.serial;
    var amount_old = req.body.amount;
    var unit_old = req.body.unit;
    var note_old = req.body.note;


    var action = "Cập nhật";
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    var filter = { _id: _id };
    var update = {
        name: name,
        trademark: trademark,
        kind: kind,
        serial: serial,
        amount: amount,
        unit: unit,
        note: note
    }
    hangHoa.update(filter, update, function (err, data) {
        if (err) res.send("err");
        else {
            lichSu.insertMany({
                _id_goods: _id,
                name: name_old,
                kind: kind_old,
                trademark: trademark_old,
                serial: serial_old,
                amount: amount_old,
                unit: unit_old,
                note: note_old,
                time: dateTime,
                action: action
            });
            res.send('success');
        }
    })
}

module.exports.Export_Hand_Made = function (req, res) {
    var _id = req.params._id;
    var name = req.body.name;
    var trademark = req.body.trademark;
    var kind = req.body.kind;
    var serial = req.body.serial;
    var amount_xuat = req.body.amount;
    var unit = req.body.unit;
    var note = req.body.note;

    var action = "Xuất kho";
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    hangHoa.findOne({
        _id: _id
    }, function (err, data1) {
        if (err) throw err;
        else if (data1 == null) {
            res.send('err find');
        }
        else if (data1.amount < amount_xuat) {
            res.send('not enough amount');
        }
        else {
            hangHoa.update({ _id: _id }, {
                $set: {
                    amount: data1.amount - amount_xuat
                }
            }, function (err, data2) {
                if (err) throw err;
                else {
                    lichSu.insertMany({
                        _id_goods: _id,
                        name: name,
                        kind: kind,
                        trademark: trademark,
                        serial: serial,
                        amount: amount_xuat,
                        unit: unit,
                        note: note,
                        time: dateTime,
                        action: action
                    });
                    res.send('success');
                }
            })
        }
    })
}

var storage_nhap = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/nhapKho');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

module.exports.upload_nhap = multer({ storage: storage_nhap });


module.exports.Nhap_excel = function (req, res) {
    var name = req.params.name;

    var action = "Nhập excel";
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    xlsx.xlsx2MongoData("./upload/nhapKho/" + name, null, function (err, mongoData) {
        for(var i=0;i<mongoData.length;i++){
            var name_goods = mongoData[i].name;
            var kind = mongoData[i].kind;
            var trademark = mongoData[i].trademark;
            var serial = mongoData[i].serial;
            var amount = mongoData[i].amount;
            var unit = mongoData[i].unit;
            var note = mongoData[i].note;

            hangHoa.insertMany({
                name : name_goods,
                kind : kind,
                trademark : trademark,
                serial :serial,
                amount : amount,
                unit : unit,
                note : note
            },function(err,data){
                if(err) throw err;
                else {
                    lichSu.insertMany({
                        _id_goods : data[0]._id,
                        name: name_goods,
                        kind: kind,
                        trademark: trademark,
                        serial: serial,
                        amount: data[0].amount,
                        unit: unit,
                        note: note,
                        time: dateTime,
                        action: action
                    });
                }
            })
        }
        res.send('success');
        console.log('success!');
    });
}

var storage_xuat = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/xuatKho');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

module.exports.upload_xuat = multer({ storage: storage_xuat });


module.exports.Xuat_excel = function (req, res) {
    var name = req.params.name;

    var action = "Xuất excel";
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    xlsx.xlsx2MongoData("./upload/xuatKho/" + name, null, function (err, mongoData) {
        mongoData.forEach(element => {
            var _id_goods = element._id;
            var amount_good = element.amount;
            hangHoa.findOne({_id:_id_goods},function(err,data){
                if(err) throw err;
                else{
                    hangHoa.updateOne({_id:_id_goods},{
                        $set: {
                            amount: data.amount - amount_good
                        }
                    },function(err,datas){
                        if(err) throw err;
                        else{
                            console.log(datas);
                            lichSu.insertMany({
                                _id_goods: _id_goods,
                                name: data.name,
                                kind: data.kind,
                                trademark: data.trademark,
                                serial: data.serial,
                                amount: amount_good,
                                unit: data.unit,
                                note: data.note,
                                time: dateTime,
                                action: action
                            });
                        }
                    })
                }
            })
        });
        res.send('success');
    });
}