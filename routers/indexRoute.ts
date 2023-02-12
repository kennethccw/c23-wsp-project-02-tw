import express from "express";
import {client} from "../app";
import type { Request, Response } from "express";
import { Products } from "../models";

export const indexRoute = express.Router();

// Section 1 - Define endpoints (Method, Path = "/memos")
indexRoute.get("/index", getindexRoute);

// Section 2 - Define Route Handler
async function getindexRoute(req: Request, res: Response) {
  const queryResult = await client.query<Products>(
    "SELECT * FROM products ORDER BY sales_quantity ASC"
  );
  res.json(queryResult.rows);
}