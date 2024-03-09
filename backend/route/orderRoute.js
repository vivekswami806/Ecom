import express from "express"
import { orderUserController } from "../controller/orderController.js"
import { isRequire } from "../middleware/authMiddleware.js"

 let route = express.Router()
// userorder
route.get('/orderdetail', isRequire, orderUserController )

export default route