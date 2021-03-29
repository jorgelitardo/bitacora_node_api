const db = require('../database/config')

const Charts = async (req, res) => {

    db.query('SELECT tbl_productos.sub_linea, sum(tbl_consolidado_compras.peso_neto_kg) as peso FROM tbl_productos INNER JOIN tbl_consolidado_compras ON tbl_consolidado_compras.material = tbl_productos.sub_linea AND tbl_consolidado_compras.mes = 2 and tbl_consolidado_compras.anio = 2021 and tbl_productos.mostrar_charts= "A" and tbl_consolidado_compras.status = "cancelado" GROUP by tbl_productos.sub_linea',(err, resp)=>{
        if(err){
            console.log(err)
        }else{
            res.json(resp)
            console.log(resp)
        }
    })

}

module.exports = {
    Charts,
}