import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema(
  {
    id : {
      type: Number,
      require: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      require: true
    },
    username: {
      type: String,
      require: true
    },
    email: {
      type: String,
      required: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("users", UsersSchema);

export default Users;
