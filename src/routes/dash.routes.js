const { Router } = require('express')
const router = Router()
const { Compras, Ventas, Gastos } = require('../controllers/dash.controller'); 

router.get('/compra', Compras );
router.get('/venta', Ventas )
router.get('/gastos', Gastos )
// router.get('/usuarios',  ListUsuario );
// router.delete('/usuarios/:id', DeleteUsuario)
// router.put('/edit', UpdateUsuario)

module.exports = router;