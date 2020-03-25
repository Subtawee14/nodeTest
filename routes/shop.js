const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Shop = require("../model/shop");
const Product = require("../model/product");

mongoose.connect("mongodb://localhost:27017/testaApi", {
  useNewUrlParser: true
});

router.get("/", async (req, res) => {
  const shop = await Shop.find({});
  res.json(shop);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await Shop.findById(id);
  res.json(result);
});

router.post("/", async (req, res) => {
  const payload = req.body;
  const shop = new Shop(payload);
  await shop.save();
  res.status(201).end();
});

router.put("/:id", async (req, res) => {
  const payload = req.body;
  const { id } = req.params;
  await Shop.findByIdAndUpdate(id, { $set: payload });
  const result = await Shop.findById(id);
  res.json(result);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Shop.findByIdAndDelete(id);
  res.status(204).end();
});

router.post("/addproduct/:id", async (req, res) => {
  const { productId } = req.body;

  const { id } = req.params;
  await Shop.findByIdAndUpdate(id, { $push: { products: productId } });
  const result = await Shop.findById(id);
  res.json(result);
});

module.exports = router;
