import mongoose from "mongoose";
import User
const TuitSchema = new mongoose.Schema({
    tuit: {type: String, required: true};
    postedOn: {type: Date, default: new Date()};
    postedBy: {type: User, default: null};
})