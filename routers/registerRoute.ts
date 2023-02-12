import express from "express";
import { hashPassword } from "../bcrypt";

import { client } from "../app";



// export const registerRoutes = express.Router();

// registerRoutes.post("/userData", register);

 export async function register(req: express.Request, res: express.Response){
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const date = req.body.date;
    const checkbox = req.body.checkbox;
  
    if (!username || !email || !password || !phone || !date) {
      res.status(400).json({ message: "missing username,email,password, phone number or birthday ! " });
      return;
    }
  
    let tableUserName = await client.query(`SELECT username from users`);
    const b = tableUserName.rows;
  
    let tableEmail = await client.query(`SELECT email from users`);
    const c = tableEmail.rows;
  
    const hashedPassword = await hashPassword(password); // function imported from ./bcrypt
  
    let x = b.find((data) => username === data.username);
    let y = c.find((data) => email === data.email);
    if (x && !y) {
      res.status(202).json({ message: "Sorry...username already taken, please try again" });
      return;
    }
    if (!x && y) {
      res.status(202).json({ message: "Sorry...email already taken, please try again" });
      return;
    }
    if (x && y) {
      res.status(202).json({ message: "Sorry...username and email already taken, please try again" });
  
      return;
    }
  
    await client.query(
      `INSERT INTO users (username, email,password, birthday, mobile, subscription) 
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [username, email, hashedPassword, date, phone, checkbox]
    );
    res.status(201).json({ message: "register successfully" });
    console.log(".ts ok");



}