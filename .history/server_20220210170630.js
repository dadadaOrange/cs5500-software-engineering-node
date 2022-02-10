const express = require('express');
const app = express();

//import controller
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";

app.get('/hello', (req, res) =>
  res.send('Hello World!!!!'));

//connect mongoDB
const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/tuiter');

//controller instance 
const userController = UserController.get
const PORT = 4000;
app.listen(PORT);
