import ProductManager from "../DAO/filesystem/cart.dao.js";
//import ProductManager from "../DAO/mongodb/cart.dao.js";
const prodDao = new ProductManager();

export const getAll = async () => {
  try {
    const response = await prodDao.getAll();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getById = async (id) => {
  try {
    const item = await prodDao.getById(id);
    if (!item) return false;
    else return item;
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

export const update = async (cid, pic) => {
  try {
    const item = await prodDao.update(cid, pic);
    return item;
  } catch (error) {
    console.log(error);
  }
};
