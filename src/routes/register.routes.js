const  { Router } = require('express')


const router = Router()
const  { RegistroUsuario, ListUsuario, DeleteUsuario, UpdateUsuario } = require('../controllers/register.controller'); 

router.post('/', RegistroUsuario );
router.get('/usuarios',  ListUsuario );
router.delete('/usuarios/:id', DeleteUsuario)
router.put('/edit', UpdateUsuario)

module.exports = router;