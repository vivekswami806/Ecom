import orderModel from "../model/orderModel.js";

export const orderUserController = async(req,res)=>{
   try {
       let order =await orderModel.find({buyer:req.user._id}).populate('products').populate('buyer', "name").sort({createdAt: -1})
    console.log(order ,"hshjhjds");
    res.status(200).send({message:"Order Details", success:true ,order})
   } catch (error) {
       res.status(500).send({message:"Something Is error", error, success:false})
   }
}