const { Schema, model } = require('mongoose');


//CUIDADO CON LOS NOMBRES ACA Y EN LA BASE, TIENEN QUE SER EN SINGULAR Y EN LA BASE EN PLURAL
const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true

    },
    estado: {
        type: Boolean,
        required: true,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

module.exports = model('Categoria', CategoriaSchema);