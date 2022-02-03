const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');



//Usuario va en mayuscula porque me va a permitir crear de esa manera una instancia
//manejamos los callbacks de las routes desde aqui, desde el controller


const usuariosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;//Para ponerle limite de getters
    const queryEstado = { estado: true };//Solo retorno lo que tenga estado true

    /*const usuarios = await Usuario.find(queryEstado)
        .skip(Number(desde))
        .limit(Number(limite));
    const total = await Usuario.countDocuments(queryEstado);*/ //Abajo junto las dos promesas anteriores  en el .all

    const [total, usuarios] = await Promise.all([ //Desestructuro lo que me vanga del promise.all
        Usuario.countDocuments(queryEstado),//1er elemento del array desestructurado
        Usuario.find(queryEstado)//2do elemento del array desestructurado
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPut = async (req, res = response) => {

    const id = req.params.id;
    const { _id, password, google, correo, ...resto } = req.body;// recibo lo que me pase por el url  com parametr( despues del"?")


    //Validar ID contra db

    if (password) {
        //Encryptar contraseña
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);//1er arg el id, segundo lo que quiero actualizar


    res.json({
        usuario
    });
}

const usuariosPost = async (req, res = response) => {


    const { nombre, correo, password, rol } = req.body;//lo que me manda el cliente
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en DB
    await usuario.save();// aca gaurdo en la base

    res.json({

        usuario//recibo lo que mando el cliente

    });
}

const usuariosDelete = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;
    const usuarioAuth = req.usuario;  // el uid viene del validar token

    //Borrado Fisico--No aconsejado porque se puede perder la integridad de las referencias
    //const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });


    res.json({
        usuario,
        uid,
        usuarioAuth
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
};