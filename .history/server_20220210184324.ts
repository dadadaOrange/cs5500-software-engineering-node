import express, {Request, Response} from 'express';
const app = express();

//import controller
import UserController from "./controllers/UserController"
import TuitController from "./controllers/TuitController";

//connect mongoose
import mongoose from "mongoose";
mongoose.connect('mongodb://localhost:27017/tuiter');


//controller instance 
// const userController = UserController.getInstance(app);
// const tuitController = TuitController.getInstance(app);


app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World! Chengcheng!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));



const PORT = 4000;
app.listen(process.env.PORT || PORT);