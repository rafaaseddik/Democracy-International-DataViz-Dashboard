var express = require('express')
var router = express.Router()


const shapeController = require('./controllers/shape.controller');
const registrationController = require('./controllers/registration.controller');

router.use('/api/shape',shapeController);
router.use('/api/registration',registrationController);

module.exports = router;
