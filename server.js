// require npm
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// set engine
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set('/views','./views');
app.use(express.static('publics'));

// require routes
var baoCao_route = require('./routes/baoCao_route');
var danhMuc_route = require('./routes/danhMuc_route');
var lichSu_route = require('./routes/lichSu_route');

// create url
app.use('/baoCao',baoCao_route);
app.use('/danhMuc',danhMuc_route);
app.use('/lichSu',lichSu_route);



app.listen(3000,function(){
    console.log("server running in port 3000!");
});