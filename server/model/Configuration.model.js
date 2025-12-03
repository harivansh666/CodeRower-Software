import mongoose from "mongoose";

const configSchema = new mongoose.Schema({
  configurationId: { type: String, required: true, unique: true },
  data: { type: [[String]], required: true },
  remark: { type: String },
});

export const configModel = mongoose.model("configdata", configSchema);
