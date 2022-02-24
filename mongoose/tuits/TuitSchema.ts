import mongoose from "mongoose";
const TuitSchema = new mongoose.Schema({
    tuit: {type: String, required: true},
    postedOn: {type: Date, default: Date.now},
    postedBy: {type: String, default: null}
},{collection: 'tuits'}); // collection name in mongoDB

export default TuitSchema;