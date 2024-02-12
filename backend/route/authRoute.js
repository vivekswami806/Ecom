import express from "express";
import  registerController, { forgotPassword, loginController }  from "../controller/authController.js";
import {  isAdmin, isRequire } from "../middleware/authMiddleware.js";

let route= express.Router()
// REGISTER|| POST
 route.post("/register",registerController)
 route.post("/login",loginController)
 route.post("/forgotpassword",forgotPassword)

 // user-auth-route|| get
 route.get('/auth-user',isRequire,(req,res)=>{
    res.send({ok:true})
})
//admin-auth-route || get
route.get('/admin-auth-route',isRequire,isAdmin,(req,res)=>{
    res.send({ok:true})
})

 export default route;