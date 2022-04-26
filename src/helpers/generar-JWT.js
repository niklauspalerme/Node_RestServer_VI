/////////////////////////////////////////////////////////////
// Importaciones y Requeriments

const jwt = require('jsonwebtoken');
const { config } = require('dotenv');


/////////////////////////////////////////////////////////////
// Funciones


const generarJWT = (uid = '') =>{

    config();

    return new Promise ( (resolve, reject) =>{

        const payload = {uid};

        jwt.sign(payload,process.env.SECRETKEY, {
            expiresIn: '1h'
        },(err, token)=>{
            if (err){
                console.log(err);
                reject('The JWT cannot be generated')
            }else{
                resolve(token);
            }     
        })

    })



}


/////////////////////////////////////////////////////////////
// Exportamos

module.exports= {
    generarJWT
}