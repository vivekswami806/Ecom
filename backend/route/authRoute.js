import express from "express";
import  registerController, { loginController }  from "../controller/authController.js";
import {  isAdmin, isRequire } from "../middleware/authMiddleware.js";

let route= express.Router()
// REGISTER|| POST
 route.post("/register",registerController)
 route.post("/login",loginController)
route.get("/test", isRequire,isAdmin,(req,res)=>{
    res.send("test is done")
})

 export default route;