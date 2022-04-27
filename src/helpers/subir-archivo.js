/////////////////////////////////////////////////////////////
// Importaciones y Requeriments


const path = require('path');
const { v4: uuidv4 } = require('uuid');


/////////////////////////////////////////////////////////////
// Funciones


const subirArchivo = (files, extensionesValidas = ['png','jpg', 'jpeg', 'gif'], carpeta = '' ) => {


    return new Promise ( (resolve, reject) => {


        //Organizamos el nombre del archivo y su extensión
        const {archivo} = files;
        const nombreCortado = archivo.name.split('.')
        const extension = nombreCortado[nombreCortado.length -1].toLowerCase( )

        //Validamos extensiones
        if (!extensionesValidas.includes(extension) )
            return reject ('The extension of the file is not valid');


        //Usamos la funcion mv para mover el archivo a la ruta definida
        const nonbreTemp = uuidv4() + '.' + extension;
        const uploadPath =  path.join( __dirname, '../uploads/',carpeta, nonbreTemp);
        archivo.mv(uploadPath, err =>  {
            if (err){
                console.log(err);
                return reject(err);
            }
            else
                resolve(uploadPath);
        });

    });

}


module.exports= {
    subirArchivo
}