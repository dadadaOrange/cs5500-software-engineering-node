/**
 * @file Implements mongoose schema for follows
 */
import mongoose, {Schema} from "mongoose";
import Follow from "../../models/follows/Follows";

/**
 * @typedef Follow Represents the follow relations between two users
 * @property {ObjectId} userFollowing the id of user who is following the other user
 * @property {ObjectId} userFollowed the id of user who is followed by the other user
 */
const FollowSchema = new mongoose.Schema<Follow>({
    userFollowing: {type: Schema.Types.ObjectId, ref:"UserModel"},
    userFollowed: {type: Schema.Types.ObjectId, ref:"UserModel"}
},{collection:"follows"});
export default FollowSchema;
