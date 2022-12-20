import mongoose from "mongoose";

const restaurantsSchema = new mongoose.Schema(
  {
    id : {
      type: Number,
      require: true,
    },
    name: {
      type: String,
      required: true,
    },
    chefID: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Restaurants = mongoose.model("Restaurants", restaurantsSchema);

export default Restaurants;
