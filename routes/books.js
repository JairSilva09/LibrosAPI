const express = require('express');
const router = express.Router();
const {auth} = require('../middlewares/auth');
const bookController = require('../controllers/book');

//ruta prueba
router.get("/book-prueba",auth,bookController.test);
router.get("/books",bookController.getBooks);
router.get("/books/:idBook",bookController.getOneBook);
router.delete("/books/:idBook",auth,bookController.deleteBook);
router.post("/books/create",auth,bookController.create);
router.put("/books/:idBook",auth,bookController.updateBook);

const bookRoutes = router;
module.exports = {bookRoutes};
