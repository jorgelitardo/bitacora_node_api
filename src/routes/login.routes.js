const  { Router } = require('express')
const router = Router()
const  { Login } = require('../controllers/validar.controller'); 

router.post('/', Login );

module.exports = router;
