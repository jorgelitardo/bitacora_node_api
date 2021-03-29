const { Router } = require('express')
const router = Router()
const { Charts } = require('../controllers/charts.controller'); 

router.get('/', Charts );


module.exports = router;