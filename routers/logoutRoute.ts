import express from "express";

export const logoutRoutes = express.Router();

logoutRoutes.get("/logout", getLogoutRoutes);

function getLogoutRoutes(req: express.Request, res: express.Response) {
  // req.session.destroy((err) => {
  //   res.status(200).json({ message: "destroyed" });
  //   return;
  // });
  req.session.user = false;
  req.session.productRecords=false;
  // req.session.grant.response.access_token = null;
  // console.log(req.session.grant.response.access_token);
  res.status(200).json({ message: "signed out" });
}
