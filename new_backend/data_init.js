const registrationService = require("./src/services/registration.service");
const shapeService= require('./src/services/shape.service')
const resultsService= require('./src/services/results.service')
module.exports={
    init:function(){
        //registrationService.pushDataToDb()
        //shapeService.pushMunicipalitiesDataToDB()
        //shapeService.pushSectorsDataToDB();
        //resultsService.extractResultPerVotingCenterFromExcel();
        //resultsService.pushMunicipalityResultToDB();
        registrationService.pushPollingDataToDb();
    }
};
