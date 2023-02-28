import mongoose, { Schema, model, Model } from "mongoose";

import { IGender } from "@/interfaces";

const genderScheme = new Schema({
  name: {
    type: String,
    required: true,
  },
});

// Size Model
const GenderModel: Model<IGender> =
  mongoose.models.Gender || model("Gender", genderScheme);

export default GenderModel;
