import jwt from "jsonwebtoken";
import { encryptPassword, matchPassword } from "../helper/authHelper.js";
import userModel from "../model/userSchema.js";

let registerController = async (req, res) => {
  let { name, password, email, address, phone, answer } = req.body;

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
    if (!answer) {
      return res.status(500).send({ message: "answer is required" });
    }
    let findUser = await userModel.findOne({ email: email });
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
      answer,
    }).save();
    res
      .status(200)
      .send({ message: "user is register Successfully", success: true });
  } catch (err) {
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
      return res.status(200).send({ message: "Email or password is invalid" });
    }
    let token = jwt.sign({ _id: existingUser._id }, process.env.SECRET_KEY);
    res.status(200).send({
      message: "you are successfully login",
      success: true,
      user: {
        name: existingUser.name,
        email: existingUser.email,
        phone: existingUser.phone,
        address: existingUser.address,
        role: existingUser.role,
        answer: existingUser.answer,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "something worng in login",
      success: false,
    });
  }
};
export const forgotPassword = async (req, res) => {
  try {
    let { email, password, answer } = req.body;
    if (!email) {
      return res.status(200).send({ message: "Email is required" });
    }
    if (!password) {
     return res.status(200).send({ message: "Password is required" });
    }
    if (!answer) {
     return res.status(200).send({ message: "Answer is required" });
    }
    let existingUser = await userModel.findOne({ email ,answer});
   
    if (!existingUser) {
     return   res.status(200).send({ message: "Email or Answer is not valid " });
    }
    let hashPassword = await encryptPassword(password);
    let updateData = await userModel.findByIdAndUpdate(
      { _id: existingUser._id },
      { password: hashPassword },
      { new: true }
    );
    res
      .status(200)
      .send({ message: "Password Update Successful", success: true });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Something is worng", success: false, error });
  }
};
export default registerController;
