import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    disabled: { type: Boolean, required: false },
    isAdmin: { type: Boolean, required: false }
  },
  { versionKey: false }
);

export const User = mongoose.model("User", UserSchema);
