import mongoose from "mongoose";

const chefsSchema = new mongoose.Schema(
  {
    id: {
      type:Number,
      require: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    about: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Chefs = mongoose.model("Chefs", chefsSchema);

export default Chefs;
