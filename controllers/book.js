const Book = require('../models/Book');
const {validarLibro,validarSearch} = require('../helpers/validar');

const test = (req,res)=>{
    return res.status(200).json(
        {
            mensaje: "Soy una respuesta desde el controlador Book"
        }
    )
}

const create = async (req,res)=>{
    let body = req.body;
    try {
        //validar
        validarLibro(body);
        body.creado_por = req.user.id;  
        const bookToSave = new Book(body);        
        const bookStored = await bookToSave.save();
        return res.status(201).json({
            status: "success",
            mensaje: bookStored
        });       
    } catch (error) {
        return res.status(400).json({
            status: "error",
            error: error.message      
        });        
    }
}

const getBooks = async (req,res)=>{

    let limit = req.query.limit ?? '10';
    let page = req.query.page ?? '1';
    let search = req.query.search?validarSearch(req.query.search):null
    let skip = (page - 1) * limit;
    const filter= {};
    limit = parseInt(limit);
    page = parseInt(page);
    if(search){
        filter.$or = [
                { autor: { $regex: search,$options: 'i' } },
                { titulo: { $regex: search,$options: 'i' } }
            ]
    }
    try {
        let total_documents = await Book.countDocuments();
        if(total_documents && total_documents >= 1){
            let resp = await Book.find(filter)
                                .sort({
                                    titulo: 1 //ascendente
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
                    search: search,
                    totalDocuments: search?resp.length:total_documents,
                    totalPages: Math.ceil(total_documents / limit)
                }
            )
        }else{
            return res.status(200).json(
                {
                    status: "success",
                    mensaje: "No se han encontrado libros"
                }
            )
        }
    } catch (error) {
        return res.status(400).json(
            {
                status: "error",
                mensaje: "No se han encontrado libros"
            }
        )
    }
}

const getOneBook = async (req,res)=>{
    let idBook = req.params.idBook;
    try {
        let resp = await Book.findById(idBook).exec();
             
        return res.status(200).json(
            {
                    status: "success",
                    mensaje: resp ?? "Libro no encontrado"               
            }
        )
    } catch (error) {
        return res.status(400).json(
            {
                status: "error",
                mensaje: "No se ha encontrado el libro"
            }
        )
    }
}

const updateBook = async(req,res)=>{
    let idBook = req.params.idBook; 
    let body = req.body;    
    try {
        //validar
        validarLibro(body); 
        const book = await Book.findById(idBook); 
        if(book.creado_por != req.user.id){
            return res.status(401).json(
                {
                    status: "error",
                    mensaje: "No esta autorizado para actualizar este libro"
                }
            )
        }      
        let resp = await Book.findByIdAndUpdate(idBook,body,{new: true}).exec();
        return res.status(200).json(
            {
                status: "success",
                mensaje: resp ?? "Libro no encontrado"               
            }
        )
    } catch (error) {
        return res.status(400).json(
            {
                status: "error",
                mensaje: "No se ha actualizado el libro"
            }
        )
    }
}

const deleteBook = async (req,res) => {
    let idBook = req.params.idBook;    
    try {
        let book = await Book.findById(idBook) 
        if(!book){
            return res.status(404).json(
                {
                    status: "error",
                    mensaje: "Libro no encontrado o ya eliminado"
                }
            )
        }
        
        if(book.creado_por != req.user.id){
            return res.status(401).json(
                {
                    status: "error",
                    mensaje: "No esta autorizado para eliminar este libro"
                }
            )
        }

        let resp = await Book.findByIdAndDelete(idBook).exec(); 
                               
                                                
        return res.status(200).json(
            {
                status: "success",
                mensaje: resp ?? "Libro no eliminado"               
            }
        )
    } catch (error) {
        return res.status(400).json(
            {
                status: "error",
                mensaje: "No se ha eliminado el libro"
            }
        )
    }
}

module.exports = {
    test,
    create,
    deleteBook,
    getBooks,
    getOneBook,
    updateBook    
}