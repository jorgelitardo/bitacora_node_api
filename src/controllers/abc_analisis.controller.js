const db = require('../database/config')

const abcgastos = (req, res)=>{
    const { desde, hasta } = req.body;
    console.log(desde);
    db.query('SELECT cuenta_gast,sum(egreso_gast) as Total_gastos FROM tbl_Caja_chica WHERE tipo_gast = "Gastos" and (fecha_gast between ? and ?) GROUP BY cuenta_gast ORDER by Total_gastos DESC',[desde, hasta] , async(err, abc_gastos)=>{
        console.log(abc_gastos)
        if(abc_gastos != null ){
            await res.json(abc_gastos)
        }else{
            await res.json({"Total_gastos":"0","Total_gastos2":"0", })
        }
    });
};
const detalleabc = (req, res)=>{
    const { desde, hasta, cuenta } = req.body;
    console.log(desde,hasta,cuenta);
    db.query('SELECT fecha_gast, cuenta_gast,egreso_gast FROM tbl_Caja_chica WHERE cuenta_gast = ? and (fecha_gast between ? and ?) ORDER by fecha_gast ASC',[cuenta, desde, hasta] , async(err, detalle_abc_gastos)=>{
        console.log(err)
        if(detalle_abc_gastos != null ){
            await res.json(detalle_abc_gastos)
        }else{
            await res.json({"Total_gastos":"0","Total_gastos2":"0", })
        }
    });
};

module.exports={
    detalleabc,
    abcgastos
}