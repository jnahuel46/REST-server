const { Schema, model } = require('mongoose');


//CUIDADO CON LOS NOMBRES ACA Y EN LA BASE, TIENEN QUE SER EN SINGULAR Y EN LA BASE EN PLURAL
const ProductoSchema = Schema({
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
    img: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    precio: {
        type: Number,
        default: 0

    },
    categoria: {//Relaciono con categoria
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: {
        type: String
    },
    disponible: {
        type: Boolean,
        default: true,
    }

});

module.exports = model('Producto', ProductoSchema);