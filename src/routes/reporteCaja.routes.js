const  { Router } = require('express')
const router = Router()
const  { saldo_anterior,ventastot, comprastot, gastostot, ingresostot, porpagartot } = require('../controllers/reporteCaja.controller'); 

router.post('/saldoanterior',saldo_anterior)
router.post('/comprastot',comprastot)
router.post('/ventastot',ventastot)
router.post('/gastostot',gastostot)
router.post('/ingresostot',ingresostot)
router.post('/porpagartot',porpagartot)

/*router.post('/usuarios',usuarios)
router.post('/usuarios/crear',crearUsuarios)
router.delete('/usuarios/:id',Eliminar)
router.get('/usuarios/:id',consultarId)
router.put('/usuarios/:id',editarUsuarios)*/

module.exports = router;
