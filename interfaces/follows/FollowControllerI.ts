import {Request, Response} from "express";
import Follow from "../../models/follows/Follows";

export default interface FollowControllerI {
    userFollowsUser (req: Request, res: Response): void;
    userUnfollowUser (req: Request, res: Response): void;
    findAllFollowingByUser (req: Request, res: Response): void;
    findAllFollowedByUser (req: Request, res: Response): void;
};
