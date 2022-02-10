import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDao";

export default class TuitDao implements TuitDaoI {
    async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find();
    }
    findTuitsByUser(uid: string): Promise<Tuit[]> {
        
    }
    findTuitById(tid: string): Promise<Tuit | > {
        return await TuitModel.findById(_id:tid);
    }
    createTuit(tuit: Tuit): Promise<Tuit> {

    }
    updateTuit(tid: string, tuit: Tuit): Promise<any>;
    deleteTuit(tid: string): Promise<any>;
}