import {
  deleteImageOnCloudinary,
  uploadImageOnClodinary,
} from "../helper/cloudinaryHelper.js";
import orderModel from "../model/orderModel.js";
import productModel from "../model/productModel.js";
import braintree from "braintree"
import dotenv from 'dotenv'
dotenv.config()
   
let gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANT_ID,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
});
export const createProductController = async (req, res) => {
  try {
    const { name, brand, description, category, shipping, price, quantity } =
      req.body;
    let images = req.files;
    if (
      !name ||
      !brand ||
      !description ||
      !category ||
      !shipping ||
      !price ||
      !quantity
    ) {
      return res.status(200).send({ message: "All Field Are Required*" });
    }
    if (images.length === 0) {
      return res.status(200).send({ message: "Atlest Upload one Image" });
    }
    const image = await uploadImageOnClodinary(req.files);
    let product = await new productModel({
      name,
      price,
      category,
      description,
      brand,
      shipping,
      images: image,
      quantity,
    }).save();
    return res
      .status(201)
      .send({
        message: "Product Created Successfully ",
        success: true,
        product,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something error while creating product" });
  }
};

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
      let image;
      if (req.files.length > 0) {
        await deleteImageOnCloudinary(findData.images);
        image = await uploadImageOnClodinary(req.files);
      }
      let product = await productModel.findByIdAndUpdate(
        { _id: id },
        { ...req.body, images: image ? image : findData.images },
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
export let searchHandlerController = async (req, res) => {
  try {
    let { keyword } = req.params;
    let products = await productModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    });
    res
      .status(200)
      .send({
        message: "Result Found",
        products,
        success: true,
        total: products.count,
      });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: "Somthing wrong while searching", err, success: false });
  }
};
// filterController

export let filterProductController = async (req, res) => {
  try {
    let { price, category } = req.body;
    let args = {};

    // Handle checked categories if needed
    if (category.length > 0) args.category = category;

    // Convert price string to array if it exists
    if (price) {
      {
        const [min, max] = price;
        args.price = { $gte: min, $lte: max };
      }
    }
    const products = await productModel.find(args);
    res
      .status(200)
      .send({ message: "All Filter Data", products, success: true });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({
        message: "Something went wrong while filtering",
        success: false,
        err,
      });
  }
};

// similler product

export const simillerProductController = async (req, res) => {
  try {
    let { p_id, c_id } = req.params;
    let products = await productModel
      .find({
        category: c_id,
        _id: { $ne: p_id },
      })
      .limit(3);
    res
      .status(200)
      .send({ message: "Similar Product", products, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Somthing wrong", err, success: false });
  }
};
  

export let braintreeTokenController = async (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    try {
      res.status(200).send(response);
    } catch (err) {
      console.log(err);
      res.status(501).send({
        success: false,
        message: "Somthing wrong while fetching token",
        err,
      });
    }
  });
};

export let brainTreePaymentController = async (req, res) => {
  try {
    let { nonce, cart } = req.body;
    console.log(nonce, cart);
    let total_ammount = cart.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
    gateway.transaction.sale(
      {
        amount: total_ammount,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (err) {
    res
      .status(500)
      .send({ success: false, message: "somthing wrong while payment", err });
  }
};