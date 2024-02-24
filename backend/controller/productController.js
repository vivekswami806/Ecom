import { deleteImageOnCloudinary, uploadImageOnClodinary } from "../helper/cloudinaryHelper.js";
import productModel from "../model/productModel.js";

export const  createProductController= async(req,res)=>{
    try {
     const {name,brand,description,category,shipping,price,quantity} = req.body;
     let images = req.files; 
     if( !name || !brand || !description || !category || !shipping ||!price || !quantity ){
        return res.status(200).send({message:"All Field Are Required*"})
     }
     if(images.length === 0){
        return res.status(200).send({message:"Atlest Upload one Image"})
     }
     const image= await uploadImageOnClodinary(req.files)
     let product = await new productModel({
        name,
        price,
        category,
        description,
        brand,
        shipping,
        images:image,
        quantity
     }).save();
     return res.status(201).send({message:"Product Created Successfully ", success:true,product})

    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Something error while creating product"})
    }
}

//getAllProduct
export let getAllProductController = async (req, res) => {
   try {
     let products = await productModel
       .find({})
       .populate("category")
       .sort({ createdAt: -1 });
     res.status(200).send({
       message: "All Products",
       success: true,
       products,
       total: products.length,
     });
   } catch (err) {
     console.log(err);
     res.status(500).send({ message: "Somthing wrong while getting Product" });
   }
 };
 //get single product
export let getSingleProductController = async (req, res) => {
   try {
     let { id } = req.params;
     let product = await productModel.findOne({ _id: id });
     res.status(200).send({ message: "Result ", product, success: true });
   } catch (err) {
     console.log(err);
     res.status(500).send({
       message: "Somthing wrong while fetching data",
       success: false,
       err,
     });
   }
 };
 //delete product
export let deleteProductController = async (req, res) => { 
   let { id } = req.params;
   let data = await productModel.findOne({ _id: id });
   //do cleanup in cloudinary
   await deleteImageOnCloudinary(data.images);
   let deleteProduct = await productModel.findByIdAndDelete({ _id: id });
   res.status(200).send({
     message: "Product Deleted Successfully",
     success: true,
     deleteProduct,
   });
 };

 // for update product 
 export let updateProductController = async (req, res) => {
   try {
     let { name, price, quantity, description, category, brand, shipping } =
     req.body;
     let { id } = req.params;
     if (
       !name ||
       !price ||
       !quantity ||
       !description ||
       !category ||
       !brand ||
       !shipping
     ) {
       return res.status(200).send({ message: "All fields are required *" });
     } else {
       let findData = await productModel.findOne({ _id: id });
       let image
        if(req.files.length>0){
          await deleteImageOnCloudinary(findData.images);
         image= await uploadImageOnClodinary(req.files);
        }     
       let product = await productModel.findByIdAndUpdate(
         { _id: id },
         { ...req.body,images:image?image:findData.images },
         { new: true }
       );
       res.status(200).send({
         message: "Product Update Succuessful",
         product,
         success: true,
       });
     }
   } catch (err) {
     console.log(err);
     res
       .status(500)
       .send({ message: "Somthing wrong while updating", success: false, err });
   }
};