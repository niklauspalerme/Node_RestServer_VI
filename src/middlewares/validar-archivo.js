

const validarArchivoUpload = (req,res,next) =>{

     // #1 - Verificamos que venga un file
     if ( !req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            msg: 'No files were uploaded.'
        });
    }

    // #2 - Verificamos que venga files con el nombre "archivo"
    if (!req.files.archivo ) {
        return res.status(400).json({
            msg: 'No files were uploaded.'
        });
    }


    next();

}


module.exports={
    validarArchivoUpload
}