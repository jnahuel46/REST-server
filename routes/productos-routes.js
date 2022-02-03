const { Router } = require('express');
const { check } = require('express-validator');
const { productosGet, productosGetById, productosPost, productosPut, productosDelete } = require('../controllers/productos-controller');
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarAdminRol } = require('../middlewares/validar-roles');

const router = Router();


//Obtener todas las categorias - Publico
router.get('/', productosGet);

//Obtener una categoria por id - Publico
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], productosGetById);


//Crear una categoria- Privado (token)
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un Id de mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], productosPost);

//Actualizar una categoria- Privado (token)
router.put('/:id', [
    validarJWT,
    check('categoria', 'No es un Id de mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], productosPut);

//Borrar una categoria- Privado (ADMIN)
router.delete('/:id',[
    validarJWT,
    validarAdminRol,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], productosDelete);

module.exports = router;
