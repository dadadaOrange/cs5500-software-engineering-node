import LikeDaoI from "../interfaces/likes/LikeDaoI";
import LikeModel from "../mongoose/likes/LikeModel";
import Like from "../models/likes/Like";
import likeModel from "../mongoose/likes/LikeModel";

export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;
    public static getInstance = (): LikeDao => {
        if (LikeDao.likeDao == null) {
            LikeDao.likeDao = new LikeDao()
        }
        return LikeDao.likeDao;
    }

    private constructor() {}
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();

    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        likeModel
            .find({likedBy: uid})
            .populate("tuit")
            .exec();

    userLikesTuit = async (uid: string, tid: string): Promise<Like> =>
        likeModel.create({tuit: tid, likedBy: uid});

    userUnlikesTuit = async (tid: string, uid: string): Promise<any> =>
        likeModel.deleteOne({tuit: tid, likedBy: uid});
}
