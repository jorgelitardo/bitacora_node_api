const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const token = require('jsonwebtoken')
const mysql = require('mysql')
// importaciones de las rutas 
const  loginRouter = require('./routes/login.routes');
const  registerRouter = require('./routes/register.routes');
const  dashboardRouter = require('./routes/dashboard.routes');
const  reporteCajaRouter = require('./routes/reporteCaja.routes');
const  chartRouter = require('./routes/charts.routes');
const  abcRouter = require('./routes/abc.routes');
const  clienteRouter = require('./routes/cliente.routes');
const  productoRouter = require('./routes/productos.routes');
const  reporteMovimientosRouter = require('./routes/reporteMovimientos.routes');
const  planificacionRouter = require('./routes/planificacion.routes');

const app = express();
// middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors()); 
app.use(morgan('dev'));
app.use(bodyParser.json());
//  app.use(app.router)
app.use('/validacion',loginRouter)
app.use('/register', registerRouter)
app.use('/dashboard', dashboardRouter)
app.use('/reportecaja', reporteCajaRouter)
app.use('/charts', chartRouter)
app.use('/abc', abcRouter)
app.use('/cliente', clienteRouter)
app.use('/productos', productoRouter)
app.use('/reporteMovimientos', reporteMovimientosRouter)
app.use('/planificacion', planificacionRouter)

//http:localhost:4000/dashboard/
app.listen(4000, ()=>{
    console.log('Server on port 4000')
})
