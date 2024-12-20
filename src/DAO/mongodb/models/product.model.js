import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    status: { type: Boolean, required: true },
    // category: { type: String, required: true },
    category: [{
        type: String
    }],
    thumbnails: { type: String, required: false },
});

export const ProductModel = mongoose.model('products', ProductSchema);
