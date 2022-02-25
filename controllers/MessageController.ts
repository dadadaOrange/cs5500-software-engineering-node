/**
 * @file Controller RESTful Web service API for messages resource
 */
import {Express, Request, Response} from "express";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/messages/MessageControllerI";

/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid1/messages/:uid2 to record that user1 messages user2
 *     </li>
 *     <li>DELETE /api/messages/:mid to record that user delete a message</li>
 *     <li>GET /api/users/:uid/received to retrieve all the messages that user received
 *     </li>
 *     <li>GET /api/users/:uid/sent to retrieve all the messages that user sent
 *     </li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing messages CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return MessageController
     */
    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.post("/api/users/:uid1/messages/:uid2", MessageController.messageController.userMessagesUser);
            app.delete("/api/messages/:mid", MessageController.messageController.userDeleteMessage);
            app.get("/api/users/:uid/received", MessageController.messageController.findAllMessagesReceivedByUser);
            app.get("/api/users/:uid/sent", MessageController.messageController.findAllMessagesSentByUser);
        }
        return MessageController.messageController;
    }

    private constructor() {}

    /**
     * Retrieves all messages user received from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user who received the message
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the messages objects
     */
    findAllMessagesReceivedByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesReceivedByUser(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * Retrieves all messages sent by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user who sent the message
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the messages objects
     */
    findAllMessagesSentByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesSentByUser(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters mid representing the id of the message that needs to be deleted
     * @param {Response} res Represents response to client, including status
     * on whether deleting the message was successful or not
     */
    userDeleteMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeleteMessage(req.params.mid)
            .then((status) => res.send(status));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid1 and uid2 representing the user1 is messaging user2 and message body
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new messages that was inserted in the
     * database
     */
    userMessagesUser = (req: Request, res: Response) =>
        MessageController.messageDao.userMessagesUser(req.params.uid1, req.params.uid2, req.body)
            .then(messages => res.json(messages));

}
