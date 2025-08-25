import { Schema, model } from 'mongoose';

const userScheme = Schema(
    {
        nombre:{
            type: String,
            required: true
        },
        apellido: {
            type: String,
            required: true
        },       
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    }
)

export default model('User',userScheme);