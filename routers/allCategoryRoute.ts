import express from "express";
import {client} from "../app";
import type { Request, Response } from "express";
import { Products } from "../models";

export const allCategoryRoute = express.Router();

// Section 1 - Define endpoints (Method, Path = "/memos")
allCategoryRoute.get("/allCategory", getallCategoryRoute);

// Section 2 - Define Route Handler
async function getallCategoryRoute(req: Request, res: Response) {
  const queryResult = await client.query<Products>(
    "SELECT * FROM products ORDER BY id ASC"
  );
  res.json(queryResult.rows);
}