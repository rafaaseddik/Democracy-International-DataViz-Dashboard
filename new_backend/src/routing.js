var express = require('express')
var router = express.Router()


const shapeController = require('./controllers/shape.controller');
const registrationController = require('./controllers/registration.controller');
const resultsController = require('./controllers/results.controller');

router.use('/api/shape',shapeController);
router.use('/api/registration',registrationController);
router.use('/api/results',resultsController);

module.exports = router;
