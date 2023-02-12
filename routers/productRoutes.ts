import { Router, Request, Response } from "express";
import { client } from "../app";

export const productRoutes = Router();

productRoutes.get("/:pid", getProduct);

async function getProduct(req: Request, res: Response) {
  await client.query(/* sql */ `SELECT * FROM products WHERE `);
}

// /product/3

// product/:pid -> /product/3

// await fetch (product/${pid})
