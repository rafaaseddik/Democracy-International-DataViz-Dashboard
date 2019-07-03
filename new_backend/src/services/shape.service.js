const fs = require('fs')
module.exports = {
    getAllGovsShape: function () {
        return new Promise(((resolve, reject) => {
            fs.readFile('data/shapes/gov_shape.geojson', (err, data) => {
                resolve(JSON.parse(data))
            })
        }))
    }

}
