const { Schema, model } = require('mongoose');


//CUIDADO CON LOS NOMBRES ACA Y EN LA BASE, TIENEN QUE SER EN SINGULAR Y EN LA BASE EN PLURAL
const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']

    }
});

module.exports = model('Role', RoleSchema);