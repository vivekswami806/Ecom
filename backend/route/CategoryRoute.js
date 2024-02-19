import  express from "express";
import { allCategoryController, createCategoryController, deleteCategoryController, singlecategoryController, updateCategoryController } from "../controller/categoryController.js";
import { isAdmin, isRequire } from "../middleware/authMiddleware.js";

let route  = express.Router()
route.post("/createcategory",isRequire,isAdmin,createCategoryController)
route.put("/updatecategory/:id",isRequire,isAdmin,updateCategoryController)
route.delete("/detetecategory/:id",isRequire,isAdmin,deleteCategoryController)
route.get("/allcategory",allCategoryController)
route.get("/singlecategory",singlecategoryController)
export default route