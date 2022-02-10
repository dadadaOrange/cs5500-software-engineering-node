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
        this.app.get('/users/:uid/tuits', this.findTuitsByUser);
        this.app.post('/tuits', this.createTuit);
        this.app.delete('/tuits/:tid', this.deleteTuit);
    }
    findAllTuits = (req: Request, res: Response) =>
        this.tuitDao.findAllTuits()
            .then(tuits => res.json(tuits));
    
    findTuitById = (req: Request, res: Response) =>
        this.tuitDao.findTuitById(req.params.tid)
}