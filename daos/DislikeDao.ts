import DislikeDaoI from "../interfaces/likes/DislikeDaoI";
import DislikeModel from "../mongoose/likes/DislikeModel";
import Dislike from "../models/likes/Dislike";

export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null;
    public static getInstance = (): DislikeDao => {
        if (DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }

    private constructor() {
    }

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

    findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({tuit: tid})
            .populate("dislikedBy")
            .exec()

    userDislikesTuit = async (uid: string, tid: string): Promise<Dislike> =>
        DislikeModel.create({tuit: tid, dislikedBy: uid});

    userUndislikedTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});

    findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.findOne({tuit: tid, dislikedBy: uid})

    countHowManyDislikedTuit = async (tid: string) =>
        DislikeModel.count({tuit: tid})
}
