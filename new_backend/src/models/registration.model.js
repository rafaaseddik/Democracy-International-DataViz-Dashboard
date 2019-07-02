const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var RegistrationSchema = new Schema({
    gov_fr: String,
    mun_name1: String,
    lon: Number,
    lat: Number,
    desks: Number,
    REG_NUMBER: Number,
    MALE_REG: Number,
    FEMALE_REG: Number,
    map_names_ar: String,
    mun_fr: String,
    gov_ar: String,
    VALID_VOTES: Number,
    total_vote: Number,
    Invalid_votes: Number,
    TURNOUT:Number,
    SEATS: Number,
    LIST_NUMBER: Number
});



module.exports = {
    schema:RegistrationSchema,
    model : mongoose.model('Registration',RegistrationSchema)
};
