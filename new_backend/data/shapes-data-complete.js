const MongoClient = require('mongodb').MongoClient;
const Globals = require('../globals');
const votingCentersData = require('./parties-per-district-fr')
const registrationData = require('./registration raw').dataroot.registration

const GH = require('./global-hierarchy').globalHierarchy;
let municipalities = [].concat(...GH.map(e => e.municipalities));

MongoClient.connect(Globals.database.url, (err, client) => {
    if (err) return console.log(err)
    db = client.db('municipalities_DI');
    db.collection('sectorshapes').find({}).toArray((err, result) => {
        result.forEach(shape=>{
            //console.log(shape.properties.name_ar)
            db.collection('districtpollingdata').find({nameEN:shape['properties']['mun_en']}).toArray((err,result2)=>{
                if(result2.length===0)
                    console.log("MUN NOT FOUND - "+ shape.properties.mun_en)
                else{
                    let desks = result2[0].pollingData.filter(desk=>desk.district==shape.properties.name_ar)
                    if(desks.length>0){
                        let parties = Object.keys(desks[0]).filter(k=>k[0]==k[0].toUpperCase());
                        //initialize parties
                        let totalVotes = 0;
                        parties.forEach(partie=>{
                            shape.properties[partie]=0;
                            desks.forEach(desk=>{
                                shape.properties[partie]+=desk[partie]
                                totalVotes+=desk[partie];
                            })
                        })
                        //initialize ages
                        shape.properties.reg_18_24 =0;
                        shape.properties.reg_25_35=0;
                        shape.properties.reg_36_50=0;
                        shape.properties.reg_p51=0;
                        desks.forEach(desk=>{
                            shape.properties.reg_18_24+= parseInt(desk.f_18_21) + parseInt(desk.m_18_21) + parseInt(desk.f_22_24) + parseInt(desk.m_22_24);
                            shape.properties.reg_25_35+=parseInt(desk.f_25_35) + parseInt(desk.m_25_35);
                            shape.properties.reg_36_50+=parseInt(desk.f_36_50) + parseInt(desk.m_36_50);
                            shape.properties.reg_p51+=parseInt(desk.f_p51) + parseInt(desk.m_p51);

                        })
                        shape.properties.registered_sum = shape.properties.reg_18_24+shape.properties.reg_25_35+shape.properties.reg_36_50+shape.properties.reg_p51;
                        shape.properties.communal = 1;
                        shape.properties.totalVotes = totalVotes;
                        shape.properties.num_polling =desks.length
                        shape.properties.population =0
                        db.collection('districtshapes').insert(shape)
                    }

                }
            })
        })
    })
    console.log("connected ")
});
