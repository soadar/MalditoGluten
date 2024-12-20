import MongoStore from 'connect-mongo';
import 'dotenv/config';
import express from "express";
import handlebars from "express-handlebars";
import session from 'express-session';
import morgan from "morgan";
import passport from 'passport';
import './DAO/mongodb/connection.js';
import { errorHandler } from "./middlewares/errorHandler.js";
import "./passport/local-strategy.js";
import cartRouter from "./routes/cart.router.js";
import productRouter from "./routes/product.router.js";
import viewsRouter from "./routes/views.router.js";
import { __dirname } from "./utils.js";

const mongoStoreOptions = {
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_ATLAS_URL,
    crypto: {
      secret: process.env.MONGO_S
    }
  }),
  secret: process.env.MONGO_S,
  resave: true,
  saveUninitialized: false,
  cookie: {
    //maxAge: 300000 //5 min
    //maxAge: 900000 // 15 min
    //maxAge: 3600000  // 1 hora
    maxAge: 3600000 * 24 // 1 dia
  }
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
app.use(errorHandler);

app.use(session(mongoStoreOptions))
app.use(passport.initialize())
app.use(passport.session())

app.engine("handlebars", handlebars.engine({
  helpers: {
    check: function (value) {
      return value;
    },
    prod: function (value) {
      return value === 'prod';
    }
  }
}))
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server ok http://localhost:${PORT}`);
});

