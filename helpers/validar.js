
import  validator from 'validator';
export const validarUsuario = (body)=>{
    let val_nombre = !validator.isEmpty(body.nombre)&&validator.isLength(body.nombre,{min:3,max:10})&&validator.trim(body.nombre);
    let val_apellido = !validator.isEmpty(body.apellido)&&validator.isLength(body.apellido,{min:3,max:10})&&validator.trim(body.apellido);
    let val_email = !validator.isEmpty(body.email)&&validator.isLength(body.email,{min:3,max:100})&&validator.isEmail(body.email)&&validator.trim(body.email);
    let val_password = !validator.isEmpty(body.password)&&validator.isLength(body.password,{min:5,max:20})&&validator.trim(body.password);
    if(!val_nombre || !val_apellido || !val_email || !val_password){
        throw new Error("Faltan campos obligatorios");
    }
}

export const validarLibro = (body)=>{
    let val_titulo = !validator.isEmpty(body.titulo)&&validator.isLength(body.titulo,{min:3,max:100})&&validator.trim(body.titulo);
    let val_autor = !validator.isEmpty(body.autor)&&validator.isLength(body.autor,{min:3,max:50})&&validator.trim(body.autor);
    let val_estado = !validator.isEmpty(body.estado)&&validator.isLength(body.estado,{min:3,max:10})&&validator.trim(body.estado);
    if(!val_titulo || !val_autor || !val_estado){       
        throw new Error("Faltan campos obligatorios");
    }
}

export const validarLogin = (body)=>{
    let val_email = !validator.isEmpty(body.email)&&validator.isEmail(body.email)&&validator.trim(body.email);
    let val_password = !validator.isEmpty(body.password)&&validator.trim(body.password);
    if(!val_email || !val_password){
        throw new Error("Faltan campos obligatorios");
    }
}

export const validarSearch = (text)=>{
    let val_text = !validator.isEmpty(text)&&validator.trim(text);
    if(!val_text){
        return null
    }
    return text
}

