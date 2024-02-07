import mongoose from "mongoose";
 let DbConnect=async()=>{
    try{
        let connection=await mongoose.connect('mongodb://127.0.0.1:27017/e1ecom');
        console.log("db connect");
    }
    catch{
        console.log("something issue in the db");
    }
 }
 export default DbConnect;