import express from 'express';
import cors from 'cors';
import connection from './database/connection.js';
import bookRoutes from './routes/books.js';
import userRoutes from './routes/users.js';
import swaggerUI from 'swagger-ui-express';
import dotenv from 'dotenv';
import specs from './swagger/swagger.js';

dotenv.config();

//service
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); //content-type application/json

const PREFIX = process.env.URL_PREFIX || '/api';

// 👇 aquí el fix
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(specs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'API Gestión de Libros'
}));

app.use(PREFIX, bookRoutes);
app.use(PREFIX, userRoutes);

app.listen(PORT, () => {
  console.log(`Libro API ejecutándose en http://localhost:${PORT}`);
  connection();
});
