import mongoose from "mongoose";

const ChunksSchema = new mongoose.Schema(
  {
    files_id: {
      type: String,
      require: true,
    },
    n: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Buffer,
      require: true,
    },
  },
);

const Photos = mongoose.model("photos.chunks", ChunksSchema);

export default Photos;
