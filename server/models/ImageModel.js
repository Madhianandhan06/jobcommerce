import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    imageUrl: String,
    publicId: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
  },
  { timestamps: true }
);

export default mongoose.model("Image", imageSchema);