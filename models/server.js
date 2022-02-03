//En la carpeta "models", van las clases que me van a permitir trabajar de manera mas ordenada

const express = require('express');//aca creamos un webserver, para servir contenido estatico
const cors = require('cors');
const { dbConecction } = require('../database/config-db');
const fileUpload = require('express-fileupload');



class Server {

    constructor() {// cuando se llame al constr al final voy a llamar a las routes

        this.app = express();//Configuro puerto
        this.port = process.env.PORT;
        this.usuariosRoutePath = '/api/usuarios';
        this.authPath = '/api/auth';
        this.categoriasPath = '/api/categorias';
        this.productosPath = '/api/productos';
        this.buscarPath = '/api/buscar';
        this.uploadsPath = '/api/uploads';



        // Conectar a DB
        this.conectarDb();

        //Middlewares
        this.middlewares();//Configuro archivos staticos que van a ser servidos

        //Routes
        this.routes();

    }

    async conectarDb() {
        await dbConecction();
    }

    middlewares() { //funcion que se ejecuta antes de llamar al controlador so seguir con la ejecucino de las peticiones
        //Cors
        this.app.use(cors());

        //Lectura y Parseo del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));

        //Carga de Archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {

        this.app.use(this.authPath, require('../routes/auth-routes'));
        this.app.use(this.usuariosRoutePath, require('../routes/user-routes'));
        this.app.use(this.categoriasPath, require('../routes/categorias-routes'));
        this.app.use(this.productosPath, require('../routes/productos-routes'));
        this.app.use(this.buscarPath, require('../routes/buscar-routes'));
        this.app.use(this.uploadsPath, require('../routes/uploads-routes'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor en puerto:', this.port);
        });
    }

};


module.exports = Server;