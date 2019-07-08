const MongoClient = require('mongodb').MongoClient;
const Globals = require('../globals');
const votingCentersData = require('./voting-centers-data')
const registrationData =require('./registration raw').dataroot.registration

const GH = require('./global-hierarchy').globalHierarchy;
let municipalities = [].concat(...GH.map(e => e.municipalities));

MongoClient.connect(Globals.database.url, (err, client) => {
    if (err) return console.log(err)
    db = client.db('municipalities_DI');
    db.collection('districtpollingdata').find({}).toArray((err,result)=>{
        console.log(result)
    })
    console.log(municipalities[0])
    console.log("connected")
})
