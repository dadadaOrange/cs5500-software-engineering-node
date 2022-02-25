import {Express, Request, Response} from "express";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/messages/MessageControllerI";

export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

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

    findAllMessagesReceivedByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesReceivedByUser(req.params.uid)
            .then(messages => res.json(messages));

    findAllMessagesSentByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesSentByUser(req.params.uid)
            .then(messages => res.json(messages));

    userDeleteMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeleteMessage(req.params.mid)
            .then((status) => res.send(status));

    userMessagesUser = (req: Request, res: Response) =>
        MessageController.messageDao.userMessagesUser(req.params.uid1, req.params.uid2, req.body)
            .then(messages => res.json(messages));


}
