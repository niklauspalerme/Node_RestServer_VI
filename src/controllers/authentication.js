/////////////////////////////////////////////////////////////
// Importaciones

const bcrypt = require("bcryptjs/dist/bcrypt");
const { response } = require("express");
const { generarJWT } = require("../helpers/generar-JWT");
const { googleVerify } = require("../helpers/google-verify");
const { Usuarios } = require("../models/usuario");




/////////////////////////////////////////////////////////////
// Funciones del Authentication


//POST /api/auth/login
const login = async (req,res) => {

   try {

        console.log("POST /api/auth/login")

        const {correo, password} = req.body;

        const usuario = await Usuarios.findOne({correo});


        //Email

        if (!usuario)
            return res.status(400).json({
                msg: "User/Password are invalid. Please try again (Email)"
        })

        //Password
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if(!validPassword)
            return res.status(400).json({
                msg: "User/Password are invalid. Please try again (Password)"
        })

        //Generar JWT

        const token = await generarJWT(usuario.id);


        res.json({
           "msg": "POST /api/auth/logi",
           usuario,
           token
        })
       
   } catch (error) {
        res.status(500).json({
            "msg": error
        })
   }

}


//POST /api/auth/google

const googleSignin = async (req,res) => {

    try {

        console.log("POST /api/auth/google")

        const {id_token}= req.body;

        const {nombre,correo, img}= await googleVerify(id_token);

        let usuario = await Usuarios.findOne({correo});

        console.log(usuario);

        //Validamos #1 - Si no existe el user
        if (!usuario){
            const data = {
                nombre,
                correo,
                password: 'ABC',
                img,
                google: true,
                rol: "USER_ROLE"
            };

            usuario = new Usuarios(data);
            console.log(usuario);
            await usuario.save();
        }


        //Validamos #2 - Que el User no este bloqueado por el state
        if (!usuario.estado){
            return res.status(401).json({
                msg: "The user is blocked. Please contact the Adminitrator"
            });
        }


        //Generar JWT
        const token = await generarJWT(usuario.id);

        console.log(token);

        res.status(200).json({
            msg: "POST /api/auth/google",
            token,
            usuario
        })
        
    } catch (error) {
        res.status(400).json({
            msg: "Google token is not valid"
        })
    }

}




/////////////////////////////////////////////////////////////
// Exportaciones

module.exports = {
   login,
   googleSignin
}