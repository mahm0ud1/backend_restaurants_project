import mongoose from "mongoose";

const FilesSchema = new mongoose.Schema(
  {
    length: {
      type:Number,
      require: true,
    },
    chunckSize: {
      type: Number,
      required: true,
    },
    filename: {
      type: String,
      require: true,
    },
    contentType: {
      type: String,
      require: true,
    },
  },
);

const Files = mongoose.model("photos.files", FilesSchema);

export default Files;
