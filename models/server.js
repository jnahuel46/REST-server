//En la carpeta "models", van las clases que me van a permitir trabajar de manera mas ordenada

const express = require('express');//aca creamos un webserver, para servir contenido estatico
const cors = require('cors');



class Server {

    constructor() {// cuando se llame al constr al final voy a llamar a las routes
        
        this.app = express();//Configuro puerto
        this.port = process.env.PORT;
        this.usuariosRoutePath = '/api/usuarios';

        //Middlewares
        
        this.middlewares();//Configuro archivos staticos que van a ser servidos
        
        //Routes
        this.routes();
    
    }

    middlewares() {
        //Cors
        this.app.use(cors());

        //Lectura y Parseo del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
         
        this.app.use(this.usuariosRoutePath, require('../routes/user-routes'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor en puerto:', this.port);
        });
    }

};


module.exports = Server;