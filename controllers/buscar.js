const { ObjectId } = require("mongoose").Types;
const Categoria = require("../models/categoria");
const Producto = require("../models/producto");
const Usuario = require("../models/usuario");


const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];



const buscarUsuarios = async (termino, res) => {

    const esMongoID = ObjectId.isValid(termino);
    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        });
    }

    const regExp = new RegExp(termino, 'i');//Esta expresion regular es para que no sea caseSensitive el termino, osea se mas facil de encontar el usuario 

    const usuarios = await Usuario.find({
        $or: [{ nombre: regExp }, { correo: regExp }],//$or es una expresion de mongo para seleccionar, como mysql
        $and: [{ estado: true }]
    });

    res.json({
        results: usuarios
    });

};

const buscarCategorias = async (termino, res) => {

    const esMongoID = ObjectId.isValid(termino);
    if (esMongoID) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        });
    }

    const regExp = new RegExp(termino, 'i');//Esta expresion regular es para que no sea caseSensitive el termino, osea se mas facil de encontar el usuario 

    const categorias = await Categoria.find({
        $or: [{ nombre: regExp }],//$or es una expresion de mongo para seleccionar, como mysql
        $and: [{ estado: true }]
    });

    res.json({
        results: categorias
    });

};

const buscarProductos = async (termino, res) => {

    const esMongoID = ObjectId.isValid(termino);
    if (esMongoID) {
        const producto = await Producto.findById(termino).populate('categoria', 'nombre');
        return res.json({
            results: (producto) ? [producto] : []
        });
    }

    const regExp = new RegExp(termino, 'i');//Esta expresion regular es para que no sea caseSensitive el termino, osea se mas facil de encontar el usuario 

    const productos = await Producto.find({
        $or: [{ nombre: regExp }],//$or es una expresion de mongo para seleccionar, como mysql
        $and: [{ estado: true }]
    }).populate('categoria', 'nombre');

    res.json({
        results: productos
    });

};


const buscar = (req, res) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        });
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'categorias':
            buscarCategorias(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;
        default:
            res.status(500).json({
                msg: 'Problema en el server'
            })
    }

};

module.exports = {
    buscar
}