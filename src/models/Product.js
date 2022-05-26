import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    imgUrl: { type: String, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("product", productSchema);
