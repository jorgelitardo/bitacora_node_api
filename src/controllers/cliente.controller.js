const db = require('../database/config');

const BuscarCliente =  (req, res)=>{
    const { ruc } = req.body;
    var icon = '?';
    console.log(ruc)
    db.query('SELECT * FROM tbl_clientes WHERE  cedula_cliente LIKE "%" ? "%"' ,[ruc] , async (err, user)=>{
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
//List Clien
const Cliente =  (req, res)=>{
    db.query('SELECT * FROM tbl_clientes ', async (err, cliente)=>{
        if(err){
            await res.json(err)
        }else{
            if(cliente.length > 0){
                await res.json(cliente)
            }else{
                await res.send('No exite el Cliente')
            }
        }
    });
};
const CrearCliente =(req,res)=>{
    const{ nombres_cliente, tipo_cliente, cedula_cliente, direccioncliente, telefonos_cliente, direccion_email, status,cod_sustento,cta_plan_cta } = req.body
    if(nombres_cliente && tipo_cliente && cedula_cliente && direccioncliente && telefonos_cliente && direccion_email && status && cod_sustento && cta_plan_cta){
        db.query('INSERT INTO tbl_clientes ( nombres_cliente, tipo_cliente, cedula_cliente, direccioncliente, telefonos_cliente, direccion_email, status,cod_sustento,cta_plan_cta) VALUES (?,?,?,?,?,?,?,?,?)',
        [nombres_cliente, tipo_cliente, cedula_cliente, direccioncliente, telefonos_cliente, direccion_email, status,cod_sustento,cta_plan_cta], async(err, crear)=>{
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
    BuscarCliente,
    Cliente,
    BuscarPreciosCliente,
    CrearCliente
}