import Message from "../models/messages/Message";
import MessageDaoI from "../interfaces/messages/MessageDaoI";
import MessageModel from "../mongoose/messages/MessageModel";

export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao == null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {}

    findAllMessagesReceivedByUser = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({to: uid})
            .populate("message")
            .exec();

    findAllMessagesSentByUser = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({from: uid})
            .populate("message")
            .exec();

    userDeleteMessage = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({_id: mid});

    userMessagesUser = async (uid1: string, uid2: string, msg: Message): Promise<Message> =>
        MessageModel.create({...msg, from: uid1, to:uid2})
}
