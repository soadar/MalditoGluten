import mongoose from "mongoose";
import { CartModel } from "./models/cart.model.js";
const ObjectId = mongoose.Types.ObjectId;

export default class CartDaoMongoDB extends MongoDao {
    constructor() {
        super(CartModel);
    }

    async update(cid, pid) {
        try {
            const product = await ProductModel.findById(pid);
            if (product) {
                let idSearch = new ObjectId(pid)
                const cart = await CartModel.findById(cid);
                if (cart) {
                    const found = cart.products.find(element => element["_id"].equals(idSearch));
                    if (found) {
                        found.quantity += 1;
                        const response = await CartModel.findByIdAndUpdate(cid, { products: found }, { new: true })
                        return response
                    } else {
                        cart.products.push({ _id: pid, quantity: 1 });
                        const response = await CartModel.findByIdAndUpdate(cid, cart, { new: true });
                        return response
                    }
                } else {
                    return "El chango no existe"
                }
            } else {
                return "El producto no existe"
            };
            //return response;
        } catch (error) {
            console.log(error);
        }
    }
}