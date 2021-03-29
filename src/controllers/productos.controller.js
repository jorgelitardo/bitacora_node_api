const db = require('../database/config')


// list products
const ListProducto = (req, res) => {
    db.query('SELECT * FROM tbl_productos', async(err, productos)=>{
        if(err){
            console.log(err)
        }else{
            if(productos){
                await res.json(productos)
            }else{
                await res.send('No hay Productos')
            }
        }
    })
}
//Edit product
const EditProduct = (req, res)=>{

    const { producto_nombreE, estado_prodE, medidaE, lineaE, cod_lineaE, cod_sublineaE, sub_lineaE,itemE, marcaE, cod_productoE, mostrar_chartsE, id } = req.body;
    if(producto_nombreE && estado_prodE && medidaE && lineaE && cod_lineaE && cod_sublineaE && sub_lineaE && itemE && marcaE && cod_productoE && mostrar_chartsE){
        db.query('UPDATE tbl_productos SET producto_nombre =?, estado_prod=?, medida=?, linea=?, cod_linea=?, cod_sublinea=?, sub_linea=?, marca=?, cod_producto=?, mostrar_charts=? WHERE item=?',
        [producto_nombreE, estado_prodE, medidaE, lineaE, cod_lineaE, cod_sublineaE, sub_lineaE, marcaE, cod_productoE, mostrar_chartsE, itemE], async(err, user)=>{
            if(err){
                res.json(err)
            }else{
                await res.send('Actualizado Productos')
            }
        })    
    }else{
        
        db.query('SELECT * FROM tbl_productos WHERE item=?',[id], async(err, user)=>{
            if(err){
                console.log(err)
                res.json(err)
            }else{
                await res.json(user)
            }
        })
    }
}
// Delete products
const Deleteproduct = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM tbl_productos WHERE item = ?',[id], async(err, productos)=>{
        if(err){
            console.log(err)
        }else{
            if(productos){
                await res.send('ok')
            }else{
                await res.send('No hay Productos')
            }
        }
    })
}
//List Material
const Material =(req,res)=>{
    db.query('SELECT * FROM tbl_tipo_material', async(err, maretial)=>{
        if(err){
            console.log(err)
        }else{
            if(maretial){
                await res.json(maretial)
            }else{
                await res.send('No hay Maretial')
            }
        }
    })
}
//List linea
const Linea =(req,res)=>{
    db.query('SELECT linea, cod_linea, max(cod_sublinea) AS sublinea FROM tbl_productos GROUP BY linea', async(err, linea)=>{
        if(err){
            console.log(err)
        }else{
            if(linea){
                await res.json(linea)
            }else{
                await res.send('No hay Linea')
            }
        }
    })
}
//Creat product
const Create =(req,res)=>{
    const{ cod_linea, sublinea, lineap, c_producto, n_producto, sub_producto, marca, medida } = req.body
    if(cod_linea && sublinea && lineap && c_producto && n_producto && sub_producto && marca && medida){
        db.query('INSERT INTO tbl_productos ( producto_nombre, estado_prod, medida, linea, cod_linea, cod_sublinea, sub_linea, marca, cod_producto, mostrar_charts) VALUES (?,?,?,?,?,?,?,?,?,?)',
        [n_producto,"A",medida,lineap,cod_linea,sublinea,sub_producto,marca,c_producto,"E"], async(err, crear)=>{
            if(err){
                console.log(err)
            }else{
                if(crear){
                    await res.send('Nuevo Producto Creado')
                }else{
                    await res.send('Algo salio Mal vuelva a intentar')
                }
            }
        })
    }else{
        res.send('No enviar Campos Vacios')
    }
}
module.exports = {
    ListProducto,
    EditProduct,
    Deleteproduct,
    Material,
    Linea,
    Create,
}