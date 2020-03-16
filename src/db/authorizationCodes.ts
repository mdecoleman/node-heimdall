import mongoose from "mongoose";

const AuthorizationCodeSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true }
  },
  { versionKey: false }
);

export const AuthorizationCode = mongoose.model(
  "AuthorizationCode",
  AuthorizationCodeSchema
);
