import mongoose from "mongoose";
const TuitSchema = new mongoose.Schema({
    tuit: {type: String, required: true};
    postedOnDate = new Date();
    private postedBy: User | null = null;
})