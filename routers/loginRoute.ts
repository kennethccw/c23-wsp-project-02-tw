import express from "express";
import { client } from "../app";
import { checkPassword } from "../bcrypt";
import type { Login } from "../models";
import fetch from "cross-fetch";

export const loginRoutes = express.Router(); //export to app.ts
// loginRoutes.use("/:textname",(req, res) => {
// let textname = req.params.textname
// console.log(textname)
//   res.redirect(`/${textname}.html`)
// });

loginRoutes.post("/", postLoginRoutes);
loginRoutes.get("/google", loginGoogle);
loginRoutes.get("/", getLoginRoutes);

async function postLoginRoutes(req: express.Request, res: express.Response, next: express.NextFunction) {
  const { email, password, url } = req.body;
  const users = await client.query<Login>(/* sql */ `SELECT id, username, email, password from users`);

  for (const user of users.rows) {
    if (email === user.email) {
      let result = await checkPassword(password, user.password);
      if (result) {
        req.session.user = { id: user.id, username: user.username, email: user.email, password: user.password };
        res.status(200).json({ message: "good good good, loginRoute.ts" });
        console.log({ url });
        console.log(req.session.user, "refers to loginRoutes.ts, line 29");
        console.log(req.session, "refers to loginRoutes.ts, line 30");
        console.log(req.session.productRecords, "loginRoute.ts, line 31");
        // console.log(req.session);
        return;
      }
    }
  }
  req.session.user = false;
  console.log(req.session.user, "loginRoute TS");
  res.status(400).json({ message: "Unsuccessful login" });
  return;
}

////////////  from WSP011 Local Login and Bcrypt.js  Local Route part   ////////////////////////////////

async function loginGoogle(req: express.Request, res: express.Response) {
  const accessToken = req.session?.["grant"].response.access_token;
  // console.log(accessToken);
  const fetchRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    method: "get",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const result = await fetchRes.json();
  // console.log(result);
  const users = (await client.query<Login>(/* sql */ `SELECT * FROM users WHERE users.email = $1`, [result.email])).rows;

  let user = users[0];

  if (!user) {
    // Create the user when the user does not exist
    // res.redirect("/register.html");
    res.redirect("/register.html");
    return;
  } else {
    req.session.user = { id: users[0].id, username: users[0].username, email: users[0].email, password: users[0].password };
    // res.status(200).json({ message: "logged in with google" });
    res.redirect("/");
  }
}

function getLoginRoutes(req: express.Request, res: express.Response) {
  if (req.session.user) {
    res.status(200).json(req.session.user);
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}
