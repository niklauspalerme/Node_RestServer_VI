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

    //#3 - Organizamos el nombre del archivo y su extensión
    const {archivo} = req.files;
    const nombreCortado = archivo.name.split('.')
    const extension = nombreCortado[nombreCortado.length -1]


    //#4 -Validamos extensiones
    const extencionesValidas = ['png','jpg', 'jpeg', 'gif'];
    if (extencionesValidas.includes(extension))
        return res.status(400).json({
            msg: 'The extesntion of the file is not valid'
        });


    // #5 - Usamos la funcionm mv para mover el archivo a la ruta definida
    const uploadPath =  path.join( __dirname, '../uploads/',archivo.name);
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