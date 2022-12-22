import mongoose from "mongoose";
require('dotenv').config();

const db_url = process.env.MONGODB_URL;
const db_name = process.env.DB_NAME;

const connectDb = async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(`mongodb+srv://${db_url}/${db_name}`);
};

export { connectDb, db_url, db_name };
