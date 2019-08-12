//getMunicipalityResultByMunicipalityName


const express = require('express');
const router = express.Router();

const resultsService = require('../services/results.service')


router.get('/resultsData', (req, res) => {
    let municipalityName = req.query.municipalityName;
    //capitalize it
    municipalityName = municipalityName.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
    console.info("[REGISTRATION] getting municipality results data for " + municipalityName);

    resultsService.getMunicipalityResultByMunicipalityName(municipalityName).then(result=>{
        res.json({
            status:200,
            data:result
        })
    })
})



module.exports = router;
