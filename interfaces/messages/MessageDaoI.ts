import Message from "../../models/messages/Message";

export default interface MessageDaoI {
    userMessagesUser(uid1: string, uid2: string, msg: Message): Promise<Message>;
    findAllMessagesSentByUser(uid: string): Promise<Message[]>;
    findAllMessagesReceivedByUser(uid: string): Promise<Message[]>;
    userDeleteMessage(mid: string): Promise<any>;
}
