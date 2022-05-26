import { Schema, model } from "mongoose";

export const ROLES = ["user", "admin", "moderator"];

const roleSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("role", roleSchema);
