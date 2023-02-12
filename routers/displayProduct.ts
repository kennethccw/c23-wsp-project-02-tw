import express from "express";

import {client} from "../app";

/////////////// VER.1 ..///////////////////////////
export async function displayProduct(req:express.Request,res:express.Response){
    const id=req.body.id;
    // console.log(id);
  

    let queryResult= await client.query(
    `SELECT * FROM products where id='${id}'`
)
// console.log(queryResult.rows, "from displayProducts.ts")
// res.status(201).json(queryResult.rows)
res.json(queryResult.rows)

}  

/////////////////////////// VER.2 //////////////////////

//get product by /:id
// export async function displayProduct(req:express.Request,res:express.Response){
//    const id=req.params.id;


//     let queryResult= await client.query(
//             `SELECT * FROM products where id='${id}'`
//         )
//     let data = queryResult.rows
//     //     let data = { id: queryedProducts.id,
//     //         name: queryedProducts.name,
//     //     price: queryedProducts.price,
//     // stock: queryedProducts.stock}
//         res.status(201).json(data);
// }  

// <div class="topSalesProducts${drinkCount}">
// <a href="/product/${product.id}"><img class="productsImage" src="${product.image}" alt="..."/></a>

// <div class="productsName">${product.name}</div>

// <div class="productsPrice">$${product.price}</div>
// </div>


