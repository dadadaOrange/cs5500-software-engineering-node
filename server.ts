import express, {Request, Response} from 'express';

//import controller
import UserController from "./controllers/UserController"
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";

//connect mongoose
import mongoose from "mongoose";
const connectionString = 'mongodb://localhost:27017/tuiter';
// const connectionString = 'mongodb+srv://chengchengLiu:cs5500@cluster0.ubyhk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(connectionString);

//App Control
const app = express();
app.use(express.json());

app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World! Chengcheng!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

//controller instance 
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);
