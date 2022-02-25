/**
 * @file Implements mongoose schema for bookmarks
 */
import mongoose, {Schema} from "mongoose";
import Bookmark from "../../models/bookmarks/Bookmark";

/**
 * @typedef Bookmark Represents the bookmark relations between users and tuits
 * @property {ObjectId} bookmarkedTuit the id of tuit that is bookmarked by the user
 * @property {ObjectId} bookmarkedBy the id of user who bookmarked the tuit
 */
const BookmarkSchema = new mongoose.Schema<Bookmark>({
    bookmarkedTuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    bookmarkedBy: {type: Schema.Types.ObjectId, ref: "UserModel"}
},{collection:"bookmarks"});
export default BookmarkSchema;
