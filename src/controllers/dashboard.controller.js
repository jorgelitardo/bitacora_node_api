const db = require('../database/config')

const total_compras = (req, res)=>{
    const fecha = new Date();
    let mes_actual = fecha.getMonth() + 1;
    let dia_actual = fecha.getDate();
    let anio_actual = fecha.getFullYear()
    console.log(mes_actual+"/"+dia_actual+"/"+anio_actual);

    db.query('SELECT sum(peso_neto_kg) as Total_kilos,sum(a_pagar) as total_pagar FROM tbl_consolidado_compras WHERE  status = "cancelado" and mes = ? and anio = ?',[mes_actual, anio_actual] , async(err, tot_compras)=>{
        console.log(tot_compras[0])
        if(tot_compras != null){
            await res.json(tot_compras)
        }else{
            await res.json({"Total_kilos":"0", "total_pagar":"0"})
        }
    });
};
const total_ventas = (req, res)=>{

    const fecha = new Date();
    let mes_actual = fecha.getMonth() + 1;
    let dia_actual = fecha.getDate();
    let anio_actual = fecha.getFullYear()
    console.log(mes_actual+"/"+dia_actual+"/"+anio_actual);

    db.query('SELECT sum(peso_neto_kg) as Total_kilos,sum(a_pagar) as total_pagar FROM tbl_consolidado_ventas WHERE status = "cancelado" and mes = ? and anio = ? ',[mes_actual, anio_actual] , async(err, tot_ventas)=>{
        console.log(tot_ventas[1])
        if(tot_ventas != null){
            await res.json(tot_ventas)
        }else{
            await res.json({"Total_kilos":"0", "total_pagar":"0"})
        }
    });
};
const total_gastos = (req, res)=>{

    const fecha = new Date();
    let mes_actual = fecha.getMonth() + 1;
    let dia_actual = fecha.getDate();
    let anio_actual = fecha.getFullYear()
    console.log(mes_actual+"/"+dia_actual+"/"+anio_actual);

    db.query('SELECT sum(egreso_gast) as Total_gastos, sum(egreso_gast) as Total_gastos1 FROM tbl_Caja_chica WHERE  mes_gast = ? and anio_gast = ? and tipo_gast = "Gastos"',[mes_actual, anio_actual] , async(err, tot_gastos)=>{
        if(tot_gastos != null ){
            console.log(tot_gastos)
            await res.json(tot_gastos)
        }else{
            await res.json([{"Total_gastos":"0","Total_gastos1":"0", }])
        }
    });
};

const consultarId = (req, res)=>{
    const { id } = req.params;
    console.log(id);
    console.log("si esta entrando");

    db.query('select * FROM tbl_accesos WHERE id = ?',[id], async(err, users)=>{
        console.log(users)
        if(users != null){
            await res.json(users)
        }
    });
};

module.exports={
    total_compras,
    total_ventas,
    total_gastos,
    consultarId,

}