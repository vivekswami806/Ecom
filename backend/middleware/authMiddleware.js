import jwt from "jsonwebtoken";
import userSchema from "../model/userSchema.js";

export const isRequire = async (req, res, next) => {
   
  try {
     
     let decode = jwt.verify(req.headers.authorization,process.env.SECRET_KEY)
     req.user = decode;
     console.log("decode", decode);
     if (!decode)
     {
      res.status(200).send({ message: "Unauthorized User" });
    }
     next();
  } catch (error) {
    console.log(error);
    res.send({ message: "User is not Autherized" });
  }
   req.headers.authorization;
};
export const isAdmin = async (req, res, next) => {
  try {
    let userData=  await userSchema.findById({_id:req.user._id})
    if(userData.role !==0){
        next()
    }

} catch (error) {
    res.status(500).send({message:"User is bb not Autherized"})
}
};
