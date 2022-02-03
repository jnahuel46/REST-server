const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/user-controller');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarAdminRol, tieneRol } = require('../middlewares/validar-roles');



const router = Router();


router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos//traigo la funcion del middleware para validar aca
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 letras').isLength({ min: 6 }),//Esto  NO tiene que estar vacio
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),//Esto tiene que ser un correo--el 1er arg es lo que quiero validar, el 2do es el menssaje
    check('rol').custom(esRolValido),
    validarCampos//traigo la funcion del middleware para validar aca
], usuariosPost);// El segundo argunmento es un middleware

router.delete('/:id', [
    validarJWT,
    //validarAdminRol,
    tieneRol('ADMIN_ROL', 'VENTAS_ROL'),//le envio aca al middleware los argumentos como array 
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);



module.exports = router;

