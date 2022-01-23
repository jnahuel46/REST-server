const { Schema, model } = require('mongoose');
const UsuarioSchema = Schema ({
    
    nombre: {
        type: String,
        required: [true ,'El nombre es obligatorio'],
    },
    correo: {
        type: String,
        required: [true ,'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true ,'El password es obligatorio'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: [true ,'El rol es obligatorio'],
        emun: ['ADMIN_ROL', 'USER_ROL']
    },
    estado: {
        type: Boolean,
        default: true//cuando creo un user por defecto va a estar en true en activado, si lo borro va a false
    },
    google: {
        tyoe: Boolean,
        default: false// A menos que le indique lo contrario va a ser un user creado por google
    }
});

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema); // Exporto el nombre del schema que es usuario, mongo lo cambia a plural "usuarios", y el 2do arg es el schema

