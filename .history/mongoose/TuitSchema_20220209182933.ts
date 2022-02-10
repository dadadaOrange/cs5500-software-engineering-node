import mongoose from "mongoose";
const TuitSchema = new mongoose.Schema({
    private tuit: string = '';
    private postedOn: Date = new Date();
    private postedBy: User | null = null;
})