import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    user: { type: String, required: true },
    password: { type: String, required: true, unique: true },
    role: { type: String, default: 'user' },
});

export const UserModel = model('users', UserSchema);