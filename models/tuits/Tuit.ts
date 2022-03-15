import User from "../users/User";

export default interface Tuit {
    id: string,
    tuit: string,
    postedBy: User,
    postedOn?: Date,
};
