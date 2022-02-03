const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");



const validarJWT = async (req, res, next) => {

    const token = req.header('user-token');
    if (!token) {
        return res.status(401).json({
            msg: 'Coloque el user-token en los headers'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)// extraigo de aca el uid

        //leer el usuario que coreesponde al uid
        const usuario = await Usuario.findById(uid);//envio el usuario autenticado el controller
        req.uid = uid;// este uid viene de la rquest(req) por lo tanto va a pasar por todos las  funciones de la ruta, hasta el delete

        //validar existencia del usuario
        if (!usuario) {
            return res.status(401).json({
                msg: 'El usuario esta ha sido borrado o no existe'
            });
        }

        //validar rol del usuario


        
        //validar estado del usuario
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'El usuario esta inactivo'
            });
        }

        req.usuario = usuario;
        next();

    } catch (err) {
        console.log(err);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }


}

module.exports = {
    validarJWT
}