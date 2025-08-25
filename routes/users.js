import { Router } from 'express';
const router = Router();
import auth from '../middlewares/auth.js';
import { test, getUsers, getOne, create, deleteUser, login } from '../controllers/user.js';

// ruta prueba
router.get("/user-prueba", auth, test);
router.get("/users", getUsers);
router.get("/users/:id", getOne);
/**
 * @swagger
 * /api/users/create:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Datos de entrada inválidos o usuario ya existe
 *       500:
 *         description: Error del servidor
 */
router.post("/users/create", create);
router.delete("/users/:id", deleteUser);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error del servidor
 */
router.post("/login", login);

export default router; // 👈 aquí el fix
