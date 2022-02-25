/**
 * @file Implements mongoose schema for messages
 */
import mongoose, {Schema} from "mongoose";
import Message from "../../models/messages/Message";

/**
 * @typedef Message Represents the messages that user sent or received in Tuiter
 * @property {string} message The message content
 * @property {ObjectId} to the id of user who received the message
 * @property {ObjectId} from the id of user who sent the message
 * @property {Date} sentOn date the message is sent
 */
const MessageSchema = new mongoose.Schema<Message>({
    message: String,
    to: {type: Schema.Types.ObjectId, ref:"UserModel"},
    from: {type: Schema.Types.ObjectId, ref:"UserModel"},
    sentOn: {type: Date, default: Date.now}
},{collection: "messages"});
export default MessageSchema;
