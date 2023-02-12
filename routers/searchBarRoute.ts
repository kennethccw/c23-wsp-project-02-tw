import { client } from "../app";
import { Router, Request, Response } from "express";
import { ProductPage } from "../models";

export const searchBarRoutes = Router();
searchBarRoutes.post("/", postProductInfo);
searchBarRoutes.post("/product", postProductPage);
searchBarRoutes.get("/", getSearchPage);

async function postProductInfo(req: Request, res: Response) {
  console.log("into post function");
  const searchProductName: string = req.body.name;
  const data = (
    await client.query<ProductPage>(/* sql */ `SELECT id, name, image, description, price, stock, sales_quantity as quantity FROM products WHERE LOWER(name) LIKE LOWER($1) ORDER BY name ASC`, [
      "%" + searchProductName + "%",
    ])
  ).rows;
  console.log(data);

  req.session.searchProduct = { query: searchProductName, productArr: data };
  // console.log(JSON.stringify(data) === "[", "hi");
  // console.log(req.session.searchProduct);
  if (JSON.stringify(data) === "[]" || !data) {
    res.status(400).json({ message: "NO RESULT" });
    return;
  }
  res.status(200).json(data);
}

async function postProductPage(req: Request, res: Response) {
  console.log("into product page");
  const searchProductName = req.body.name;
  console.log(searchProductName);
  const data = (await client.query<ProductPage>(/* sql */ `SELECT id, name, image, description, price, stock, sales_quantity as quantity FROM products WHERE name = '${searchProductName}'`)).rows[0];
  // req.session.searchProduct = data;
  // console.log(req.session.searchProduct);
  res.status(200).json(data);
}

function getSearchPage(req: Request, res: Response) {
  const productSearched = req.session.searchProduct;
  res.status(200).json(productSearched);
}
