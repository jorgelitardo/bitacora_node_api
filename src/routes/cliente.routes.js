const  { Router } = require('express')
const router = Router()
const  { BuscarCliente, Cliente, BuscarPreciosCliente, CrearCliente } = require('../controllers/cliente.controller'); 

router.post('/buscarCliente',BuscarCliente)
router.get('/list',Cliente)
router.get('/precios/:codigo',BuscarPreciosCliente)
router.post('/crearCliente',CrearCliente)
//router.get('/precios/:codigo',BuscarPreciosCliente)


module.exports = router;