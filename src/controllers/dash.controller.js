const db = require('../database/config')

const Compras = (req, res)=>{
    db.query("SELECT SUM(peso_neto_kg) as Total_kilos, SUM(a_pagar) as total_pagar FROM tbl_consolidado_compras WHERE status = 'Cancelado' AND mes = 1 AND anio = 2021", async(err, user)=>{
        /*if(user){
            await res.json(user)
        }else{
            await res.json('No exite compras')
        }*/
        if(err){
            console.log(err);
        }else{
            if(product){
                res.json(product)
            }else{
                res.json([{"0":"0"}]);
            }
        }
        //res.data === 'Lista de Productos Vacia'
    });
};

const Ventas = (req, res)=>{
    db.query("SELECT SUM(peso_neto_kg) as Total_kilos, SUM(a_pagar) as total_pagar FROM tbl_consolidado_ventas WHERE status = 'Cancelado'  AND fecha between '2021-01-01' AND '2021-01-31'", async(err, user)=>{
        if(user){
            await res.json(user)
        }else{
            await res.json('No exite vantas')
        }
    });
};

const Gastos = (req, res)=>{
    db.query(
    "SELECT tipo_gast, cuenta_gast, SUM(egreso_gast) as Total_gastos FROM tbl_caja_chica WHERE tipo_gast = 'INGRESO' AND status = 'A' AND fecha_gast BETWEEN '2016-08-25' and '2016-08-25' GROUP BY tipo_gast, cuenta_gast", async(err, user)=>{
        if(user){
            await res.json(user)
        }else{
            await res.json('No exite vantas')
        } 
    })
}

module.exports={
    Compras,
    Ventas,
    Gastos
}