const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MunicipalityResultSchema = new Schema({
    mun_fr: String,
    map_names_ar: String,
    gov_en: String,
    gov_ar: String,
    "Type de liste (fr)": String,
    nom_liste_fr: String,
    nom_liste_ar: String,
    votes_obtenus: String,
    porcentage_obtenus: String,
    sieges_obtenus: String,
    total_inscrits: String,
    votes_nul: String,
    votes_blancs: String,
    total_votes_valide: String,
    total_votes: String,
});


module.exports = {
    schema: MunicipalityResultSchema,
    model: mongoose.model('MunicipalityResult', MunicipalityResultSchema)
};
