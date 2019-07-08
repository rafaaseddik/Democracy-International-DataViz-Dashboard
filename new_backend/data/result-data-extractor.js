const fs = require('fs');
const xlsx = require('xlsx');
const GH = require('./global-hierarchy').globalHierarchy;
let municipalities = [].concat(...GH.map(e => e.municipalities.map(a => a.nameAR)));

let result;


workbook = xlsx.readFile('./data/result raw.xlsx');

var sheet_name_list = workbook.SheetNames;
result = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])

fs.writeFileSync('a.json', JSON.stringify(result, null, 4), 'utf-8');
