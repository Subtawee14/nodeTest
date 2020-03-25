const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Product = require("../model/product");
const Shop = require("../model/shop");

mongoose.connect("mongodb://localhost:27017/testaApi", {
  useNewUrlParser: true
});
mongoose.connection.on("error", err => {
  console.error("MongoDB error", err);
});

router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

router.get("/byshop/:id", async (req, res) => {
  //item id
  const { id } = req.params;
  const list = await Shop.find({
    products: id
  });
  console.log(list);
  res.json(list);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const result = Product.findById(id);
  res.json(result);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const result = Product.findById(id);
  res.json(result);
});

router.post("/", async (req, res) => {
  const payload = req.body;
  const product = new Product(payload);
  await product.save();
  res.status(201).end();
});

router.put("/:id", async (req, res) => {
  const payload = req.body;
  const { id } = req.params;
  await Product.findByIdAndUpdate(id, { $set: payload });
  const result = await Product.findById(id);
  res.json(result);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.status(204).end();
});

module.exports = router;
