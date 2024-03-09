import mongoose from "mongoose";
let orderModel = mongoose.Schema({
    products: [
        {
          type: mongoose.ObjectId,
          ref: "product",
        },
      ],
      payment: {},
      buyer: {
        type: mongoose.ObjectId,
        ref: "users",
      },
      status: {
        type: String,
        default: "Not Process",
        enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
      },
    },

{ timestamps: true }
)
export default mongoose.model("order",orderModel)