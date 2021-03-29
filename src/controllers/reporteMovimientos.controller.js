const db = require('../database/config')

const totCompras = (req, res)=>{
    const { desde, hasta } = req.body;
    console.log(desde);
    //SELECT tbl_productos.sub_linea, tbl_productos_precios.medida, tbl_productos_precios.detalle_producto, tbl_productos_precios.compra_precio from tbl_productos INNER JOIN tbl_productos_precios ON tbl_productos.cod_producto = tbl_productos_precios.codigo_producto WHERE tbl_productos_precios.codigo_cliente = ? 
    db.query('SELECT c.fecha, c.mes, c.anio, c.cliente, gye as direccion, c.transporte, 1 as status, p.sub_linea, p.linea, p.medida, COMPRAS as tipo2, c.tipo, c.peso_neto_kg, c.peso_toneladas_tonel, c.precio_kg, c.observacion, c.subtotal, c.a_pagar FROM tbl_consolidado_compras c INNER JOIN tbl_productos p ON c.material = p.sub_linea WHERE mes = ? and anio = 2021 order by c.numero',[desde, hasta] , async(err, totcompras)=>{
        if(totcompras.length === 0){
            await res.json([{"total_pagar":"0","Total_kilos":"0"}])
        }else{
            await res.json(totcompras)
        }
    });
};

const totVentas = (req, res)=>{
    const { desde, hasta } = req.body;
    console.log(desde); 
    console.log(hasta); 
    db.query('SELECT c.fecha, c.mes, c.anio, c.cliente, c.transporte, 1 as status, p.sub_linea, p.linea, p.medida, c.tipo, c.peso_neto_kg, c.peso_toneladas_tonel, c.precio_kg, c.observacion, c.subtotal, c.a_pagar FROM tbl_consolidado_compras c INNER JOIN tbl_productos p ON c.material = p.sub_linea WHERE (fecha between ? and ?) order by c.numero',[desde, hasta] , async(err, ventas)=>{
        console.log(ventas)
        if(ventas != null){
            await res.json(ventas)
        }else{
            await res.json([{"total_pagard":"0"}])
        }
    });
};
module.exports={
    totCompras,
    totVentas
}