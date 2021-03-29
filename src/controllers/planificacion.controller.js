const db = require('../database/config');
const btoa = require('btoa')
//Creat product
const Create =(req,res)=>{
    
    const{ fechaplan, cod_clienteplan, direccionplan, placasplan, cod_productoplan,  estadoplan } = req.body
    
    let peso_netoplan = 0
    let conversionplan = 0
    let precioplan = 0
    let subtotalplan = 0
    let transaccion_relplan = "transaccion plan"
    let observacionplan = "Observacion"
    let docplan = "docplan"
    let transaccionplan = "transaccion plan"

    let mydate = new Date(fechaplan);

    let mes_actual = mydate.getMonth() + 1;
    //let dia_actual = fechaplan.getDate();
    let anio_actual = mydate.getFullYear()

    /*console.log(fechaplan);
    console.log(cod_clienteplan);
    console.log(direccionplan);
    console.log(placasplan);
    console.log(cod_productoplan);
    console.log(estadoplan);*/
    if(fechaplan && cod_clienteplan && direccionplan && placasplan && cod_productoplan && estadoplan){
        db.query('INSERT INTO tbl_planificacion_diaria ( fecha_plan, mes_plan, anio_plan, cod_cliente_plan, direccion_plan, placas_plan, cod_producto_plan, peso_neto_plan, conversion_plan, precio_plan, subtotal_plan, transaccion_rel_plan, observacion_plan, doc_plan, estado_plan,transaccion_plan) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [fechaplan, mes_actual, anio_actual, cod_clienteplan, direccionplan, placasplan, cod_productoplan, peso_netoplan, conversionplan, precioplan, subtotalplan, transaccion_relplan, observacionplan, docplan, estadoplan,transaccionplan], async(err, crear)=>{
            if(err){
                console.log(err)
            }else{
                if(crear){
                    await res.send('La plaficiacion a sido Creada')
                }else{
                    await res.send('Algo salio Mal vuelva a intentar')
                }
            }
        })
    }else{
        res.send('No enviar Campos Vacios')
    }
}

/* SELECT tbl_productos.sub_linea, tbl_productos_precios.medida, 
tbl_productos_precios.detalle_producto, tbl_productos_precios.compra_precio 
from tbl_productos 
INNER JOIN tbl_productos_precios ON
 tbl_productos.cod_producto = tbl_productos_precios.codigo_producto 
 WHERE tbl_productos_precios.codigo_cliente = ?',
[codigo]*/

//List listar planificacion
const planificacion_listar =  (req, res)=>{
    db.query('SELECT p.id_plan, p.fecha_plan, p.mes_plan, p.anio_plan, c.nombres_cliente, p.direccion_plan, p.placas_plan, pr.producto_nombre, p.precio_plan, p.conversion_plan, p.precio_plan, p.subtotal_plan, p. transaccion_rel_plan, p.observacion_plan, p.doc_plan, p.estado_plan,p.transaccion_plan FROM tbl_planificacion_diaria p INNER JOIN tbl_productos pr ON p.cod_cliente_plan = pr.item INNER JOIN tbl_clientes c ON c.cod_cliente = p.cod_cliente_plan where p.estado_plan <> "E"', async (err, planificacion)=>{
        if(err){
            await res.json(err)
        }else{
            if(planificacion.length > 0){
                await res.json(planificacion)
            }else{
                await res.send('No exite planificacion')
            }
        }
    });
};

const ListarplanificacionId =  (req, res)=>{
    const {id} =req.body;
    db.query("SELECT tbl_clientes.nombres_cliente, tbl_planificacion_diaria.* FROM tbl_planificacion_diaria INNER JOIN tbl_clientes ON tbl_planificacion_diaria.id_plan = tbl_clientes.cod_cliente WHERE id_plan = ?",[id], async (err, planificacion)=>{
        if(err){
            await res.json(err)
        }else{
            if(planificacion.length > 0){
                let array = [];
                planificacion.forEach(iten => {
                info = {
                    anio_plan:iten.anio_plan,
                    cod_cliente_plan:iten.cod_cliente,
                    cod_producto_plan:iten.cod_producto_plan,
                    conversion_plan:iten.conversion_plan,
                    direccion_plan:iten.direccion_plan,
                    doc_plan:btoa(iten.doc_plan),
                    estado_plan:iten.estado_plan,
                    fecha_plan:iten.fecha_plan,
                    id_plan:iten.id_plan,
                    mes_plan:iten.mes_plan,
                    observacion_plan:iten.observacion_plan,
                    peso_neto_plan:iten.peso_neto_plan,
                    placas_plan:iten.placas_plan,
                    precio_plan:iten.precio_plan,
                    subtotal_plan:iten.subtotal_plan,
                    transaccion_plan:iten.transaccion_plan,
                    transaccion_rel_plan:iten.transaccion_rel_plan,
                    nombres_cliente:iten.nombres_cliente,
                    }
                array.push(info)
            });
                await res.json(array)
            }else{
                await res.send('No exite planificacion')
            }
        }
    });
};

const SubirDocuemnto=(req, res)=>{
    const {Img, id} = req.body
    db.query("UPDATE tbl_planificacion_diaria SET doc_plan = ? WHERE id_plan = ?",[Img, id], async (err, planificacion)=>{
        if(err){
            console.log(err)
        }else{
            await res.send('ok')
        }
    });
}
//llenar camiones
const llenarCamiones =(req,res)=>{
    db.query('SELECT * FROM tbl_combos_varios WHERE tipo_comb = "camiones_placas" and estado_comb = "A"', async(err, comboCamiones)=>{
        if(err){
            console.log(err)
        }else{
            if(comboCamiones){
                await res.json(comboCamiones)
            }else{
                await res.send('No hay camiones')
            }
        }
    })
}
//llenar estados
const llenarEstados =(req,res)=>{
    db.query('SELECT * FROM tbl_combos_varios WHERE tipo_comb = "planificacion_estado" and estado_comb = "A"', async(err, comboEstados)=>{
        if(err){
            console.log(err)
        }else{
            if(comboEstados){
                await res.json(comboEstados)
            }else{
                await res.send('No hay Estados')
            }
        }
    })
}
//llenar combo producto
const llenarComboProducto =(req,res)=>{
    db.query('SELECT cod_producto, sub_linea FROM tbl_productos where estado_prod = "A" order by sub_linea', async(err, comboProductos)=>{
        if(err){
            console.log(err)
        }else{
            if(comboProductos){
                await res.json(comboProductos)
            }else{
                await res.send('No hay Productos')
            }
        }
    })
}
//llenar combo cliente
const llenarComboCliente =(req,res)=>{
    db.query('SELECT cod_cliente, nombres_cliente FROM tbl_clientes GROUP BY nombres_cliente', async(err, nombresClientes)=>{
        if(err){
            console.log(err)
        }else{
            if(nombresClientes){
                await res.json(nombresClientes)
            }else{
                await res.send('No hay clientes')
            }
        }
    })
}
const EditPlanificacion = (req, res)=>{
    const { fechaplanE,cod_clienteplanE,direccionplanE,placasplanE,cod_productoplanE,estadoplanE, id_planE, id } = req.body;
    console.log(id)
    if(fechaplanE && cod_clienteplanE && direccionplanE && placasplanE && cod_productoplanE && estadoplanE && id){
        console.log("yendo")
        console.log(id)
        console.log("yendo22")
        
        db.query('UPDATE tbl_planificacion_diaria SET cod_cliente_plan = ?, direccion_plan = ?, placas_plan = ?, cod_producto_plan = ?, estado_plan = ? WHERE id_plan = ?',
        [cod_clienteplanE, direccionplanE, placasplanE, cod_productoplanE,estadoplanE, id], async(err, user)=>{
            if(err){
                res.json(err)
            }else{
                await res.send('Actualizado Planificacion')
            }
        }) 
        console.log("si envia valores")   
    }else{
        console.log(id)
        console.log("no yendo")
        
        db.query('SELECT * FROM tbl_planificacion_diaria WHERE id_plan=?',[id], async(err, user)=>{
            if(err){
                console.log(err)
                res.json(err)
            }else{
                await res.json(user)
            }
        })
    }
}
//---------------por usar ----------------------
const BuscarCliente =  (req, res)=>{
    const { ruc } = req.body;
    var icon = '?';
    console.log(ruc)
    db.query('SELECT * FROM tbl_planificacion_diaria' ,[ruc] , async (err, user)=>{
        if(err){
            await res.json(err)
        }else{
            if(user.length > 0){
                await res.json(user[0])
            }else{
                await res.send('No exite el Cliente')
            }
        }
    });
};
const BuscarPreciosCliente =  (req, res)=>{
    const { codigo } = req.params;
    console.log(codigo)
    db.query('SELECT tbl_productos.sub_linea, tbl_productos_precios.medida, tbl_productos_precios.detalle_producto, tbl_productos_precios.compra_precio from tbl_productos INNER JOIN tbl_productos_precios ON tbl_productos.cod_producto = tbl_productos_precios.codigo_producto WHERE tbl_productos_precios.codigo_cliente = ?',
    [codigo], async (err, preciosClientes)=>{
        if(err){
            await res.json(err)
        }else{
            if(preciosClientes.length > 0){
                await res.json(preciosClientes)
            }else{
                await res.send('No exiten el precios de productos')
            }
        }
    });
};

const CrearCliente =(req,res)=>{
    const{ fecha_plan, cod_cliente_plan, direccion_plan, placa_plan, cod_producto_plan, peso_neto_plan, transaccion_rel_plan,observacion_plan,doc_plan,estado_plan,transaccion_plan } = req.body
    let mes_plan = 0;
    let anio_plan = 0;
    let conversion_plan = 0;
    let subtotal_plan = 0;
    if(fecha_plan && cod_cliente_plan && direccion_plan && placa_plan && cod_producto_plan && peso_neto_plan && transaccion_rel_plan && observacion_plan && doc_plan && estado_plan && transaccion_plan){
        db.query('INSERT INTO tbl_clientes ( fecha_plan, mes_plan, anio_plan, cod_cliente_plan, direccion_plan, placas_plan, cod_produto_plan, peso_neto_plan, conversion_plan, subtotal_plan, transaccion_rel_plan, observacion_plan,doc_plan,estado_plan, transaccion_plan) VALUES (?,?,?,?,?,?,?,?,?,?)',
        [n_producto,"A",medida,lineap,cod_linea,sublinea,sub_producto,marca,c_producto,"E"], async(err, crear)=>{
            if(err){
                console.log(err)
            }else{
                if(crear){
                    await res.send('Nuevo Cliente Creado')
                }else{
                    await res.send('Algo salio Mal vuelva a intentar')
                }
            }
        })
    }else{
        res.send('No enviar Campos Vacios')
    }
};

module.exports={
    planificacion_listar,
    llenarComboCliente,
    llenarCamiones,
    llenarComboProducto,
    llenarEstados,
    EditPlanificacion,
    Create,
    BuscarCliente,
    BuscarPreciosCliente,
    CrearCliente,
    ListarplanificacionId,
    SubirDocuemnto
}