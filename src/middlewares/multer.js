import multer from 'multer';
import { __dirname } from '../utils.js';
//import ProductManager from "../DAO/mongodb/product.dao.js";
import CategoryManager from "../DAO/mongodb/category.dao.js";
//const productManager = new ProductManager();
const categoryManager = new CategoryManager();
//const item = await categoryManager.getById(idd)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = '/public/assets/'
        //console.log("file33", file);
        switch (file.fieldname) {
            case 'imageCat':
                folder += 'categories'
                break;
            case 'imageProd':
                folder += 'products'
                break;
        }

        cb(null, __dirname + folder)
    },
    filename: async function (req, file, cb) {
        const { idd } = req.body;
        if (idd) {
            const item = await categoryManager.getById(idd)
            let name = (item.thumbnails.split("/")[item.thumbnails.split("/").length - 1])
            name = name.replace(" ", "-")
            //console.log(name);
            //cb(null, `${req.body.title}.22${file.originalname.slice(-3)}`)
            cb(null, `${name}`)
        } else {
            let name = `${req.body.title}.${file.originalname.slice(-3)}`
            name = name.replace(" ", "-")

            cb(null, name)
        }
    }
})

export const uploader = multer({ storage: storage })