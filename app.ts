import dotenv from "dotenv";
dotenv.config();

import pg from "pg";
export const client = new pg.Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

client.connect();
import express from "express";
import http from "http";
// import { Server as SocketIO } from "socket.io";
import expressSession from "express-session";
import path from "path";
import Stripe from "stripe";
// import { forumRoutes } from "./routers/forumRoute";
import { productSession } from "./routers/productSession";
import { loginRoutes } from "./routers/loginRoute";
// import { hashPassword } from "./bcrypt";
import { ProductPage, User } from "./models";
import { userLogin } from "./middleware";
import { logoutRoutes } from "./routers/logoutRoute";
// import {registerRoutes} from "./routers/registerRoute" ;
import { register } from "./routers/registerRoute";
import { indexRoute } from "./routers/indexRoute";
import { displayProduct } from "./routers/displayProduct";
import { buyNow } from "./routers/buyNow";
import { addToCar } from "./routers/addToCar";
import { Productrecords } from "./models";
import { allCategoryRoute } from "./routers/allCategoryRoute";
import { getDataToShoppingCart } from "./routers/getDataToShoppingCart";
import { searchBarRoutes } from "./routers/searchBarRoute";
import { minusQuantity } from "./routers/minusQuantity";
import { addQuantity1 } from "./routers/addQuantity";
import { removeProductRecord } from "./routers/removeProductReord";
declare module "express-session" {
  interface Session {
    user: User | false;
    productRecords: Productrecords | false;
    searchProduct: { query: string; productArr: ProductPage[] };
    // grant: { response: { access_token: string | null } };
  }
}

const app = express();
const server = new http.Server(app);
// const io = new SocketIO(server);
const PORT = 8080;

import grant from "grant";
import { profileRoutes } from "./routers/profileRoute";
import { paymentRoute } from "./routers/paymentRoute";
// import { searchBarRoutes } from "./routers/searchBarRoute";
import { sortingRoute } from "./routers/sortingRoute";
// import { paymentRoute } from "./routers/paymentRoute";
// import { allCategoryRoute } from "./routers/allCategoryRoute";

const grantExpress = grant.express({
  defaults: {
    origin: "http://localhost:8080",
    transport: "session",
    state: true,
  },
  google: {
    key: process.env.GOOGLE_CLIENT_ID || "",
    secret: process.env.GOOGLE_CLIENT_SECRET || "",
    scope: ["profile", "email"],
    callback: "/login/google",
  },
});

app.use(
  expressSession({
    secret: Math.random().toString(32).slice(2),
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(express.urlencoded());

//////////////////////////////////   END OF CONFIGURATION PART ////////////////////////////////////////////////
app.use(grantExpress as express.RequestHandler);

// app.use("/forum", forumRoutes);
// app.use(datingRoutes);
app.post("/productsesseion", productSession);
app.use("/login", loginRoutes); // request received from login.js
app.use(logoutRoutes); // request received from login.js
app.use(indexRoute); // request received from index.js
app.use(allCategoryRoute); // request received from allCategory.js
app.use("/profile", profileRoutes);
app.post("/userData", register);
app.use("/search", searchBarRoutes);
app.use("/sort", sortingRoute);

//////////////////////  registration route handler END ////////////////////////////////////////////////////////////////////////
app.post("/id1", displayProduct); //ver.1
app.get("/buyNow", buyNow);
app.post("/addToCar", addToCar);
app.get("/getDataToShoppingCart", getDataToShoppingCart);
app.post("/minusQuantity", minusQuantity);
app.post("/addQuantity", addQuantity1);
app.post("/removeProductRecord", removeProductRecord);
////////////////////// Payment //////////////////////////

export const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY + "", { apiVersion: "2022-11-15" });
app.use(paymentRoute);
////////////////////// Payment //////////////////////////

app.use(express.static("public"));
app.use("/user", userLogin, express.static("user"));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "404.html"));
});

server.listen(PORT, () => {
  console.log(`listening to port: ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
