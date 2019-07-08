const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MunicipalityShapeSchema = new Schema({
    type: String,
    properties:
        {
            state: String,
            LABEL: String,
            chair: String,
            area: String,
            LABEL_AR: String,
            POP: String,
            gouv_name: String,
            gouv_name_ar: String
        }
    ,
    geometry: {
        type: {type:String},
        coordinates: [[[[Number]]]]
    }

});


module.exports = {
    schema: MunicipalityShapeSchema,
    model: mongoose.model('MunicipalityShape', MunicipalityShapeSchema)
};
