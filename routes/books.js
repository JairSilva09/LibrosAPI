import { Router } from 'express';
const router = Router();
import auth  from '../middlewares/auth.js';
import { test, getBooks, getOneBook, deleteBook, create, updateBook } from '../controllers/book.js';

//ruta prueba
router.get("/book-prueba",auth,test);
/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Obtiene todos los libros
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Lista de libros obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       500:
 *         description: Error del servidor
 */
router.get("/books",getBooks);
/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Obtiene un libro por ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del libro
 *     responses:
 *       200:
 *         description: Libro encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Libro no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/books/:idBook",getOneBook);
/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Elimina un libro por ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del libro
 *     responses:
 *       200:
 *         description: Libro eliminado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Libro no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/books/:idBook",auth,deleteBook);
/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Crea un libro
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Libro creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Datos de entrada inválidos
 *       401:
 *         description: No autorizado - Token requerido
 *       500:
 *         description: Error del servidor
 */
router.post("/books/create",auth,create);
/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Actualiza un libro
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del libro
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Libro creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Datos de entrada inválidos
 *       401:
 *         description: No autorizado - Token requerido
 *       500:
 *         description: Error del servidor
 */
router.put("/books/:idBook",auth,updateBook);

export default router;
