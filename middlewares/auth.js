
const {decodeToken} = require('../services/jwt');
const dayjs = require("dayjs");
const auth = (req,res,next) =>{
    if(!req.headers.authorization){
        return res.status(401).send({
            status: "error",
            mensaje: "No tiene la autorizacion para realizar esta acción"
        })
    }

    const authHeader = req.headers.authorization;
    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).send({
            status: "error",
            mensaje: "Formato de token inválido. Debe ser Bearer token"
        });
    }
    const token = authHeader.substring(7).replace(/['"]+/g, '');

    try {
        let {payload} = decodeToken(token);

        if(payload.exp <= dayjs().unix()){
             return res.status(401).send({
                status: "error",
                mensaje: "Token expirado"
            })
        }      
        req.user = payload;
        next();
        
    } catch (error) {
         return res.status(401).send({
            status: "error",
            mensaje: "Token invalido"
        })
    }
}

module.exports = {auth};