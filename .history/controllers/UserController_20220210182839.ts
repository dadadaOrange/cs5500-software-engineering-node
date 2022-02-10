import { Request, Response, Express } from "express";
import UserDao from "../daos/UserDao";
import User from "../models/User";
import UserControllerI from "../interfaces/UserController";
import mongoose from "mongoose";

export default class UserController implements UserControllerI {
    private static userDao: UserDao = UserDao.getInstance();
    private static userController: UserController | null = null;
    public static getInstance = (app: Express): UserController => {
        if (UserController.userController === null) {
            UserController.userController = new UserController();
            app.get('/users', UserController.userController.findAllUsers);
            app.get('/users/:userid', UserController.userController.findUserById);
            app.post('/users', UserController.userController.createUser);
            app.delete('/users/:userid', UserController.userController.deleteUser);
            app.put('/users/:userid', UserController.userController.updateUser);
        }
        return UserController.userController;
    }
    private constructor() { }

    // static getInstance(app: Express) {
    //     throw new Error('Method not implemented.');
    // }
    // app: Express;
    // userDao: UserDao;
    // constructor(app: Express, userDao: UserDao) {
    //     this.app = app;
    //     this.userDao = userDao;
    //     this.app.get('/users', this.findAllUsers); 
    //     this.app.get('/users/:userid', this.findUserById); 
    //     this.app.post('/users', this.createUser); 
    //     this.app.delete('/users/:userid', this.deleteUser); 
    //     this.app.put('/users/:userid', this.updateUser);
    // }

    findAllUsers = (req: Request, res: Response) =>
        UserController.userDao.findAllUsers()
            .then(users => res.json(users));

    findUserById = (req: Request, res: Response) => 
        UserController.userDao.findUserById(req.params.userid)
            .then(user => res.json(user)); 
        
    createUser = (req: Request, res: Response) =>
        this.userDao.createUser(req.body)
            .then(user => res.json(user));

    deleteUser = (req: Request, res: Response) => 
        this.userDao.deleteUser(req.params.userid)
            .then(status => res.json(status)); 

    updateUser = (req: Request, res: Response) =>
        this.userDao.updateUser(req.params.userid, req.body)
            .then(status => res.json(status));
}