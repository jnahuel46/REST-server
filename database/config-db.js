const mongoose = require('mongoose');



const dbConecction = async() => {

    try {
        
        await mongoose.connect( process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Conexion a DB correcta');

    } catch (error) {
        throw new Error ('Database Fail')
    }
 
};


module.exports = {
  dbConecction
}