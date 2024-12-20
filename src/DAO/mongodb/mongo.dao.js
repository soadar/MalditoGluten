export default class MongoDao {
    constructor(model) {
        this.model = model;
    }

    async getAll() {
        try {
            const response = await this.model.find({});
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const response = await this.model.findById(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getByName(name) {
        try {
            let response;
            if (name) {
                response = await this.model.find({ title: { $regex: name } });
            } else {
                response = await this.model.find({});
            }
            return response;
        } catch (error) {
            console.log(error);
            //console.log(error.message);
        }
    }

    async create(obj) {
        try {
            const response = await this.model.create(obj);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, obj) {
        try {
            const updateProd = await this.model.findByIdAndUpdate(id, obj);
            return updateProd;
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            const response = await this.model.findByIdAndDelete(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}
