const express = require('express');
const router = express.Router();
const {auth} = require('../middlewares/auth');
const userController = require('../controllers/user');

//ruta prueba
router.get("/user-prueba",auth,userController.test);
router.get("/users",userController.getUsers);
router.get("/users/:id",userController.getOne);
router.post("/users/create",userController.create);
router.delete("/users/:id",userController.deleteUser);
router.post("/login",userController.login);

const userRoutes = router;
module.exports = {userRoutes};