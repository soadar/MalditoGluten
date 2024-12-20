import { Router } from "express";
import CategoryManager from "../DAO/mongodb/category.dao.js";
import ProductManager from "../DAO/mongodb/product.dao.js";
import UserManager from "../DAO/mongodb/user.dao.js";
import { uploader } from '../middlewares/multer.js';

import passport from "passport";
import MessageManager from "../DAO/mongodb/message.dao.js";
import { isAdmin } from "../middlewares/errorHandler.js";
const messageDao = new MessageManager();

const router = Router();
const productManager = new ProductManager();
const categoryManager = new CategoryManager();
const userManager = new UserManager();

router.get("/", async (req, res) => {
  const { category } = req.query;
  const role = req.user?.role === "admin" ? true : false
  const products = await productManager.getAll();
  const categories = await categoryManager.getAll();
  if (category) {
    const productsSearch = products.filter(
      (producto) => {
        const categoriesArray = Array.isArray(producto.category)
          ? producto.category
          : [producto.category];
        return categoriesArray.some(cat => cat === category);
      }
    );
    res.render("products", { productsSearch, role });
  } else {
    res.render("categories", { categories, role });
  }
});

router.get('/login', (req, res) => {
  const { error } = req.query;
  if (error === 'fail') res.render('login', { msg: 'Usuario o contraseña incorrecta.', alert: 'danger' });
  else res.render('login')
})

router.post("/login",
  passport.authenticate('login', {
    failureRedirect: "/login?error=fail",
    successRedirect: "/"
  }))

router.get('/logout', async (req, res) => {
  if (req.user) {
    req.session.destroy();
  }
  return res.render('login', { msg: 'Se cerro la sesion correctamente.', alert: 'success' })
})

const cpUpload = uploader.fields([{ name: 'imageCat' }, { name: 'imageProd' }]);

router.post('/uploadCat', isAdmin, cpUpload, async (req, res, next) => {
  try {
    const { title, category, status } = req.body;
    if (req.files['imageCat']) {
      const imageCat = req.files['imageCat'][0]
      const newCat = {
        title,
        category,
        thumbnails: `./assets/categories/${imageCat.filename}`
      }
      await categoryManager.create(newCat);
    }
    if (req.files['imageProd']) {
      const imageCat = req.files['imageProd'][0]
      const flag = status === 'on' ? true : false
      const newProd = {
        title,
        category,
        status: flag,
        thumbnails: `./assets/products/${imageCat.filename}`
      }
      await productManager.create(newProd);
    }
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "fail" });
  }
});

router.post("/delCat", isAdmin, async (req, res) => {
  const { catId } = req.body;
  await categoryManager.delete(catId);
  res.redirect("/");
});

router.post("/editCat", isAdmin, async (req, res) => {
  const { catId } = req.body;
  const data = await categoryManager.getById(catId)
  res.render("edit", { data, type: "cat" });
});

router.post("/delProd", isAdmin, async (req, res) => {
  const { prodId } = req.body;
  await productManager.delete(prodId);
  res.redirect("/");
});

router.post("/editProd", isAdmin, async (req, res) => {
  const { prodId } = req.body;
  const categories = await categoryManager.getAll();
  const data = await productManager.getById(prodId)
  res.render("edit", { data, type: "prod", categories });
});

router.post("/editf", isAdmin, cpUpload, async (req, res, next) => {
  const { idd, title, status, category, type } = req.body;
  if (type === 'prod') {
    const newProd = {}
    if (title) newProd.title = title
    if (category) newProd.category = category
    newProd.status = status === 'on' ? true : false
    await productManager.update(idd, newProd)
  }
  if (type === 'cat') {
    const newCat = {}
    if (title) newCat.title = title
    if (category) newCat.category = category
    await categoryManager.update(idd, newCat)
  }
  res.redirect("/");
});

router.post('/mainSearch', async (req, res) => {
  const { title } = req.body;
  const searchRegex = new RegExp(`.*${title}.*`, 'i')
  const productsSearch = await productManager.getByName(searchRegex)
  res.render("products", { productsSearch });
})

router.get('/contacto', async (req, res) => {
  res.render("contacto");
})

router.post('/message', async (req, res) => {
  const { name, contact, message } = req.body;
  if (message) {
    await messageDao.create({ name, contact, status: true, message });
  }
  res.render("contacto", { msg: 'El mensaje fue enviado.', alert: 'success' });
})

router.get('/messages', isAdmin, async (req, res) => {
  const { view } = req.query;
  if (view === 'all') {
    const messages = await messageDao.getAll();
    res.render("mensajes", { messages });
  } else {
    const messages = await messageDao.getAllTrue();
    res.render("mensajes", { messages });
  }

})

router.post('/editmsg', isAdmin, async (req, res) => {
  const { msgId } = req.body;
  await messageDao.update(msgId, { status: false })
  res.render("mensajes", { messages });
})

export default router;
