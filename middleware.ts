import type { Request, Response, NextFunction } from "express";
export function userLogin(req: Request, res: Response, next: NextFunction) {
  if (req.session.user) {
    // console.log("you are user now! (refers to middleware.ts)", "product session", req.session.user, req.session.productRecords);
    console.log("***********")
    console.log(req.session.user.id)
    next();
  } else {
    console.log("not login yet, ", "user=>", req.session.user, "middleware.ts");
    console.log("productSession", req.session.productRecords, "middleware.ts");
    res.status(400).json({ message: "you are not user(refers to middleware.ts)" });
  }
}
