import express from "express";
import  registerController, { loginController }  from "../controller/authController.js";
import {  isAdmin, isRequire } from "../middleware/authMiddleware.js";

let route= express.Router()
// REGISTER|| POST
 route.post("/register",registerController)
 route.post("/login",loginController)
 route.get('/auth-user',isRequire,(req,res)=>{
    res.send({ok:true})
})

 export default route;