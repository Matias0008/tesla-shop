import mongoose, { Schema, model, Model } from "mongoose";

import { IProduct, Product } from "@/interfaces";

const productSchema = new Schema(
  {
    description: { type: String, required: true, default: "" },
    images: [{ type: String }],
    inStock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    sizes: [
      {
        type: String,
        enum: {
          values: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
          message: "{VALUE} no es un talle permitido.",
        },
        default: "XS",
      },
    ],
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    title: { type: String, required: true, default: "" },
    type: {
      type: String,
      enum: {
        values: ["shirts", "pants", "hoodies", "hats", "jackets"],
        message: "{VALUE} no es un tipo permitido",
      },
      default: "shirts",
    },
    gender: {
      type: String,
      enum: {
        values: ["men", "women", "kid", "unisex"],
        message: "{VALUE} no es un genero permitido",
      },
      default: "men",
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ title: "text", tags: "text" });

// Product Model
const ProductModel: Model<Product> =
  mongoose.models.Product || model("Product", productSchema);

export default ProductModel;
