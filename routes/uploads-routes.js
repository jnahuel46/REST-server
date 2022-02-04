const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImg, mostrarImagenes } = require('../controllers/uploads-controller');
const { coleccionesPermitidas } = require('../helpers/db-validators');
const { validarArchivoSubir } = require('../middlewares/validar-archivo');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.post('/', validarArchivoSubir, cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'No es un ID valido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImg);

router.get('/:coleccion/:id', [
    //validarArchivoSubir,
    check('id', 'No es un ID valido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagenes);





module.exports = router;
