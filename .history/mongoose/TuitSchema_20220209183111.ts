import mongoose from "mongoose";
const TuitSchema = new mongoose.Schema({
    tuit: {type: String, required: true};
    postedOn: {type: Date, default: new Date()};
    postedBy: {typeUser | null = null;
})