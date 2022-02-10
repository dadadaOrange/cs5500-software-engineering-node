"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get('/hello', (req, res) => res.send('Hello Chengcheng!'));
app.get('/add/:a/:b', (req, res) => res.send(req.params.a + req.params.b));

const mongoose = require('mongoose');// load the mongoose library
mongoose.connect('mongodb://localhost:27017/movie-db');// connect to the movie-db database

const PORT = 4000;
app.listen(process.env.PORT || PORT);
