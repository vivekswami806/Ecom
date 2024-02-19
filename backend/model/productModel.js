import mongoose from "mongoose";
let productModel=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    brand:{
        type:String,       
    },
    // slug:{
    //     type:String,
    //     require:true,
    //     lowercase:true
    // },
    price:{
        type:Number,
        require:true,
    },
    quantity:{
        type:Number,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    images:[{
        url:{
            type:String
        },
        public_id:{
            type:String
        }
    }],
    category:{
        type:mongoose.ObjectId,
        require:true,
        ref:"category",
    },
    shipping:{
        type:String,
        default:'yes'
    }
    
},{timestamps:true})
 
export default mongoose.model("product",productModel)