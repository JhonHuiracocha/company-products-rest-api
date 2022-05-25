import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    imgUrl: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("product", productSchema);
