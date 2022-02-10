const express = require('express');
const app = express();

app.get('/hello', (req, res) =>
  res.send('Hello World!!!!'));

//connect mongoDB
const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/movie-db');

const PORT = 4000;
app.listen(PORT);
