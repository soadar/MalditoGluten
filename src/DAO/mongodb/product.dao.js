import { ProductModel } from "./models/product.model.js";
import MongoDao from "./mongo.dao.js";

export default class ProductDaoMongoDB extends MongoDao {
    constructor() {
        super(ProductModel);
    }

}