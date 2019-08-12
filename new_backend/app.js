var express = require('express');
const bodyParser = require('body-parser')
//const fileUpload = require('./src/lib/index');
const routing = require('./src/routing');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const Globals = require('./globals');
const dataInit = require('./data_init')


var connection = mongoose.connect(Globals.database.url, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
global.connection = connection;




const app = express();


//app.use(fileUpload());
app.use(bodyParser.urlencoded({extended: true})); // for urlencoded formdate
app.use(bodyParser.json());// for json form

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', 'Content-Type, x-access-token, access-control-allow-origin, name, password');
    res.set('Content-type', 'application/json');
    if (req.method === "OPTIONS") {
        res.send('ok');
        res.end();
        return;
    }
    next();
});
app.use(routing);

var port = process.env.PORT || 8081;

app.listen(port, () => {
    console.log('listening on ' + port)
});

app.get('/',(req,res)=>{
    res.json({
        status:1,
        message:"Server Running"
    })
});


dataInit.init();
module.exports = app;
