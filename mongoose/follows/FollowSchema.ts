import mongoose, {Schema} from "mongoose";
import Follow from "../../models/follows/Follows";
const FollowSchema = new mongoose.Schema<Follow>({
    userFollowing: {type: Schema.Types.ObjectId, ref:"UserModel"},
    userFollowed: {type: Schema.Types.ObjectId, ref:"UserModel"}
},{collection:"follows"});
export default FollowSchema;
