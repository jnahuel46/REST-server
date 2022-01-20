const { response, request } = require('express');

//manejamos los callbacks de las routes desde aqui, desde el controller


const usuariosGet = (req = request, res = response) => {

    const query = req.query;

    res.json({
        msg: 'get API desde el controller',
        query
    });
}

const usuariosPut = (req, res = response) => {

    const id = req.params.id;// recibo lo que me pase por el url  com parametr( despues del"?")
    res.json({
        msg: 'put API desde el controller',
        id
    });
}

const usuariosPost = (req, res = response) => {

    const { nombre, edad } = req.body;//lo que me manda el cliente

    res.json({
        msg: 'post API desde el controller',
        nombre,
        edad
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API desde el controller'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
};