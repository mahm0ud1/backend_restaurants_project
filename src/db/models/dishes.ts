import mongoose from "mongoose";

const dishesSchema = new mongoose.Schema(
  {
    id: {
      type:Number,
      require: true,
    },
    restaurantID: {
        type: Number,
        require: true
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      require: true
    },
    about: {
      type: String,
      require: true,
    },
    dishType: {
        type: String,
        require: true
    },
    signature: {
        type: String,
        require: true,
    }
    
  },
  { timestamps: true }
);

const Dishes = mongoose.model("Dishes", dishesSchema);

export default Dishes;
