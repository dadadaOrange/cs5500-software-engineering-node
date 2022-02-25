/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import Message from "../models/messages/Message";
import MessageDaoI from "../interfaces/messages/MessageDaoI";
import MessageModel from "../mongoose/messages/MessageModel";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Follows
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao == null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {}

    /**
     * Uses MessageModel to retrieve all message documents that user received from messages collection by user id
     * @param {string} uid User's primary key
     * @returns Promise To be notified when message are retrieved from the database
     */
    findAllMessagesReceivedByUser = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({to: uid})
            .populate("message")
            .exec();

    /**
     * Uses MessageModel to retrieve all message documents that user sent from messages collection by user id
     * @param {string} uid User's primary key
     * @returns Promise To be notified when message are retrieved from the database
     */
    findAllMessagesSentByUser = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({from: uid})
            .populate("message")
            .exec();

    /**
     * Removes message from the database.
     * @param {string} mid Primary key of message to be removed
     * @returns Promise To be notified when message is removed from the database
     */
    userDeleteMessage = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({_id: mid});

    /**
     * Inserts message instance into the database by users
     * @param {string} uid1 User1's primary key
     * @param {string} uid2 User2's primary key
     * @param {Message} msg Message instance
     * @returns Promise To be notified when message is inserted into the database
     */
    userMessagesUser = async (uid1: string, uid2: string, msg: Message): Promise<Message> =>
        MessageModel.create({...msg, from: uid1, to:uid2})
}
