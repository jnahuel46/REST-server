const Usuario = require("../models/usuario");
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");
const { json } = require("express/lib/response");
const { DefaultTransporter } = require("google-auth-library");



const login = async (req, res) => {

    const { correo, password } = req.body;
    try {

        //verificar si el correo existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario incorrecto'
            })
        }

        //si el usuario esta activo
        if (!usuario.estado) {// si el estado del usuario es inactivo va a tirar false
            return res.status(400).json({
                msg: 'Usuario / Password incorrectos, usuario inactivo'
            })
        }

        //verificar la contraseña
        const  validarPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validarPassword) { // si los password no coinciden va a tirar false
            return res.status(400).json({
                msg: 'Password incorrecto'
            })
        }

        //generar el JWT
         const token = await generarJWT( usuario.id );// voy a generar esta funcionalidad en los helpers

        res.json({
            msg: 'Login OK',
            usuario,
            token
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        })
    }

};

const googleSign = async (req, res) => {

    const { id_token } = req.body;
    
    try {
        const { correo, nombre, img } = await googleVerify( id_token );

        let usuario = await Usuario.findOne({ correo });

        if ( !usuario ) {
            // Tengo que crearlo
            const data = {
                nombre,
                correo,
                rol: 'ADMIN_ROL',
                password: ':P',
                img,
                google: true
            };

            usuario = new Usuario( data );
            await usuario.save();
        }

        // Si el usuario en DB
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );
        
        res.json({
            usuario,
            token
        });
        
    } catch (error) {

        res.status(400).json({
            ok: false,
            msg: 'Token de Google no es válido'
        })

    }

};

module.exports ={
    login,
    googleSign
};