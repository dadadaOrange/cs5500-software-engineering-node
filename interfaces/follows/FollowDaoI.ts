import Follow from "../../models/follows/Follows";

export default interface FollowDaoI {
    userFollowsUser(uid1: string, uid2: string): Promise<Follow>;
    userUnfollowUser(uid1: string, uid2: string): Promise<any>;
    findAllFollowingByUser(uid:string): Promise<Follow[]>;
    findAllFollowedByUser(uid:string): Promise<Follow[]>;
}
