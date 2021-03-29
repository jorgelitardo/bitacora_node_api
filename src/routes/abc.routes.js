const  { Router } = require('express')
const router = Router()
const  { abcgastos, detalleabc } = require('../controllers/abc_analisis.controller'); 

router.post('/abcgastos',abcgastos)
router.post('/detalleabc',detalleabc)

/*router.post('/usuarios',usuarios)
router.post('/usuarios/crear',crearUsuarios)
router.delete('/usuarios/:id',Eliminar)
router.get('/usuarios/:id',consultarId)
router.put('/usuarios/:id',editarUsuarios)*/

module.exports = router;
