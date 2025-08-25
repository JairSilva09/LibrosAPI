import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Gestión de Libros',
      version: '1.0.0',
      description: 'API REST para gestión de libros con autenticación JWT',
      contact: {
        name: 'Jair Silva',
        email: 'harryhaller30@gmail.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo'
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Book: {
          type: 'object',
          required: ['titulo', 'autor', 'anio_pub','estado'],
          properties: {           
            titulo: {
              type: 'string',
              description: 'Título del libro'
            },
            autor: {
              type: 'string',
              description: 'Autor del libro'
            },
            anio_pub: {
              type: 'string',
              description: 'Año de publicación del libro'
            },
            estado: {
              type: 'string',
              enum: ['disponible', 'reservado'],
              description: 'Estado actual del libro'
            }
          }
        },
        User: {
          type: 'object',
          required: ['nombre', 'email', 'apellido','password'],
          properties: {
            nombre: {
              type: 'string',
              description: 'Nombre de usuario'
            },
            apellido: {
              type: 'string',
              description: 'Apellido de usuario'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email del usuario'
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Contraseña encriptada'
            }
          }
        },
        Auth: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Email del usuario'
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Contraseña del usuario'
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js', './models/*.js'] // archivos donde están las anotaciones
};

const specs = swaggerJsdoc(options);

export default specs
