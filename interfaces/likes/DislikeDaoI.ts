import Dislike from "../../models/likes/Dislike";

/**
 * @file Declares API for Dislikes related data access object methods
 */
export default interface DislikeDaoI {
    findAllUsersThatDislikedTuit (tid: string): Promise<Dislike[]>;
    findAllTuitsDislikedByUser (uid: string): Promise<Dislike[]>;
    userUndislikedTuit (tid: string, uid: string): Promise<any>;
    userDislikesTuit (tid: string, uid: string): Promise<Dislike>;
}
