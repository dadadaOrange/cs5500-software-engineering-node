import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/follows/FollowControllerI";

export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;
    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post("/api/users/:uid1/follows/:uid2", FollowController.followController.userFollowsUser);
            app.delete("/api/users/:uid1/follows/:uid2", FollowController.followController.userUnfollowUser);
            app.get("/api/users/:uid/following", FollowController.followController.findAllFollowingByUser);
            app.get("/api/users/:uid/followed", FollowController.followController.findAllFollowedByUser);
        }
        return FollowController.followController;
    }

    private constructor() {}

    userFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsUser(req.params.uid1, req.params.uid2)
            .then(follows => res.json(follows));
    userUnfollowUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowUser(req.params.uid1, req.params.uid2)
            .then(status => res.send(status));
    findAllFollowingByUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowingByUser(req.params.uid)
            .then(follows => res.json(follows));
    findAllFollowedByUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowedByUser(req.params.uid)
            .then(follows => res.json(follows));
};
