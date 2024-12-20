import { MessageModel } from "./models/message.model.js";
import MongoDao from "./mongo.dao.js";

export default class CartDaoMongoDB extends MongoDao {
    constructor() {
        super(MessageModel);
    }

    async getAll() {
        try {
            const response = await this.model.find({});

            const formattedMessages = response.map((message) => ({
                ...message,
            }));
            formattedMessages.forEach((message) => {
                const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric' };
                message._doc.createdAt = message._doc.createdAt.toLocaleDateString('es-ES', options);
            })
            return formattedMessages;

            //timestamp: message.createdAt.toLocaleDateString('es-ES', options)

        } catch (error) {
            console.log(error);
        }
    }

    async getAllTrue() {
        try {
            const response = await this.model.find({ status: true });

            const formattedMessages = response.map((message) => ({
                ...message,
            }));
            formattedMessages.forEach((message) => {
                const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric' };
                message._doc.createdAt = message._doc.createdAt.toLocaleDateString('es-ES', options);
            })
            return formattedMessages;

            //timestamp: message.createdAt.toLocaleDateString('es-ES', options)

        } catch (error) {
            console.log(error);
        }
    }
}