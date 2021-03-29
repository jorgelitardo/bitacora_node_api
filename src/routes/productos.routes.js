const  { Router } = require('express')


const router = Router()
const  { ListProducto, Deleteproduct, EditProduct, Material, Linea, Create } = require('../controllers/productos.controller'); 

router.get('/productos',  ListProducto );
router.get('/materiale',  Material );
router.get('/linea',  Linea );

router.post('/create',  Create );


router.delete('/productos/:id', Deleteproduct)
router.put('/edit', EditProduct)

module.exports = router;