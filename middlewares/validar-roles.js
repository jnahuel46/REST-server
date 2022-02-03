


const validarAdminRol = (req, res, next) => {

    if (!req.usuario) { //seguimos trabajando con el usuario enviado en el validar token
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar token primero'
        });
    }

    const { rol, nombre } = req.usuario;//saco los datos que necesito de la request creadda en el validarJWT
    if (rol !== 'ADMIN_ROL') {
        return res.status(401).json({
            msg: ` ${nombre} no es administrador, acceso denegado`
        });
    }

    next();
};

const tieneRol = (...roles) => { //recibo los datos de los roles en forma de array
    return (req, res, next) => {// retorno esta funcion, la cual se va a ejecutar en el routes

        if (!req.usuario) { //seguimos trabajando con el usuario enviado en el validar token
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar token primero'
            });
        }

        if (!roles.includes(req.usuario.rol)) { //seguimos trabajando con el usuario enviado en el validar token
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            });
        }

        next();
    }
};


module.exports = {
    validarAdminRol,
    tieneRol
}