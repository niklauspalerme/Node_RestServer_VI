/////////////////////////////////////////////////////////////
// Importaciones


const mongoose = require('mongoose');
const { config } = require('dotenv');


/////////////////////////////////////////////////////////////
// Funciones

const dbConnection = async() => {

    try {

        config();

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("MongoDB Connected :D");

    } catch (error) {
        console.log(error)
        throw new Error("Error to Connect DB Mongoose");
    }

}



/////////////////////////////////////////////////////////////
// Exportaciones

module.exports = {
    dbConnection
}