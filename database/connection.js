const mongoose = require("mongoose");

const connection = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB conectado: ${conn.connection.host}`);      
    } catch (error) {
        throw new Error("No se ha podido conectar a la base de datos");
    }
}

module.exports = {
    connection
}

