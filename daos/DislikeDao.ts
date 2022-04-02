/**
 * @file Implements DAO managing data storage of dislikes. Uses mongoose DislikeModel
 * to integrate with MongoDB
 */
import DislikeDaoI from "../interfaces/likes/DislikeDaoI";
import DislikeModel from "../mongoose/likes/DislikeModel";
import Dislike from "../models/likes/Dislike";

/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of dislikes
 * @property {DislikeDao} DislikeDao Private single instance of DislikeDao
 */
export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns DislikeDao
     */
    public static getInstance = (): DislikeDao => {
        if (DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }

    private constructor() {
    }

    /**
     * Uses LikeModel to retrieve all tuit documents from dislikes collection by user id
     * @param {string} uid User's primary key
     * @returns Promise To be notified when tuits are retrieved from the database
     */
    findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({dislikedBy: uid})
            .populate({
                // replace tuit reference with actual tuit document
                path: "tuit",
                populate: {
                    // replace tuit's postedBy reference with actual user document
                    path: "postedBy"
                }
            })
            .exec();

    /**
     * Uses DislikeModel to retrieve all user documents from dislikes collection by tuit id
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when dislikes are retrieved from the database
     */
    findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({tuit: tid})
            .populate("dislikedBy")
            .exec()

    /**
     * Inserts dislikes instance into the database by user
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when dislikes found from the database
     */
    userDislikesTuit = async (uid: string, tid: string): Promise<Dislike> =>
        DislikeModel.create({tuit: tid, dislikedBy: uid});

    /**
     * Removes dislikes from the database.
     * @param {string} tid Primary key of tuit to be removed
     * @param {string} uid Primary key of user to be removed
     * @returns Promise To be notified when like is removed from the database
     */
    userUndislikedTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});

    /**
     * Retrieves dislikes instance from the database by user and tuit
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when dislikes is inserted into the database
     */
    findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.findOne({tuit: tid, dislikedBy: uid})

    /**
     * Count how many dislikes of tuit
     * @param {string} tid Tuit's primary key
     */
    countHowManyDislikedTuit = async (tid: string) =>
        DislikeModel.count({tuit: tid})
}
