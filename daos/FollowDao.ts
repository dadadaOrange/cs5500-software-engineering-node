import FollowDaoI from "../interfaces/follows/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follows";

export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao == null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {}

    findAllFollowedByUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowed: uid})
            .populate("userFollowing")
            .exec();

    findAllFollowingByUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowing: uid})
            .populate("userFollowed")
            .exec();

    userFollowsUser = async (uid1: string, uid2: string): Promise<Follow> =>
        FollowModel
            .create({userFollowing: uid1, userFollowed: uid2});

    userUnfollowUser = async (uid1: string, uid2: string): Promise<any> =>
        FollowModel
            .deleteOne({userFollowing: uid1, userFollowed: uid2});
}

