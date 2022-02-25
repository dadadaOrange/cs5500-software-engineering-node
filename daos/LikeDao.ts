/**
 * @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */
import LikeDaoI from "../interfaces/likes/LikeDaoI";
import LikeModel from "../mongoose/likes/LikeModel";
import Like from "../models/likes/Like";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns LikeDao
     */
    public static getInstance = (): LikeDao => {
        if (LikeDao.likeDao == null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }

    private constructor() {}

    /**
     * Uses LikeModel to retrieve all user documents from likes collection by tuit id
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when likes are retrieved from the database
     */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();

    /**
     * Uses LikeModel to retrieve all tuit documents from likes collection by user id
     * @param {string} uid User's primary key
     * @returns Promise To be notified when tuits are retrieved from the database
     */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: uid})
            .populate("tuit")
            .exec();

    /**
     * Inserts likes instance into the database by user
     * @param {string} uid User's primary key
     * @param {string} tuid Tuit's primary key
     * @returns Promise To be notified when likes is inserted into the database
     */
    userLikesTuit = async (uid: string, tid: string): Promise<Like> =>
        LikeModel.create({tuit: tid, likedBy: uid});

    /**
     * Removes likes from the database.
     * @param {string} tid Primary key of tuit to be removed
     * @param {string} uid Primary key of user to be removed
     * @returns Promise To be notified when like is removed from the database
     */
    userUnlikesTuit = async (tid: string, uid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});
}
