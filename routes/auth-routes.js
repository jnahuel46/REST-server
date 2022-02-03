const { Router } = require('express');
const { check } = require('express-validator');
const {login, googleSign} = require('../controllers/auth-controller');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.post('/login', [
check('correo', 'El correo es obligatorio').isEmail(),
check('password', 'La contraseña es obligatoria').not().isEmpty(),
validarCampos
],
login);// como segundo parametro llamo a su controlador

router.post('/google', [
    check('id_token', 'id_token').not().isEmpty(),
    validarCampos
], googleSign);// como segundo parametro llamo a su controlador


module.exports = router;
