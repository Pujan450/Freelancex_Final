import mongoose from "mongoose";
const { Schema } = mongoose;

const sellerSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  description: { type: String, required: true },
  skills: [{ type: String }],
  rating: { type: Number, default: 0 },
  completedOrders: { type: Number, default: 0 },
  portfolio: [{ type: String }], // optional for images/videos
}, { timestamps: true });

export default mongoose.model("Seller", sellerSchema);
