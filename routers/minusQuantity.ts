import express from "express";

import { client } from "../app";

export async function minusQuantity(req: express.Request, res: express.Response) {
    if (req.session.user) {
   
    const { quantity1, productId } = req.body;

    // console.log(quantity1, productId, "from minusQuantity.ts", "line 8")
    await client.query(
        `UPDATE decision SET quantity=${quantity1} where product_id=${productId}`
    )

    let queryResult1 = await client.query(`
SELECT * FROM products where products.id=${productId}`);



let totalPrice= quantity1*(queryResult1.rows[0].price);

await client.query(
    `UPDATE decision SET total_price_per_product= ${totalPrice} where product_id=${productId}  `)


let updateTotalPrice= await client.query(
    `SELECT total_price_per_product FROM decision where product_id=${productId}`
)
// console.log(updateTotalPrice.rows[0].total_price_per_product, "line 34")

let totalPriceForPayment= await client.query(`
SELECT SUM(total_price_per_product) AS total FROM decision WHERE users_id=${req.session.user.id}`)


// console.log(totalPriceForPayment.rows[0].total, "from minus line 35")

// console.log(numberOfItems.rowCount,"from minusQuantity line 35");
res.json({message:updateTotalPrice.rows[0].total_price_per_product,
    totalAmount: totalPriceForPayment.rows[0].total})

}

}