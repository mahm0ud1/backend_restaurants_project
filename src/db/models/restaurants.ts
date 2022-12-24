import mongoose from "mongoose";

const openTimeSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      require: true,
    },
    from: {
      type: String,
      require: true,
    },
    to: {
      type: String,
      require: true,
    }
  }
);

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
    imageURL: {
      type: String,
      require: true
    },
    rate: {
      type: Number,
      require: true
    },
    timeOpen: {
      type: [openTimeSchema],
      require: true,
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
