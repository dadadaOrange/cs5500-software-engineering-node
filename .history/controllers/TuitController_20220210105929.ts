import { Request, Response, Express } from "express";
import TuitDao from "../dao/TuitDao";
import TuitControllerI from "../interfaces/TuitController";

export default class TuitController implements TuitControllerI {
    app: Express; // fields
    tuitDao: TuitDao;
    
    //build constructor
    constructor(app: Express, tuitDao: TuitDao) {
        this.app = app;
        this.tuitDao = tuitDao;
        this.app.get('/tuits', this.findAllTuits);
        this.app.get('/tuits/:tid'), this.findTuitById);
        this.app.get('/users/:uid/tuits', this.findTuitsByUser)

    }
}