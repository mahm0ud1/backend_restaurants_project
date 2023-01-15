import mongoose from "mongoose";

const epicureDataSchema = new mongoose.Schema(
  {
    id: {
      type:Number,
      require: true,
    },
    key: {
        type: String,
        require: true
    },
    value: {
        type: Number||String,
        require: true
    }
    
  },
  { timestamps: true }
);

const epicureData = mongoose.model("epicure_data", epicureDataSchema);

export default epicureData;
