import categoryModel from "../model/categoryModel.js";
import slugify from "slugify";
export const createCategoryController= async(req,res)=>{
   try {
    let {name}= req.body;
    if(!name){
      return  res.status(200).send({message:"Category field Required "})
    }
    let result=await categoryModel.findOne({name:name})
    if(result){
      return  res.status(200).send({message:"Name is Already Exist", success:false})
    }
    let category =await new categoryModel({name:name,slug:slugify(name)}).save()
    res.status(201).send({message:"category created successful", success:true,category})
    
   } catch (error) {
    console.log(error);
    res.status(500).send({message:"Something Error while create category"})
   }

}
 export const updateCategoryController= async(req,res)=>{
 try {
  let {name}= req.body
  let {id}=req.params
  if(!name){
    return res.status(200).send({message:"Name Is required"})
  }
  let category= await categoryModel.findByIdAndUpdate({_id:id},{name,slug:slugify(name)},{new:true})
  res.status(200).send({message:"Category Update successful",category, success:true})
 } catch (error) {
   res.status(500).send({message:"Something Is worng while Update"})
 }
 }

 export const deleteCategoryController =async(req,res)=>{
 try {
  let {id}=req.params
  let result = await categoryModel.findByIdAndDelete({_id:id})
  res.status(200).send({
    message:"Category is deleted",success:true,result
  })
 } catch (error) {
      res.status(500).send({message:"Something Error while Deleting"})
 }
 }
 export const allCategoryController = async(req,res)=>{
    try {
      let category =await categoryModel.find({}).sort({createdAt:-1})
      console.log(category);
      res.status(200).send({message:"All category", success:true, category , total:category.length})
      
    } catch (error) {
      res.status(500).send({message:"Something While worng while All Category",success:false})
    }
 }

 export const singlecategoryController= async(req,res)=>{
  try {
      let {slug}=req.params
      let category =await categoryModel.findOne({slug})
     res.status(200).send({message:"Single Found",category, success:true})
  } catch (error) {
    res.status(200).send({message:"Fetching Error while Single Category "})
  }
 }