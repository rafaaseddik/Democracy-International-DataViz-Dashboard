const MongoClient = require('mongodb').MongoClient;
const Globals = require('../globals');
const votingCentersData = require('./parties-per-district-fr')
const registrationData = require('./registration raw').dataroot.registration

const GH = require('./global-hierarchy').globalHierarchy;
let municipalities = [].concat(...GH.map(e => e.municipalities));

MongoClient.connect(Globals.database.url, (err, client) => {
    if (err) return console.log(err)
    db = client.db('municipalities_DI');
    db.collection('districtpollingdata').find({}).toArray((err, result) => {
        console.log(result)
    })
    let pollingData = municipalities.map(mun => {
        centers=[];
        registrationData.filter(e => e.mun_name2 === mun.nameAR).forEach(center => {

            if (votingCentersData[center["mun_name2"]])
                desks = votingCentersData[center["mun_name2"]].filter(r => {
                    return r.pollingCenter === center.vc_name;
                })
            else{
                console.error(mun)
            }
            if (desks.length > 0) {
                keys = Object.keys(desks[0]).filter(k => (k !== 'pollingCenter' && k !== 'pollingDesk'));
                // add keys
                keys.forEach(k => {
                    center[k.replace(".","")] = 0
                })
                desks.forEach(d => {
                    keys.forEach(k => {
                        center[k.replace(".","")] += parseInt(d[k])
                    })
                    center['sum'] = (parseInt(center['f_p51']) + parseInt(center['m_p51']) + parseInt(center['f_36_50']) + parseInt(center['m_36_50']) + parseInt(center['f_25_35']) + parseInt(center['m_25_35']) + parseInt(center['f_22_24']) + parseInt(center['m_22_24']) + parseInt(center['f_18_21']) + parseInt(center['m_18_21'])).toString();
                })
                center.imeda = center.district
                center.polling = center.vc_name
                center.gouv = center.gov_ar;
                center.gouv_en = center.gov_en;
                center.mun = mun.nameAR;
                let govCoord= GH.filter(g=>g.nameEN==center.gouv_en)[0].coordinates;
                if(!center.lat)
                    center.lat = govCoord[0].toString();

                if(!center.lon)
                    center.lon = govCoord[1].toString();
            }

            centers.push(center);
        });

        db.collection('districtpollingdata').insert({
            nameAR:mun.nameAR,
            nameEN:mun.nameEN,
            pollingData:centers
        })
    })
    console.log("connected")
});
