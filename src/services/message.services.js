import ProductManager from "../DAO/filesystem/message.dao.js";
//import ProductManager from "../DAO/mongodb/message.dao.js";
const prodDao = new ProductManager();

export const getAll = async () => {
  try {
    const response = await prodDao.getAll();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const create = async (obj) => {
  try {
    const newProd = await prodDao.create(obj);
    if (!newProd) return false;
    else return newProd;
  } catch (error) {
    console.log(error);
  }
};
