/////////////////////////////////////////////////////////////
// Importaciones

const path = require('path');



/////////////////////////////////////////////////////////////
// Funciones del Controlador


const cargarArchivo = (req,res) =>{
    
    console.log('POST /api/uploads');

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

    //#3 - Definimos la ruta a mover
    const {archivo} = req.files;
    const uploadPath =  path.join( __dirname, '../uploads/',archivo.name);

    // #4 - Usamos la funcionm mv para mover el archivo a la ruta definida
    archivo.mv(uploadPath, err =>  {
        if (err){
            console.log(err);
            return res.status(500).json({
                msg: 'Internal Server Error.'
            });
        }
        else
            return res.status(200).json({
                msg: `File uploaded to:  ${uploadPath}`
            });
    });
}



/////////////////////////////////////////////////////////////
// Exportaciones

module.exports = {
    cargarArchivo
}