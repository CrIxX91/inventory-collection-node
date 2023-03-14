const express = require('express');
require('dotenv').config();
const cors = require("cors");
const { dbConection } = require('./database/config');

const app = express();
dbConection();

app.use(express.static('public'));
app.use(cors());

app.use(express.json());
app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT,()=>{
    console.log(`servidor corriendo en puerto ${process.env.PORT}`)
})