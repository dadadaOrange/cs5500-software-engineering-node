/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/follows/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follows";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao == null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {}

    /**
     * Uses FollowModel to retrieve all follows documents that user is following from follows collection by user id
     * @param {string} uid User's primary key
     * @returns Promise To be notified when follows are retrieved from the database
     */
    findAllFollowedByUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowed: uid})
            .populate("userFollowing")
            .exec();

    /**
     * Uses FollowModel to retrieve all follows documents that user is followed by other users from follows collection by user id
     * @param {string} uid User's primary key
     * @returns Promise To be notified when follows are retrieved from the database
     */
    findAllFollowingByUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowing: uid})
            .populate("userFollowed")
            .exec();

    /**
     * Inserts follows instance into the database by users
     * @param {string} uid1 User1's primary key
     * @param {string} uid2 User2's primary key
     * @returns Promise To be notified when follows is inserted into the database
     */
    userFollowsUser = async (uid1: string, uid2: string): Promise<Follow> =>
        FollowModel
            .create({userFollowing: uid1, userFollowed: uid2});

    /**
     * Removes follows from the database.
     * @param {string} uid1 User1's primary key
     * @param {string} uid2 User2's primary key
     * @returns Promise To be notified when follow is removed from the database
     */
    userUnfollowUser = async (uid1: string, uid2: string): Promise<any> =>
        FollowModel
            .deleteOne({userFollowing: uid1, userFollowed: uid2});
}

