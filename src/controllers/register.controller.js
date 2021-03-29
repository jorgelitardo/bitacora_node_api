const db = require('../database/config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// listar usuario
const ListUsuario = (req, res) => {
    const token = req.headers['x-access-token'];
    if(!token){
        return res.status(401).json({
            message: 'No Existen un Token'
        })
    }
    const decoded = jwt.verify(token, 'secretkey')
    console.log(decoded)
    db.query('SELECT * FROM tbl_accesos', async(err, user)=>{
        if(err){
            res.json(err)
        }else{
            await res.json(user)
        }
    })
    
}
// crear usuario nuevo
const RegistroUsuario = async(req, res) => {
    const { usuarios, claves, nivel } = req.body;
    let passHash = await bcrypt.hash(claves, 8)
    console.log(usuarios, passHash, nivel)
    db.query('INSERT INTO tbl_accesos (usuarios, claves, nivel) VALUES (?,?,?)', [usuarios, passHash, nivel], async (err, user) => {
        console.log(err)
        if (user) {
            await res.json('ok')
        } else {
            await res.json('Algo salio mal')
        }
    })
}
// delete usuario
const DeleteUsuario = (req, res)=>{
    const { id } = req.params;
    console.log(id)
    db.query('DELETE FROM tbl_accesos WHERE id=?', [id], (err, user)=>{
        if(err){
            res.json(err)
        }else{
            res.json('ok')
        }
    })
}
// update usuario
const UpdateUsuario = async(req, res)=>{
    const { usuarios, claves, nivel, id } = req.body;
    if(usuarios && claves && nivel && id){
        let passHash = await bcrypt.hash(claves, 8)
        db.query('UPDATE tbl_accesos SET usuarios=?, claves=?, nivel=? WHERE id=?',[usuarios, passHash, nivel, id], async(err, user)=>{
            if(err){
                res.json(err)
            }else{
                await res.json(user)
            }
        })    
    }else{
        db.query('SELECT * FROM tbl_accesos WHERE id=?',[id], async(err, user)=>{
            if(err){
                res.json(err)
            }else{
                await res.json(user)
            }
        })
    }
}
module.exports = {
    RegistroUsuario,
    ListUsuario,
    DeleteUsuario,
    UpdateUsuario
}