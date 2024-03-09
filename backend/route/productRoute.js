import express from "express";
import { brainTreePaymentController, braintreeTokenController, createProductController, deleteProductController, filterProductController, getAllProductController, getSingleProductController, searchHandlerController, simillerProductController, updateProductController } from "../controller/productController.js";
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
// for Seaching Product
route.get("/productsearch/:keyword", searchHandlerController)
// for Filter
route.post("/filterproduct", filterProductController)

// for similer 
route.get('/similarproduct/:p_id/:c_id',simillerProductController)
//payment-token ||get
route.get("/braintree/token", braintreeTokenController);

//payment-order || post
route.post("/braintree/payment",isRequire,brainTreePaymentController)
export default route