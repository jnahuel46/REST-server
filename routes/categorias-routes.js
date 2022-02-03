const { Router } = require('express');
const { check } = require('express-validator');
const { categoriasPost, categoriasGet, categoriasGetById, categoriasPut, categoriasDelete } = require('../controllers/categorias-controller');
const { existeCategoriaPorId, esRolValido } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarAdminRol } = require('../middlewares/validar-roles');

const router = Router();


//Obtener todas las categorias - Publico
router.get('/', categoriasGet);

//Obtener una categoria por id - Publico
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], categoriasGetById);


//Crear una categoria- Privado (token)
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], categoriasPost);

//Actualizar una categoria- Privado (token)
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], categoriasPut);

//Borrar una categoria- Privado (ADMIN)
router.delete('/:id',[
    validarJWT,
    validarAdminRol,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], categoriasDelete);

module.exports = router;
