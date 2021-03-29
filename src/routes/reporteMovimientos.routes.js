const  { Router } = require('express')
const router = Router()
const  { totCompras, totVentas } = require('../controllers/reporteMovimientos.controller'); 

router.post('/totalcompras',totCompras)
router.post('/totalventas',totVentas)

module.exports = router;
