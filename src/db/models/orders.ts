import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema(
  {
    id: {
      type:Number,
      require: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageURL: {
      type: String,
      require: true
    },
    about: {
      type: String,
      require: true,
    },
    count: {
        type: Number,
        require: true
    }
  },
  { timestamps: true }
);

const Orders = mongoose.model("Orders", ordersSchema);

export default Orders;
