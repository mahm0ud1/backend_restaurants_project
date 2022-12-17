import mongoose from "mongoose";

const connectDb = async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect("mongodb+srv://epicure:MSQJOqYtIEsWu3vi@epicure.psoezm7.mongodb.net/test");
};

export { connectDb };
