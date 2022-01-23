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

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}