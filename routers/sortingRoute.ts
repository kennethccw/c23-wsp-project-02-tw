import { client } from "../app";
import { Router, Request, Response } from "express";
import { ProductPage } from "../models";

export const sortingRoute = Router();
// sortingRoute.get("/alphabet/ascending", getAscendingAlphabet);
// sortingRoute.get("/alphabet/descending", getDescendingAlphabet);
// sortingRoute.get("/price/ascending", getAscendingPrice);
// sortingRoute.get("/price/descending", getDescendingPrice);

sortingRoute.get("/", getSorting);

// async function getAscendingAlphabet(req: Request, res: Response) {
//   const searchProductName = req.session.searchProduct.query;
//   const data = (
//     await client.query<ProductPage>(/* sql */ `SELECT id, name, image, description, price, stock, sales_quantity as quantity FROM products WHERE LOWER(name) LIKE LOWER($1) ORDER BY name ASC`, [
//       "%" + searchProductName + "%",
//     ])
//   ).rows;
//   console.log(data, "product A-Z");
//   if (JSON.stringify(data) === "[]" || !data) {
//     res.status(400).json({ message: "NO RESULT" });
//     return;
//   }
//   res.status(200).json(data);
// }
// async function getDescendingAlphabet(req: Request, res: Response) {
//   const searchProductName = req.session.searchProduct.query;
//   const data = (
//     await client.query<ProductPage>(/* sql */ `SELECT id, name, image, description, price, stock, sales_quantity as quantity FROM products WHERE LOWER(name) LIKE LOWER($1) ORDER BY name DESC`, [
//       "%" + searchProductName + "%",
//     ])
//   ).rows;
//   console.log(data, "product Z-A");
//   if (JSON.stringify(data) === "[]" || !data) {
//     res.status(400).json({ message: "NO RESULT" });
//     return;
//   }
//   res.status(200).json(data);
// }
// async function getAscendingPrice(req: Request, res: Response) {
//   const searchProductName = req.session.searchProduct.query;
//   const data = (
//     await client.query<ProductPage>(/* sql */ `SELECT id, name, image, description, price, stock, sales_quantity as quantity FROM products WHERE LOWER(name) LIKE LOWER($1) ORDER BY price ASC`, [
//       "%" + searchProductName + "%",
//     ])
//   ).rows;
//   console.log(data, "product $-$$$");
//   if (JSON.stringify(data) === "[]" || !data) {
//     res.status(400).json({ message: "NO RESULT" });
//     return;
//   }
//   res.status(200).json(data);
// }
// async function getDescendingPrice(req: Request, res: Response) {
//   const searchProductName = req.session.searchProduct.query;
//   const data = (
//     await client.query<ProductPage>(/* sql */ `SELECT id, name, image, description, price, stock, sales_quantity as quantity FROM products WHERE LOWER(name) LIKE LOWER($1) ORDER BY price DESC`, [
//       "%" + searchProductName + "%",
//     ])
//   ).rows;
//   console.log(data, "product $$$-$");
//   if (JSON.stringify(data) === "[]" || !data) {
//     res.status(400).json({ message: "NO RESULT" });
//     return;
//   }
//   res.status(200).json(data);
// }

async function getSorting(req: Request, res: Response) {
  const alphabetSorting = req.query.alphabet;
  const priceSorting = req.query.price;
  const searchProductName = req.session.searchProduct.query;

  if ((!alphabetSorting && !priceSorting) || (alphabetSorting && priceSorting)) {
    res.status(400).json({ message: "Invalid Sorting" });
  } else if (alphabetSorting === "asc") {
    const data = (
      await client.query<ProductPage>(/* sql */ `SELECT id, name, image, description, price, stock, sales_quantity as quantity FROM products WHERE LOWER(name) LIKE LOWER($1) ORDER BY name ASC`, [
        "%" + searchProductName + "%",
      ])
    ).rows;
    console.log(data, "product A-Z");
    if (JSON.stringify(data) === "[]" || !data) {
      res.status(400).json({ message: "NO RESULT" });
      return;
    }
    res.status(200).json(data);
    return;
  } else if (alphabetSorting === "desc") {
    const data = (
      await client.query<ProductPage>(/* sql */ `SELECT id, name, image, description, price, stock, sales_quantity as quantity FROM products WHERE LOWER(name) LIKE LOWER($1) ORDER BY name DESC`, [
        "%" + searchProductName + "%",
      ])
    ).rows;
    console.log(data, "product Z-A");
    if (JSON.stringify(data) === "[]" || !data) {
      res.status(400).json({ message: "NO RESULT" });
      return;
    }
    res.status(200).json(data);
    return;
  } else if (priceSorting === "asc") {
    const data = (
      await client.query<ProductPage>(/* sql */ `SELECT id, name, image, description, price, stock, sales_quantity as quantity FROM products WHERE LOWER(name) LIKE LOWER($1) ORDER BY price ASC`, [
        "%" + searchProductName + "%",
      ])
    ).rows;
    console.log(data, "product $-$$$");
    if (JSON.stringify(data) === "[]" || !data) {
      res.status(400).json({ message: "NO RESULT" });
      return;
    }
    res.status(200).json(data);
    return;
  } else if (priceSorting === "desc") {
    const data = (
      await client.query<ProductPage>(/* sql */ `SELECT id, name, image, description, price, stock, sales_quantity as quantity FROM products WHERE LOWER(name) LIKE LOWER($1) ORDER BY price DESC`, [
        "%" + searchProductName + "%",
      ])
    ).rows;
    console.log(data, "product $$$-$");
    if (JSON.stringify(data) === "[]" || !data) {
      res.status(400).json({ message: "NO RESULT" });
      return;
    }
    res.status(200).json(data);
    return;
  }
}
