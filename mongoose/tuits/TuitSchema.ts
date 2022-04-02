/**
 * @file Implements mongoose schema for tuits
 */
import mongoose, {Schema} from "mongoose";
import Tuit from "../../models/tuits/Tuit";

/**
 * @typedef Tuit Represents tuits in Tuiter
 * @property {string} tuit The tuit content
 * @property {ObjectId} postedBy the id of user who posted the tuit
 * @property {Date} postedOn date the tuit is posted
 * @property {String} image image of the tuit
 * @property {String} youtube youtube link of the tuit
 * @property {String} avatarLogo avatarLogo link of the tuit
 * @property {String} imageOverlay imageOverlay link of the tuit
 * @property {Stats} stats status of the tuit
 */
const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String, required: true},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    postedOn: {type: Date, default: Date.now},
    image: String,
    youtube: String,
    avatarLogo: String,
    imageOverlay: String,
    stats: {
        replies: {type: Number, default: 0},
        retuits: {type: Number, default: 0},
        likes: {type: Number, default: 0},
        dislikes: {type: Number, default: 0},
        dislikeStatus: {type: Boolean, default: false},
        likeStatus: {type: Boolean, default: false}
    }
}, {collection: "tuits"});
export default TuitSchema;
