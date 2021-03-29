const  { Router } = require('express')
const router = Router()
const  { total_ventas, total_compras, total_gastos, consultarId } = require('../controllers/dashboard.controller'); 

router.get('/total_compras',total_compras)
router.get('/total_ventas',total_ventas)
router.get('/total_gastos',total_gastos)

router.get('/usuarios/:id',consultarId)


module.exports = router;
