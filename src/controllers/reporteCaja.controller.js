const db = require('../database/config')

const saldo_anterior = (req, res)=>{
    const { desde, hasta } = req.body;
    //let des = desde.split("/",1);
    let mydate = new Date(desde);
    console.log(mydate);

    let mes_actual = mydate.getMonth() + 1;
    let dia_actual = mydate.getDate();
    let anio_actual = mydate.getFullYear()
    let fecha_desde = anio_actual + "-" + mes_actual + "-" + dia_actual;
    let mydate2 = new Date(hasta);
    mes_actual = mydate2.getMonth() + 1;
    dia_actual = mydate2.getDate();
    anio_actual = mydate2.getFullYear()
    fecha_hasta = anio_actual + "-" + mes_actual + "-" + dia_actual;

    console.log(fecha_desde,fecha_hasta);    
    db.query('select sum(saldo) as saldo_anterior from tbl_saldos_diarios where fecha between ? and ?',[fecha_desde , fecha_hasta] , async(err, saldo_anterior)=>{
        //console.log(saldo_anterior[0])
        if(saldo_anterior != null){
            await res.json(saldo_anterior)
        }else{
            await res.json([{"saldo_anterior":"0"}])
        }
    });
};
const ventastot = (req, res)=>{
    const { desde, hasta } = req.body;
    console.log(desde); 
    db.query('select sum(a_pagar) as total_venta from tbl_consolidado_ventas where status ="para facturar" and (fecha between ? and ?)',[desde, hasta] , async(err, ventas)=>{
        console.log(ventas[0])
        if(ventas != null){
            await res.json(ventas)
        }else{
            await res.json([{"total_pagar":"0"}])
        }
    });
};
const comprastot = (req, res)=>{
    const { desde, hasta } = req.body;
    console.log(desde); 
    db.query('select material,sum(peso_neto_kg) as Total_kilos,sum(a_pagar) as total_pagar from tbl_consolidado_compras where status ="Cancelado" and (fecha between ? and ?) group by material',[desde, hasta] , async(err, compras)=>{
        if(compras.length === 0){
            await res.json([{"total_pagar":"0","Total_kilos":"0"}])
        }else{
            await res.json(compras)
        }
    });
};
const ingresostot = (req, res)=>{
    const { desde, hasta } = req.body;
    console.log(desde);
    db.query('SELECT cuenta_gast, sum(egreso_gast) as Total_ingresos, sum(egreso_gast) as Total_ingresos2 FROM tbl_caja_chica WHERE tipo_gast = "Ingreso" and (fecha_gast between ? and ?) group by cuenta_gast',[desde, hasta] , async(err, tot_ingresos)=>{
        if(tot_ingresos != null ){
            await res.json(tot_ingresos)
        }else{
            await res.json([{"Total_ingresos":"0","Total_ingresos2":"0", }])
        }
    });
};
const gastostot = (req, res)=>{
    const { desde, hasta } = req.body;
    console.log(desde);
    db.query('SELECT sum(egreso_gast) as Total_gastos, sum(egreso_gast) as Total_gastos2 FROM tbl_caja_chica WHERE tipo_gast = "Gastos" and (fecha_gast between ? and ?)',[desde, hasta] , async(err, tot_gastos)=>{
        // console.log(tot_gastos[0])
        if(tot_gastos != null ){
            await res.json(tot_gastos)
        }else{
            await res.json([{"Total_gastos":"0","Total_gastos2":"0", }])
        }
    });
};
const porpagartot = (req, res)=>{
    const { desde, hasta } = req.body;
    console.log(desde); 
    db.query('select cliente,sum(peso_neto_kg) as Total_kilos,sum(a_pagar) as total_pagar from tbl_consolidado_compras where status ="Por Pagar" and (fecha between ? and ?) group by cliente',[desde, hasta] , async(err, porpagar)=>{
        if(porpagar.length === 0){
            await res.json([{"total_por_pagar":"0","Total__kilos":"0"}])
        }else{
            await res.json(porpagar)
        }
    });
};
module.exports={
    saldo_anterior,
    comprastot,
    ventastot,
    ingresostot,
    porpagartot,
    gastostot
}