import express from "express";
import {client} from "../app";


export async function removeProductRecord(req: express.Request, res: express.Response){

    if (req.session.user) {

        let users= await client.query(
            `SELECT * FROM users`
        )

        // console.log(users)
for (let user of users.rows){
    if (req.session.user.id==user.id){
        const {productId}= req.body;
        await client.query(`
        DELETE FROM decision where users_id=${req.session.user.id} AND product_id=${productId}`)

        let updateTotalPrice=await client.query(`
        SELECT SUM(total_price_per_product) AS total FROM decision WHERE users_id=${req.session.user.id}`);

    // console.log(updateTotalPrice.rows[0].total)


        let updateNumberOfItems= await client.query(`
        SELECT * FROM decision WHERE users_id=${req.session.user.id} AND product_id=${productId}`)
        

    res.status(201).json({totalPrice:updateTotalPrice.rows[0].total,
                            numberOfItem: updateNumberOfItems.rowCount})



        return;
    }

}

}

}