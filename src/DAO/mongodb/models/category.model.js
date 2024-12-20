import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    thumbnails: { type: String, required: true },
});

export const CategoryModel = mongoose.model('categories', categorySchema);
