# API REST para Gestión de Libros
Una API REST desarrollada con Node.js, Express, MongoDB y Mongoose para la gestión de libros con sistema de autenticación JWT.
---

## 🚀 Características
- Gestión de libros: CRUD completo para libros (crear, leer, actualizar, eliminar)
- Autenticación JWT: Sistema seguro de autenticación con tokens
- Encriptación de contraseñas: Contraseñas seguras con bcrypt
- Estructura modular: Controladores, modelos, rutas y middlewares
- Base de datos MongoDB: Almacenamiento persistente con Mongoose ODM
- Endpoints protegidos: Acceso restringido para operaciones sensibles
---

## 🛠 Requisitos

- Node.js (v14 o superior)
- CMongoDB (local o en la nube)
- MySQL
- npm o yarn
---

## ⚙ Instalación

1. **Clona el repositorio:**

```bash
    git clone https://github.com/JairSilva09/LibrosAPI.git
    cd LibrosAPI
```

2. **Renombrar .env.example e instalar dependencias:**
```bash    
    npm install
    Renombra .env.example como .env y configura las variables de entorno:
```
3. **inicializar o levantar el servidor:**
```bash
    npm start
```

4. **Para desarrollo:**
```bash
    npm run dev
```

## 📚 Estructura del Proyecto
/
├── controllers/     # Lógica de los controladores
├── models/          # Modelos de Mongoose
├── routes/          # Definición de rutas
├── middleware/      # Middlewares personalizados
├── database/        # Configuración de la base de datos
|── services/        # Lógica de negocio y servicios
|── helpers/         # Utilidades y funciones auxiliares
└── index.js         # Aplicación principal


## 🔁 Paginación y busqueda
GET /books?page=2&limit=10&search=al

## 🔐 Autenticación
La API utiliza JSON Web Tokens (JWT) para autenticación. Para acceder a endpoints protegidos, incluye el token en el header de las solicitudes:
**headers:**
```bash
    Authorization: Bearer <token>
```
## 📌 Endpoints

```bash
    base_url: {tu host}/api
    Query_string: ?page={pagina}&limit={registros_por_pagina}&search={key}

    Autenticación:
    
    POST /api/users/create - Registrar nuevo usuario
    POST /api/login - Iniciar sesión y obtener token 

    Libros (Requieren autenticación):

    GET /api/books - Obtener todos los libros (disponible para todos)
    GET /api/books/:id - Obtener un libro por ID (disponible para todos)
    POST /api/books/create - Crear un nuevo libro (solo usuarios autenticados)
    PUT /api/books/:id - Actualizar un libro (solo usuarios autenticados)
    DELETE /api/books/:id - Eliminar un libro (solo usuarios autenticados)
```
## 📦 Modelos de Datos
**Usuario:**
```bash
    {
        nombre: String (requerido),
        apellido: string (requerido),
        email: String (requerido),
        password: String (requerido,encriptada)
    }
```

**Libro:**
```bash
    {
        titulo: String (requerido),
        autor: string (requerido),
        anio_pub: String,
        estado: String (requerido)
    }
```

## 🛠️ Tecnologías Utilizadas
    Node.js - Entorno de ejecución
    Express.js - Framework web
    MongoDB - Base de datos
    Mongoose - ODM para MongoDB
    JWT - Autenticación con tokens
    bcrypt - Encriptación de contraseñas

## Author

- [@JairSilva09](https://www.github.com/JairSilva09)

## Version
1.0.0


