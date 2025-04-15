const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    modelNumber: { type: String },
    serialNumber: { type: String, required: true },
    purchaseDate: { type: Date, required: true },
    detectedPurchaseDate: { type: Date }, // from OCR
    warrantyPeriodMonths: { type: Number, required: true },
    invoiceImageURL: { type: String }, // Cloudinary/local path
    isUnderWarranty: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
