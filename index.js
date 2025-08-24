const express = require('express');
const cors = require('cors');
const { connection } = require('./database/connection');
const {bookRoutes} = require('./routes/books');
const {userRoutes} = require('./routes/users');
require('dotenv').config();
//service
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); //content-type application/json
const PREFIX = process.env.URL_PREFIX || '/api';

app.use(PREFIX,bookRoutes);
app.use(PREFIX,userRoutes);

app.listen(PORT,()=>{
    console.log(`Libro API ejecutándose en http://localhost:${PORT}`);
    connection();
})