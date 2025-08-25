import { connect } from "mongoose";

const connection = async() => {
    try {
        const conn = await connect(process.env.MONGODB_URI);
        console.log(`MongoDB conectado: ${conn.connection.host}`);      
    } catch (error) {
        throw new Error("No se ha podido conectar a la base de datos");
    }
}

export default connection
    

