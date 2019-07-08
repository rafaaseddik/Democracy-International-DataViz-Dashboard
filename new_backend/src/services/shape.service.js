const fs = require('fs')
const MunicipalityShape = require("../models/minicipalityShape.model").model
const SectorShape = require("../models/sectorShape.model").model
const globalHierarchy = require('../../data/global-hierarchy').globalHierarchy
let similarity = require('../utils.js').similarity
 

function hasNumber(myString) {
    return /\d/.test(myString);
}
function extractNumber(str){return parseInt(str.replace(/^[^0-9]+/, ''), 10)}


module.exports = {
    getAllGovsShape: function () {
        return new Promise(((resolve, reject) => {
            fs.readFile('data/shapes/gov_shape.geojson', (err, data) => {
                resolve(JSON.parse(data))
            })
        }))
    },
    getMunicipalitiesShapeByGovName:function(govName){
        return new Promise((resolve,reject)=>{
            MunicipalityShape.find({
                'properties.gouv_name':govName
            }).then(result=>resolve(result)).catch(err=>reject(err));
        })
    },
    getSectorsShapeByGovName:function(govName){
        return new Promise((resolve,reject)=>{
            SectorShape.find({
                'properties.gov_en':govName
            }).then(result=>resolve(result)).catch(err=>reject(err));
        })
    },
    getSectorsShapeByMunicipalityName:function(munName){
        return new Promise((resolve,reject)=>{
            SectorShape.find({
                'properties.mun_en':munName
            }).then(result=>resolve(result)).catch(err=>reject(err));
        })
    },
    pushMunicipalitiesDataToDB:function(){
        let raw_shapes = fs.readFileSync('data/shapes/municipalities_shapes.json');
        let shapes_json = JSON.parse(raw_shapes).features;
        console.log(shapes_json.length)
        shapes_json.forEach(elt=>{
            let newShape = new MunicipalityShape(elt);
            newShape.save()
        })
    },
    pushSectorsDataToDB:function(){
        let raw_shapes = fs.readFileSync('data/shapes/sectors_shapes.geojson');
        let shapes_json = JSON.parse(raw_shapes).features;
        let notfound = 0;
        let total_districts = 0;
        shapes_json.forEach(sector=>{
            let sectorName = sector.properties.name_ar;
            let found =false;
            total_districts = 0;
            globalHierarchy.forEach(gov=>{
                gov.municipalities.forEach(mun=>{
                    mun.districts.forEach(distr=>{
                        if(distr==sectorName){
                            found=true;
                            sector.properties.mun_ar = mun.nameAR;
                            sector.properties.mun_en = mun.nameEN;
                            sector.properties.gov_ar = gov.nameAR;
                            sector.properties.gov_en = gov.nameEN;
                            let newSector = new SectorShape(sector);
                            newSector.save();
                            
                        }
                        else{/*
                            let levenshteinDistance = similarity(distr,sectorName)
                            if(levenshteinDistance>0.8 &&
                                (
                                    (hasNumber(sectorName) && hasNumber(distr)&& extractNumber(sectorName)==extractNumber(distr))
                                    ||
                                    (!hasNumber(sectorName) && !hasNumber(distr))
                                ) ){
                                console.log(distr+"\n"+sectorName+"\n-"+mun.nameAR+"--"+gov.nameAR+"\n\n")
                            }*/
                        }
                    });


                    total_districts+= mun.districts.length
                })

            })
            if(found===false){
                sector.properties.mun_ar = "not_found";
                sector.properties.mun_en = "not_found";
                sector.properties.gov_ar = "not_found";
                sector.properties.gov_en = "not_found";
                let newSector = new SectorShape(sector);
                newSector.save();
                notfound++;
                //console.log(sectorName + "  " + sector.properties.NAME1)
            }

        })
        console.log(notfound)
        console.log(shapes_json.length)
        console.log(total_districts)
        //fs.writeFileSync('sectors.json', JSON.stringify(shapes_json, null, 4), 'utf-8');
        console.log("done")
        /*shapes_json.forEach(elt=>{
            let newShape = new MunicipalityShape(elt);
            newShape.save()
        })*/
    }

}
