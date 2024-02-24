import express from "express";
import { createProductController, deleteProductController, getAllProductController, getSingleProductController, updateProductController } from "../controller/productController.js";
import { isAdmin, isRequire } from "../middleware/authMiddleware.js";
import uploads from "../config/multer.js";
const route = express.Router()
route.post("/createproduct", isRequire, isAdmin, uploads.array('images',4), createProductController)
//for all product
route.get("/allproduct",getAllProductController)
//for single product
route.get("/singleproduct/:id",getSingleProductController)
// for delete product
route.delete("/deleteproduct/:id",isRequire,isAdmin,deleteProductController)
// for update product 
route.put("/updateproduct/:id",isRequire,isAdmin,uploads.array('images',4),updateProductController)
export default route