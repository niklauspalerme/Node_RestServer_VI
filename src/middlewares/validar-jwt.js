const jwt = require('jsonwebtoken');
const { config } = require('dotenv');
const { Usuarios } = require('../models/usuario');


const validarJWT = async  (req,res,next) =>{

    try {

        config();
        const token = req.header('x-token');
        const payload =  jwt.verify(token,process.env.SECRETKEY);
        const usuario = await Usuarios.findById(payload.uid); 


        //#1 - Validamos que manden el header
        if (!token)
            return res.status(401).json({
                msg: "There is not token on the request."
        })

        try {

            //#2 - Validamos Existencia de Usuario que quiere ejecutar el Endpoint
            if (!usuario){
                return res.status(401).json({
                    msg: "Token Invalid. Pleae try with another one (User doesn't exist)."
                })
            }


            //#3 - Validamos el estado del usuario que quiere ejecutar el Endpoint
            if (usuario.estado === false ){
                return res.status(401).json({
                    msg: "Token Invalid. Pleae try with another one (estado = false)."
                })
            }
            
        } catch (error) {
            console.log(error)
            return res.status(401).json({
                msg: "Token Invalid. Pleae try with another one."
            })
            
        }


        //Pasamos el usuario por referenica al req
        //Para que pueda ser accedido 
        req.usuario=usuario;

        next();

        
    } catch (error) {

        console.log(error)
        return res.status(500).json({
            msg: "Error with the token"
        })
        
    }
}



 module.exports={
     validarJWT
 }