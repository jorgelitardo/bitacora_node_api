const  { Router } = require('express')
const router = Router()
const  { SubirDocuemnto,ListarplanificacionId,Create,EditPlanificacion,llenarEstados,llenarComboProducto,llenarComboCliente,llenarCamiones, planificacion_listar, BuscarCliente, BuscarPreciosCliente, CrearCliente } = require('../controllers/planificacion.controller'); 

router.get('/comboCliente',llenarComboCliente);
router.get('/estados',llenarEstados);
router.get('/comboProducto',llenarComboProducto);
router.get('/camiones',llenarCamiones);
router.put('/edit', EditPlanificacion)
router.get('/list',planificacion_listar)
router.post('/create', Create);
router.post('/buscarCliente',BuscarCliente)
router.get('/precios/:codigo',BuscarPreciosCliente)
router.post('/crearcliente/',CrearCliente)
router.post('/ListarplanificacionId',ListarplanificacionId)
router.post('/doc_plan',SubirDocuemnto)
//router.get('/precios/:codigo',BuscarPreciosCliente)


module.exports = router;