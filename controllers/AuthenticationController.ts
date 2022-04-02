/**
 * @file Controller RESTful Web service API for authentication resource
 */
import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * @param app Express instance to declare the RESTful Web service
 * @constructor Creates singleton controller instance
 */
const AuthenticationController = (app: Express) => {
    
    const userDao: UserDao = UserDao.getInstance();

    /**
     * User login to the account with session
     * @param req Represents request from client
     * @param res Represents response to client
     */
    const login = async (req: Request, res: Response) => {

        console.log("==> login")
        console.log("==> req.session")
        console.log(req.session)

        const user = req.body;
        const username = user.username;
        const password = user.password;
        console.log(password)
        const existingUser = await userDao
            .findUserByUsername(username);
        const match = await bcrypt.compare(password, existingUser.password);

        if (match) {
            existingUser.password = '*****';
            // @ts-ignore
            req.session['profile'] = existingUser;
            res.json(existingUser);
        } else {
            res.sendStatus(403);
        }
    }

    /**
     * User register to the account with session
     * @param req Represents request from client
     * @param res Represents response to client
     */
    const register = async (req: Request, res: Response) => {
        console.log("==> register")
        console.log("==> req.session")
        console.log(req.session)

        const newUser = req.body;
        const password = newUser.password;
        const hash = await bcrypt.hash(password, saltRounds);
        newUser.password = hash;

        const existingUser = await userDao
            .findUserByUsername(req.body.username);
        if (existingUser) {
            res.sendStatus(403);
            return;
        } else {
            const insertedUser = await userDao
                .createUser(newUser);
            insertedUser.password = '';
            // @ts-ignore
            req.session['profile'] = insertedUser;
            res.json(insertedUser);
        }
    }

    /**
     * User get profile property
     * @param req Represents request from client
     * @param res Represents response to client
     */
    const profile = (req: Request, res: Response) => {
        // @ts-ignore
        const profile = req.session['profile'];
        if (profile) {
            res.json(profile);
        } else {
            res.sendStatus(403);
        }
    }

    /**
     * User logout to the account and destroy session
     * @param req Represents request from client
     * @param res Represents response to client
     */
    const logout = (req: Request, res: Response) => {
        // @ts-ignore
        req.session.destroy();
        res.sendStatus(200);
    }

    app.post("/api/auth/login", login);
    app.post("/api/auth/register", register);
    app.post("/api/auth/profile", profile);
    app.post("/api/auth/logout", logout);
}

export default AuthenticationController;
