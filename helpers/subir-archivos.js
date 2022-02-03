const path = require("path");
const { v4: uuidv4 } = require('uuid');

const subirArchivo = ( files, extensionesValidas = ['png', 'txt', 'jpg', 'gif'], carpeta = '') => {
    
    return new Promise( (resolve, reject) => {
        
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        //validar la extension
        if (!extensionesValidas.includes(extension)) {
            reject( `La extension ${extension} no es valida - Extensiones validas ${extensionesValidas}`)
        };

        const nombreCustom = uuidv4() + '.' + extension; // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const uploadPath = path.join(__dirname, '../uploads/', carpeta ,nombreCustom);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            resolve(nombreCustom);
        });
    })
};

module.exports = {
    subirArchivo
}