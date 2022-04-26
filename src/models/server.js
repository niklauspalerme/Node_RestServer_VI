/////////////////////////////////////////////////////////////
// Importaciones y Requeriments

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config')


/////////////////////////////////////////////////////////////
// Clases


class Server {


    ////////////////////////////////
    //Constructor

    constructor() {

        this.app = express();

        //Path de las rutas
        this.path = {
            auth:       '/api/auth',
            categoria:  '/api/categorias',  
            usuario:    '/api/usuarios',
            producto:   '/api/productos',
            buscar:     '/api/buscar',
            uploads:    '/api/uploads'
        }


        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }

    ////////////////////////////////
    //Metodos


    middlewares = () => {

        //Directorio Publico
        this.app.use(express.static('src/public'));

        //CORS
        this.app.use(cors());

        //Lectura y parseo de body
        this.app.use(express.json());

        //Conectar a la Database
        this.connectionDatabase();

    }


    routes = () => {

        this.app.use(this.path.usuario, require('../routes/user'));
        this.app.use(this.path.auth, require('../routes/auth'));
        this.app.use(this.path.categoria, require('../routes/categorias'));
        this.app.use(this.path.producto, require('../routes/producto'));
        this.app.use(this.path.buscar, require('../routes/buscar'));
        this.app.use(this.path.uploads, require('../routes/uploads'));

    }

    connectionDatabase = async() => {

        await dbConnection();

    }


    listen = (port) => {

        this.app.listen(port, () => {
            console.log(`Server is listen the port ${port}`);
        })

    }

}


/////////////////////////////////////////////////////////////
// Exportamos

module.exports = Server