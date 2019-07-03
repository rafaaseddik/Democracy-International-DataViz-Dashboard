const fs = require('fs');
const file = fs.readFileSync('data/registration raw.json');
const file2 = fs.readFileSync('data/registration_data.json');
const RG = JSON.parse(file).dataroot.registration
const RD = JSON.parse(file2).MIXED_CLEAN

var govsNames = []
var govs = [];

const coordinates = {
    'Manouba': [36.8, 9.84],
    'Beja': [36.9, 9.29],
    'Ben Arous': [36.65, 10.23],
    'Gabes': [33.8, 9.7],
    'Gafsa': [34.5, 8.8],
    'Jendouba': [36.7, 8.7],
    'Kairouan': [35.6, 9.9],
    'Kasserine': [35.3, 8.8],
    'Kebili': [33.4, 8.9],
    'Le Kef': [36.1, 8.7],
    'Medenine': [33.3, 11.1],
    'Mahdia': [35.6, 10.7],
    'Tataouine': [32.06, 10.02],
    'Tozeur': [34, 7.94],
    'Zaghouan': [36.3, 10.0],
    'Monastir': [35.4, 10.7],
    'Sidi Bouzid': [34.86, 9.54],
    'Siliana': [36.1, 9.35],
    'Sousse': [35.92, 10.4],
    'Ariana': [36.96, 10.13],
    'Bizerte': [37, 9.6],
    'Nabeul': [36.67, 10.71],
    'Tunis': [36.8, 10.13],
    'Sfax': [34.82, 10.41],
};


//preparing the governorats
RG.forEach(elt => {
    if (!govsNames.includes(elt.gov_en)) {
        let newGov = {
            nameEN: elt.gov_en,
            nameAR: elt.gov_ar,
            coordinates:coordinates[elt.gov_en],
            municipalities: []
        };
        if(newGov.coordinates===undefined)
            console.log(newGov.nameEN)
        govs.push(newGov)
        govsNames.push(elt.gov_en)
    }

});

let i = 0
//preparing the municipalities
RD.forEach(elt => {
    let gov = govs.find(g => g.nameAR === elt.gov_ar)
    if (!gov.municipalities.includes(m => m.nameEN === elt.mun_fr)) {
        let newMun = {
            nameEN: elt.mun_fr,
            nameAR: elt.mun_name1,
            districts: []
        }
        i++
        gov.municipalities.push(newMun)
    }
});

// preparing the districts
RG.forEach(elt => {
    let municipality = govs.find(g => g.nameAR === elt.gov_ar).municipalities.find(m => m.nameAR === elt.mun_name1);
    let districtsSet = new Set(municipality.districts)
    districtsSet.add(elt.district)
    districtsSet = Array.from(districtsSet).sort()
    municipality.districts = []
    municipality.districts = districtsSet

})


fs.writeFileSync('govs.json', JSON.stringify(govs, null, 4), 'utf-8');
console.log(i)
