import express from "express";
import { client } from "../app";
// import type { Request, Response } from "express";

// export const addCartRoute = express.Router();

// Section 1 - Define endpoints (Method, Path = "/memos")
// addCartRoute.post("/add", addToCar);

export async function addToCar(req: express.Request, res: express.Response) {
  if (req.session.user) {
    if (req.session.productRecords) {
      const created_date = req.body.createdDate;
      const eachProductQuantity = req.body.quantity;
      const productID = req.body.product_Id;

      let decisions = await client.query(`SELECT * FROM decision`);
      // console.log(decisions.rows[0])
      let unitPriceOfProduct = await client.query(`
        SELECT price FROM products WHERE products.id = ${req.session.productRecords.id}`);
      // console.log(unitPriceOfProduct.rows[0].price, "line 26");
      // console.log(eachProductQuantity, "addToCar, line27");
      let totalPricePerProduct = eachProductQuantity * unitPriceOfProduct.rows[0].price;
      // console.log(totalPricePerProduct, "line 28");

      for (let decision of decisions.rows) {
        if (decision.users_id == req.session.user.id && decision.product_id == req.session.productRecords.id) {
          // console.log(`UPDATE decision SET quantity = quantity + ${eachProductQuantity} WHERE users_id=${req.session.user.id} AND product_id=${req.session.productRecords.id} `)

          await client.query(`UPDATE decision SET quantity = quantity + ${eachProductQuantity} WHERE users_id=${req.session.user.id} AND product_id=${productID} `);

          await client.query(
            `UPDATE decision SET total_price_per_product = total_price_per_product  +${totalPricePerProduct} WHERE users_id=${req.session.user.id} AND product_id=${req.session.productRecords.id}`
          );
          res.status(201).json({ message: "added successfully!" });
          return;
        }
      }

      await client.query(`INSERT INTO decision (users_id, product_id, quantity, created_date, total_price_per_product) VALUES ($1, $2, $3, $4, $5)`, [
        req.session.user.id,
        productID,
        eachProductQuantity,
        created_date,
        totalPricePerProduct,
      ]);

      //    await client.query(
      //     `INSERT INTO decision (quantity, total_price_per_product, created_date, users_id,product_id ) VALUES ($1, $2, $3, $4, $5)`,
      //     [eachProductQuantity,totalPricePerProduct,created_date,req.session.user.id,req.session.productRecords.id]
      //    )

      res.status(201).json({ message: "added successfully!" });
      return;
    }
  } else {
    res.status(202).json({ message: "please first login to your account!" });
  }
}
