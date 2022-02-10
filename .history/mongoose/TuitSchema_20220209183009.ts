import mongoose from "mongoose";
const TuitSchema = new mongoose.Schema({
    tuit: {type: String,;
    private postedOn: Date = new Date();
    private postedBy: User | null = null;
})