const {Schema, model} = require('mongoose');

const bookScheme = Schema(
    {
        titulo:{
            type: String,
            required: true
        },
        autor: {
            type: String,
            required: true
        },
        anio_pub: {
            type: String
        },
        estado: {
            type: String,
            required: true
        },
        creado_por: {
            type: String,
            required: true
        }
    }
)

module.exports = model('Book',bookScheme);