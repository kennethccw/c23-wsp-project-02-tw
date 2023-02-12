import express from "express";
import { client } from "../app";
import type { Productrecords } from "../models";

export async function productSession(req: express.Request, res: express.Response) {
  const id = req.body.id;
  const products = await client.query<Productrecords>(/*sql */ `SELECT id, name from products`);

  for (const product of products.rows) {
    if (id == product.id) {
      req.session.productRecords = { id: product.id };
      res.status(201).json(req.session.productRecords);
      console.log(`succeed to record this product ${id} session, refers to productSesssion.ts`);
      // console.log(req.session.productRecords, "refers to productSession.ts");
      console.log(req.session.productRecords, "refers to productSession.ts");

      return;
    }
  }
}
