const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");
require('dotenv').config();
const SECRET = process.env.JWT_SECRET;

const creaeToken = (user)=>{
    const payload = {
        id: user.id,
        nombre: user.nombre+" "+user.apellido,
        email: user.email,
        exp: dayjs().add(1, 'hour').unix()
    }
    return jwt.sign(payload,SECRET)
}

const decodeToken = (token) => {
    return payload = jwt.decode(token, {complete: true})
}

module.exports = {
    creaeToken,
    decodeToken
}
