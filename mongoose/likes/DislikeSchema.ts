/**
 * @file Implements mongoose schema for dislikes
 */
import mongoose, {Schema} from "mongoose";
import Dislike from "../../models/likes/Dislike";

/**
 * @typedef Dislike Represents the like relations between users and tuits
 * @property {ObjectId} tuit the tuit id which is liked by user
 * @property {ObjectId} dislikedBy the id of user who liked the tuit
 */
const DislikeSchema = new mongoose.Schema<Dislike>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    dislikedBy:{type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection:"dislikes"});
export default DislikeSchema;
