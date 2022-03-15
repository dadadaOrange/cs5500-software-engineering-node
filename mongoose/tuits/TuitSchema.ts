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
 */
const TuitSchema = new mongoose.Schema<Tuit>({
    id:{type:String, required: true},
    tuit: {type: String, required: true},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    postedOn: {type: Date, default: Date.now}
}, {collection: "tuits"});
export default TuitSchema;
