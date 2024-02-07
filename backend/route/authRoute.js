import express from "express";
import  registerController, { loginController }  from "../controller/authController.js";

let route= express.Router()
// REGISTER|| POST
 route.post("/register",registerController)
 route.post("/login",loginController)
 export default route;