import { CategoryModel } from "./models/category.model.js";
import MongoDao from "./mongo.dao.js";

export default class ProductDaoMongoDB extends MongoDao {
    constructor() {
        super(CategoryModel);
    }

}