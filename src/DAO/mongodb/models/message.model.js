import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    name: { type: String, required: false },
    contact: { type: String, required: false },
    status: { type: Boolean, required: true },
    message: { type: String, required: true },
}, { timestamps: true });

export const MessageModel = mongoose.model('messages', messageSchema);
