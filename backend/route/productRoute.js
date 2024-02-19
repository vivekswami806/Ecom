import express from "express";
import { createProductController } from "../controller/productController.js";
import { isAdmin, isRequire } from "../middleware/authMiddleware.js";
import uploads from "../config/multer.js";
const route = express.Router()
route.post("/createproduct", isRequire, isAdmin, uploads.array('images',4), createProductController)
export default route