import { createHash, isValidPassword } from '../../utils.js';
import { UserModel } from "./models/user.model.js";
import MongoDao from "./mongo.dao.js";

export default class UserDaoMongo extends MongoDao {
    constructor() {
        super(UserModel);
    }

    async loginUser(obj) {
        try {
            const { userr, password } = obj;
            const userExist = await this.getByUser(userr);
            if (userExist) {
                const validPass = isValidPassword(password, userExist);
                return validPass ? userExist : false;
            }
            else return false;
        } catch (error) {
            //log.fatal(error.message);
            console.log(error)
        }
    };

    async registerUser(user) {
        try {
            const { email, password } = user;
            const userExist = await this.getByEmail(email);
            if (!userExist) {
                return await this.model.create({
                    ...user,
                    password: createHash(password),
                    cart: await cartDao.create(),
                    role: 'user'
                });
            } else return false;
        } catch (error) {
            //log.fatal(error.message);
            console.log(error)
        }
    };

    async getById(id) {
        try {
            const userExist = await this.model.findById(id) //propiedad - atributo
            return userExist ? userExist : false;
        } catch (error) {
            //log.fatal(error.message);
            console.log(error)
        }
    };

    async getByEmail(email) {
        try {
            const userExist = await this.model.findOne({ email });
            return userExist ? userExist : false;
        } catch (error) {
            //log.fatal(error.message);
            console.log(error)
        }
    };

    async getByUser(user) {
        try {
            const userExist = await this.model.findOne({ user });
            return userExist ? userExist : false;
        } catch (error) {
            //log.fatal(error.message);
            console.log(error)
        }
    };

    async getByCart(cart) {
        try {
            const userExist = await this.model.findOne({ cart });
            return userExist ? userExist : false;
        } catch (error) {
            //log.fatal(error.message);

        }
    };

    async recoverPass(email, password) {
        try {
            const userExist = await this.getByEmail(email);
            if (!userExist) return 3;
            const validPass = isValidPassword(password, userExist);
            if (validPass) return 2;
            return await this.model.findByIdAndUpdate(userExist._id, { password: createHash(password) })
        } catch (error) {
            //log.fatal(error.message);
            console.log(error)
        }
    };

    async deleteInactives() {
        try {
            const tiempoInactividad = new Date(new Date().setDate(new Date().getDate() - 2));
            //const tiempoInactividad = new Date(new Date().setMinutes(new Date().getMinutes() - 10));
            const userExist = await this.model.deleteMany({ last_connection: { $lt: tiempoInactividad } });

            return userExist ? userExist : false;
        } catch (error) {
            //log.fatal(error.message);
            console.log(error)
        }
    };

}