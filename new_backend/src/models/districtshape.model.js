const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports= {
    model: mongoose.model('districtshapes', new Schema({}, {strict: false}), 'districtshapes')
}
