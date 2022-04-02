import User from "../users/User";
import Stats from "./Stats";

export default interface Tuit {
    _id: string,
    tuit: string,
    postedBy: User,
    postedOn?: Date,
    image?: String,
    youtube?: String,
    avatarLogo?: String,
    imageOverlay?: String,
    stats: Stats
};
