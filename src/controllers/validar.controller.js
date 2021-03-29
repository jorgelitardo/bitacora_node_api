const db = require('../database/config');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Login =  async(req, res)=>{
    const { usuarios, claves } = req.body;
    db.query('SELECT * FROM tbl_accesos WHERE  usuarios = ?',[usuarios], async (err, user)=>{
        if(user){
            await bcrypt.compare(claves, user[0].claves, ()=>{
                const token = jwt.sign({id:user[0].id}, 'secretkey',{expiresIn: 60 * 60})
                res.json({user, token})
            })
        }else{
            await res.send('No exite el Usuario o Clave Incorrecta')
            await res.json(err)
        }
    });
};
module.exports={
    Login,
}