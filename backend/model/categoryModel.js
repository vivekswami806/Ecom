import mongoose from "mongoose";

let categoryModel = new  mongoose.Schema({
name:{
    type:String,
    require:true
},
slug:{
    type:String,
    require:true,
    lowercase:true
}
},{timestamps:true})
export default mongoose.model("category",categoryModel)