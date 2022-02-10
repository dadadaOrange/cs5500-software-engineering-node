// const express = require('express');
import express from 'express';
const app = express();

//import controller
import UserController from 
// import TuitController from "./controllers/TuitController";

app.get('/hello', (req, res) =>
  res.send('Hello World!!!!'));

//connect mongoDB
//const mongoose = require('mongoose'); 
import mongoose from "mongoose";
mongoose.connect('mongodb://localhost:27017/tuiter');

// //controller instance 
// const userController = UserController.getInstance(app);
// const tuitController = TuitController.getInstance(app);

const PORT = 4000;
app.listen(PORT);
