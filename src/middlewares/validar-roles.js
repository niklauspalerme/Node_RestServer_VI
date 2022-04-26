



const esAdminRole = (req,res,next) =>{


    if (!req.usuario){
        return res.status(500).json({
            msg: "Internal Server Error - It tries to verify the rol before verify the token"
        })
    }

    const {rol, nombre} = req.usuario;

    if(rol !== 'ADMIN_ROLE')
        return res.status(401).json({
            msg: `The user : ${nombre} is not Admin - This user doesn't have the priviligies to continue with the action`
        });

    next();

}


const tieneRol = (...roles) =>{

    return (req,res,next) =>{

        //console.log(roles);

        
        if (!req.usuario){
            return res.status(500).json({
                msg: "Internal Server Error - It tries to verify the rol before verify the token"
            })
        }

        const {rol, nombre} = req.usuario;

        if( !roles.includes(rol))
            return res.status(401).json({
                msg: `The user : ${nombre} doesn't have the priviligies to continue with the action`
            });



        next();



    }

}



module.exports= {
    esAdminRole,
    tieneRol 
}