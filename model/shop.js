const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shopSchema = new Schema(
  {
    name: { type: String, default: "" },
    products: { type: Array, default: [] }
  },
  {
    versionKey: false
  }
);

const ShopModel = mongoose.model("Shop", shopSchema);

module.exports = ShopModel;
