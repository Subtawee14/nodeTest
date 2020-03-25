const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, default: "" },
    price: { type: Number, default: 0 },
    stock: { type: Number, default: 0 }
  },
  {
    versionKey: false
  }
);

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
