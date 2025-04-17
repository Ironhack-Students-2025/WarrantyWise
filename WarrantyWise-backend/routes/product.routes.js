const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const Product = require("../models/Warranty.model");
const { isAuthenticated, user } = require("../middleware/jwt.middleware");

//POST Product

router.post("/", isAuthenticated, async (req, res) => {
  try {
    const {
      name,
      modelNumber,
      serialNumber,
      purchaseDate,
      warrantyPeriodMonths,
    } = req.body;

    const response = await Product.create({
      user: req.user._id,
      name,
      modelNumber,
      serialNumber,
      purchaseDate: new Date(purchaseDate),
      warrantyPeriodMonths,
      invoiceImageURL: "",
      isUnderWarranty: true,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
});

//GET all products

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
});

//GET single poduct by id

router.get("/:productId", isAuthenticated, async (req, res) => {
  const { productId } = req.params;
  try {
    const response = await Product.findOne({
      _id: productId,
      user: user._id,
    });
    if (!response) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving product", error: error.message });
  }
});

//PUT edit product details

router.put("/:productId", isAuthenticated, async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findOne({
      _id: productId,
      user: user._id,
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    const {
      name,
      modelNumber,
      serialNumber,
      purchaseDate,
      warrantyPeriodMonths,
    } = req.body;

    product.name = name || product.name;
    product.modelNumber = modelNumber || product.modelNumber;
    product.serialNumber = serialNumber || product.serialNumber;
    product.purchaseDate = purchaseDate
      ? new Date(purchaseDate)
      : product.purchaseDate;
    product.warrantyPeriodMonths =
      warrantyPeriodMonths || product.warrantyPeriodMonths;

    await product.save();
    res.json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
});
