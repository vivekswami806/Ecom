import { uploadImageOnClodinary } from "../helper/cloudinaryHelper.js";
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
     console.log(image,"sghjbghfs");
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