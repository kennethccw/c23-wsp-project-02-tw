import express from "express";


export function buyNow(req:express.Request,res:express.Response){
    // console.log(req.session, "from buyNow.ts");
    if (req.session.user){
        res.status(201).json({message:"Please go to pay"});
        return;
    }
    else{res.status(202).json({message:"please first login to your account!"})}
}