const fs= require('fs');
const xlsx = require('xlsx')
const MunicipalityResult = require("../models/municipalityResult.model").model
const globalHierarchy = require('../../data/global-hierarchy').globalHierarchy
let similarity = require('../utils.js').similarity


module.exports={
    extractResultPerVotingCenterFromExcel:function(){
        let path ="data/results_per_voting_center";
        let fileNames = []
        let municipalities = [].concat(...globalHierarchy.map(e=>e.municipalities.map(a=>a.nameAR)));
        //console.log(municipalities);
        fs.readdir(path, function(err, items) {
            fileNames = items.map(item=>item.replace('.xlsx','').replace('.xls',''));
            let notFound=0;
            municipalities.forEach(mun=>{
                let found = false;
                fileNames.forEach(file=>{
                    if(file===mun){
                        found=true;
                    }else if(similarity(file,mun)>0.8){
                        console.log(file+"|"+mun)
                    }

                })
                if(!found){
                    notFound++;
                }
            })
            console.log(notFound)
        });

    },
    pushMunicipalityResultToDB:function(){
        fs.readFile('data/raw results.json', (err, data) => {
            (JSON.parse(data)).forEach(result=>{
                let newResult = new MunicipalityResult(result);
                newResult.save();
            })
        })
    },
    getMunicipalityResultByMunicipalityName:function(munName){
        return new Promise((resolve, reject) => {
            MunicipalityResult.find({"mun_fr":munName}).then(result=>{
                resolve(result);
            })
        })
    }
}
