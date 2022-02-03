const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function googleVerify(token) {

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
    });

    const { name, picture, email } = ticket.getPayload();//estos datos los saque del payload del id_token

    //console.log(payload);

    return {//renombro a español
        nombre: name,
        img: picture,
        correo: email
    }
}

module.exports = {
    googleVerify
}