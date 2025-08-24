const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../services/jwt');
const {validarUsuario,validarLogin} = require('../helpers/validar');
const test = (req,res)=>{
    return res.status(200).json(
        {
            mensaje: "Soy una respuesta desde el controlador user"
        }
    )
}

const create = async (req,res)=>{
    let body = req.body;
    try {
        //validar
        validarUsuario(body);    
        
        let existingUser = User.find({$or: [
            {email: body.email.toLowerCase()}
        ]}).exec();
        if(existingUser && existingUser.length >= 1){
            return res.status(200).json({
                status: "success",
                mensaje: "El usuario ya existe"
            });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(body.password,salt);
        body.password = hash;
        const userToSave = new User(body);        
        const userStored = await userToSave.save();
        return res.status(201).json({
            status: "success",
            mensaje: userStored
        });       
    } catch (error) {
        return res.status(400).json({
            status: "error",
            error: error.message      
        });        
    }
}

const getUsers = async (req,res)=>{

    let limit = req.query.limit ?? '10';
    let page = req.query.page ?? '1';
    let skip = (page - 1) * limit;
    limit = parseInt(limit);
    page = parseInt(page);

    try {
        let total_documents = await User.countDocuments();
        if(total_documents && total_documents >= 1){
            let resp = await User.find({})
                                .sort({
                                    apellido: 1 //ascendente
                                })
                                .skip(skip)
                                .limit(limit)
                                .exec();
            return res.status(200).json(
                {
                    status: "success",
                    mensaje: resp,
                    page: page,
                    total: resp.length,
                    limit: limit,
                    totalDocuments: total_documents,
                    totalPages: Math.ceil(total_documents / limit)
                }
            )
        }else{
            return res.status(200).json(
                {
                    status: "success",
                    mensaje: "No se han encontrado usuarios"
                }
            )

        }
    } catch (error) {
         return res.status(400).json(
            {
                status: "error",
                mensaje: "No se han encontrado usuarios"
            }
        )
    }
}

const getOne = async (req,res) => {
    let id = req.params.id;
    try {
        let resp = await User.findById(id).exec();                                
        return res.status(200).json(
            {
                status: "success",
                mensaje: resp ?? "Usuario no encontrado"               
            }
        )
    } catch (error) {
         return res.status(400).json(
            {
                status: "error",
                mensaje: "No se ha encontrado el usuario"
            }
        )
    }
}

const deleteUser = async (req,res) => {    
    let id = req.params.id;
     try {
        let query = await User.findOneAndDelete({_id:id})                                
                                                .exec();

        return res.status(200).json(
            {
                status: "success",
                mensaje: query ?? "Usuario no eliminado"               
            }
        )
    } catch (error) {
         return res.status(400).json(
            {
                status: "error",
                mensaje: "No se ha eliminado el usuario"
            }
        )
    }
}

const login = async (req,res) =>{
    let body = req.body;
    try {
        //validar
        validarLogin(body);
        let result = await User.findOne({email:body.email})
                                                    .exec();                                                   

        if(!result) return res.status(404).send({status: "error",mensaje: "El usuario no existe"});
        let pwd = await bcrypt.compare(body.password,result.password);        
        if(!pwd) return res.status(400).send({status: "error",mensaje: "Paswword erroneo"}); 
        const token = jwt.creaeToken(result);
        return res.status(200).json(
            {
                status: "success",
                user: {
                    id: result._id,
                    nombre: result.nombre,
                    apellido: result.apellido,
                },
                token : token            
            }
        )
    } catch (error) {
         return res.status(400).json(
            {
                status: "error",
                mensaje: "No se ha encontrado el usuario"
            }
        )
    }
}

module.exports = {
    test,
    create,
    getUsers,
    getOne,
    deleteUser,
    login
}