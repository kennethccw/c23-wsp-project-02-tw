import dotenv from "dotenv";
import pg from "pg";
// import { hashPassword } from "./hash";

dotenv.config();

async function importData() {
  const client = new pg.Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  });
  await client.connect();

  // DELETE FROM tables
  await client.query("DELETE FROM decision");
  await client.query("DELETE FROM products");
  await client.query("DELETE FROM category");
  await client.query("insert into category (name) values ('drinks')");
  await client.query("insert into category (name) values ('snacks')");
  await client.query("insert into category (name) values ('noodles')");
  await client.query("DELETE FROM brands");
  await client.query("insert into brands (name) values ('a')");
  await client.query("insert into brands (name) values ('bc')");
  await client.query("insert into brands (name) values ('c')");

  // // Insert dummy data
  const products = [
    { product_category: 1, image: "/productImages/drinks/COKE.jpg", product_name: "Coke", product_price: "28", stock: false, salesQuantity: 11, brand: 1 },
    { product_category: 1, image: "/productImages/drinks/COKE_PLUS.jpg", product_name: "Coke Zero", product_price: "37", stock: false, salesQuantity: 22, brand: 1 },
    { product_category: 1, image: "/productImages/drinks/OOHA_LYCHEE_LACTIC.jpg", product_name: "Vita Tea", product_price: "42", stock: true, salesQuantity: 16, brand: 1 },
    { product_category: 1, image: "/productImages/drinks/OOHA_PEACH_OOLONG_TEA.jpg", product_name: "Vita Soy", product_price: "66", stock: true, salesQuantity: 23, brand: 1 },

    { product_category: 2, image: "/productImages/snacks/calbeeHotAndSpicy.jpg", product_name: "Calbee", product_price: "13", stock: true, salesQuantity: 45, brand: 2 },
    { product_category: 2, image: "/productImages/snacks/edoCracker.jpg", product_name: "Edo Cracker", product_price: "11", stock: true, salesQuantity: 77, brand: 2 },
    { product_category: 2, image: "/productImages/snacks/pockyDefault.jpg", product_name: "Pocky", product_price: "11", stock: true, salesQuantity: 121, brand: 2 },
    { product_category: 2, image: "/productImages/snacks/lotteLittleBear.jpg", product_name: "Lotte Little Bear", product_price: "12", stock: true, salesQuantity: 54, brand: 2 },

    { product_category: 3, image: "/productImages/cupNoodles/ichiranTonkotsu.jpg", product_name: "Ichiran Tonkotsu", product_price: "66", stock: false, salesQuantity: 69, brand: 3 },
    { product_category: 3, image: "/productImages/cupNoodles/NISSIN_NOODLE_SEAFOOD.jpg", product_name: "NISSIN SEAFOOD", product_price: "66", stock: true, salesQuantity: 27, brand: 3 },
    { product_category: 3, image: "/productImages/cupNoodles/nissinYubaUdon.jpg", product_name: "Nissin Yuba Udon", product_price: "66", stock: true, salesQuantity: 58, brand: 3 },
    { product_category: 3, image: "/productImages/cupNoodles/NONG_SHIM_SHIN_RAMEN.jpg", product_name: "NONG SHIM RAMEN", product_price: "66", stock: true, salesQuantity: 29, brand: 3 },
  ];
  for (const product of products) {
    await client.query("INSERT INTO products (category_id, image, name, price, stock, sales_quantity, brands_id ) VALUES ($1, $2, $3, $4, $5, $6, $7)", [
      product.product_category,
      product.image,
      product.product_name,
      product.product_price,
      product.stock,
      product.salesQuantity,
      product.brand,
    ]);
  }

  await client.end();
}

importData();
