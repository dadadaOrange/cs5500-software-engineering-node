import { Request, Response, Express } from "express";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitController";

export default class TuitController implements TuitControllerI {
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static tuitController: TuitController | null = null;
    public static getInstance = (app: Express): TuitController => {
        if (TuitController.tuitController === null) {
            TuitController.tuitController = new TuitController();
            app.get('/tuits', TuitController.tuitController.findAllTuits);
            app.get('/tuits/:tid', TuitController.tuitController.findTuitById);
            app.get('/tuits/:uid/tuits', TuitController.tuitController.findTuitsByUser);
            app.post('/tuits', TuitController.tuitController.createTuit);
            app.delete('/tuits/:tid', TuitController.tuitController.deleteTuit);
            app.put('/tuits/:tid', TuitController.tuitController.updateTuit);
        }
        return TuitController.tuitController;
    }
    private constructor() { }

    findAllTuits = (req: Request, res: Response) =>
        TuitController.tuitDao.findAllTuits()
            .then((tuits: any) => res.json(tuits));
    
    findTuitById = (req: Request, res: Response) =>
        this.tuitDao.findTuitById(req.params.tid)
            .then((tuit: any) => res.json(tuit));

    findTuitsByUser = (req: Request, res: Response) =>
        this.tuitDao.findTuitsByUser(req.params.uid)
            .then((tuits: any) => res.json(tuits));

    createTuit = (req: Request, res: Response) =>
        this.tuitDao.createTuit(req.body)
            .then((tuit: any) => res.json(tuit));
    
    deleteTuit = (req: Request, res: Response) =>
        this.tuitDao.deleteTuit(req.params.tid)
            .then((status: any) => res.json(status));
    
    updateTuit = (req: Request, res: Response) =>
        this.tuitDao.updateTuit(req.params.tid, req.body)
            .then((status: any) => res.json(status));
    
}