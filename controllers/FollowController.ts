/**
 * @file Controller RESTful Web service API for follows resource
 */
import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/follows/FollowControllerI";

/**
 * @class FollowController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid1/follows/:uid2 to record that user1 follows user2
 *     </li>
 *     <li>DELETE /api/users/:uid1/follows/:uid2 to record that user1
 *     no longer follows user2</li>
 *     <li>GET /api/users/:uid/following to retrieve all the follow relations that user are following
 *     </li>
 *     <li>GET /api/users/:uid/followed to retrieve all the follow relations that are followed by a user
 *     </li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations
 * @property {FollowController} followController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */
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

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid1 and uid2 representing the user1 is following user2
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follows that was inserted in the
     * database
     */
    userFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsUser(req.params.uid1, req.params.uid2)
            .then(follows => res.json(follows));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid1 and uid2 representing the user1 that is unfollowing the user2
     * @param {Response} res Represents response to client, including status
     * on whether deleting the follow was successful or not
     */
    userUnfollowUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowUser(req.params.uid1, req.params.uid2)
            .then(status => res.send(status));

    /**
     * Retrieves all follows relations by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user is following
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the follows objects
     */
    findAllFollowingByUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowingByUser(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Retrieves all follows relations by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user is followed by other users
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the follows objects
     */
    findAllFollowedByUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowedByUser(req.params.uid)
            .then(follows => res.json(follows));
};
