import jwt from "jsonwebtoken";
import { encryptPassword, matchPassword } from "../helper/authHelper.js";
import userModel from "../model/userSchema.js";

let registerController = async (req, res) => {
  let { name, password, email, address, phone } = req.body;

  try {
    if (!email) {
      return res.status(500).send({ message: "email is required" });
    }
    if (!name) {
      return res.status(500).send({ message: "name is required" });
    }
    if (!phone) {
      return res.status(500).send({ message: "phone number is required" });
    }
    if (!password) {
      return res.status(500).send({ message: "password is required" });
    }
    if (!address) {
      return res.status(500).send({ message: "address is required" });
    }
    let findUser = await userModel.findOne({ email: email });
    console.log(findUser);
    if (findUser) {
      return res.status(200).send({ message: "user already Exit" });
    }
    let hashPassword = await encryptPassword(password);
    let user = await new userModel({
      name,
      password: hashPassword,
      address,
      email,
      phone,
    }).save();
    res
      .status(200)
      .send({ message: "user is register Successfully", success: true });
    console.log(user);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Something worng while Registration",
      err,
      success: false,
    });
  }
};
export const loginController = async (req, res) => {
 try {
  let { email, password } = req.body;
  if (!email) {
    res.status(200).send({ message: "email is required" });
  }
  if (!password) {
    res.status(200).send({ message: "email is required" });
  }
  let existingUser = await userModel.findOne({ email: email });
  if (!existingUser) {
    res
      .status(200)
      .send({ message: "Email and password are invalid ", success: false });
  }
  let userCorrect = await matchPassword(password, existingUser.password);
  if (!userCorrect) {
    res.status(200).send({ message: "Email or password is invalid" });
  }
  let token = jwt.sign({ _id: existingUser._id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  res.status(200).send({
    message: "you are successfully login",
    success: true,
    user: {
      name: existingUser.name,
      email: existingUser.email,
      phone: existingUser.phone,
      address: existingUser.address,
      role: existingUser.role,
    },
    token,
  });
  
 } catch (error) {
      console.log(error);
      res.status(500).send({
        message:"something worng in login",
        success:false
      })
 }
};
export default registerController;
