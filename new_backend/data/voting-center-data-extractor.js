const fs = require('fs');
const xlsx = require('xlsx');
const GH = require('./global-hierarchy').globalHierarchy;
let municipalities = [].concat(...GH.map(e=>e.municipalities.map(a=>a.nameAR)));

let result = {};

municipalities.forEach(mun=>{
    var workbook;
    try{
        workbook = xlsx.readFile('./data/results_per_voting_center/clean/'+mun+'.xlsx');
    }catch(e){
        try{
        workbook = xlsx.readFile('./data/results_per_voting_center/clean/'+mun+'.xls');
        }catch(a){
            console.error(mun+"  not found")
            return;
        }
    }
    var sheet_name_list = workbook.SheetNames;
    result[mun] = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
})

fs.writeFileSync('a.json', JSON.stringify(result, null, 4), 'utf-8');
