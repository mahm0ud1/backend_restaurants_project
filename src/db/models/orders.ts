import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema(
  {
    id: {
      type:Number,
      require: true,
    },
    userID: {
      type: Number,
      require: true
    },
    dishID: {
      type: Number,
      require: true
    },
    count: {
        type: Number,
        require: true
    },
    dishOptions: {
      type: Object,
      required: true
    }
  },
  { timestamps: true }
);

const Orders = mongoose.model("Orders", ordersSchema);

export default Orders;
