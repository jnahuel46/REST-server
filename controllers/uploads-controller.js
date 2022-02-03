const fs = require('fs');
const path = require("path");

const { subirArchivo } = require("../helpers/subir-archivos");
const Producto = require("../models/producto");
const Usuario = require("../models/usuario");

const cargarArchivo = async (req, res) => {

  try {
        //Imagenes
        const nombre = await subirArchivo(req.files, undefined , 'imagenes');
        res.json({ nombre });//El resultado de subirArchivo lo almaceno en nombre y lo imprimo
    } catch (error) {
        res.status(400).json({ msg });
    }

};

const actualizarImg = async (req, res) => {


    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;

        default:
            return res.status(500).json({ msg: 'Error' });
    }


    // Limpiar imágenes previas
    if ( modelo.img ) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
        if ( fs.existsSync( pathImagen ) ) {
            fs.unlinkSync( pathImagen );
        }
    }
    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;

    await modelo.save();

    res.json({
        modelo
    });
}

module.exports = {
    cargarArchivo,
    actualizarImg
}