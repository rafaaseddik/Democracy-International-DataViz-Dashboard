const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SectorShapeSchema = new Schema({
    type: String,
    properties:
        {
            name_fr: String,
            ref_tn_cod: String,
            name_ar: String,
            mun_en:String,
            mun_ar:String,
            gov_en:String,
            gov_ar:String,
            NAME1: String,
            CodeGeoDel: Number,
            NomDelegat: String,
        }
    ,
    geometry: {
        type: {type: String},
        coordinates: [[[[Number]]]]
    }

});


module.exports = {
    schema: SectorShapeSchema,
    model: mongoose.model('SectorShape', SectorShapeSchema)
};
