const Categoria = require('../models/categoria');
const Producto = require('../models/producto');
const Role = require('../models/role');
const Usuario = require('../models/usuario');


const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error('El rol no esta registrado');
    }
};

const emailExiste = async (correo ='') => {
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo }); //buscamos en la instancia Usuario si existe el correo

    if (existeEmail) {
        throw new Error('El correo ya  esta registrado');
    }
}

const existeUsuarioPorId = async (id) => {
    //Verificar si el id existe
    const existeUsuario = await Usuario.findById( id ); //buscamos en la instancia Usuario si existe el correo

    if (!existeUsuario) {
        throw new Error('El ID no existe');
    }

}

const existeCategoriaPorId = async (id) => {
    //Verificar si el id existe
    const existeCategoria = await Categoria.findById( id ); //buscamos en la instancia Usuario si existe el correo

    if (!existeCategoria) {
        throw new Error('El ID no existe');
    }

}

const existeProductoPorId = async (id) => {
    //Verificar si el id existe
    const existeProducto = await Producto.findById( id ); //buscamos en la instancia Usuario si existe el correo

    if (!existeProducto) {
        throw new Error('El ID no existe');
    }

}

const coleccionesPermitidas = ( coleccion = '', colecciones = []) => {

    if (!colecciones.includes(coleccion)) {
        throw new Error(`La coleccion ${coleccion} no es permitida, las permitidas son ${colecciones}`)
    }
    return true;

}




module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}