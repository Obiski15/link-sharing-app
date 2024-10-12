import mongoose, { Document, Schema } from "mongoose";

export interface ILink extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  platform: string;
  createdAt: Date;
  url: string;
}

const linkSchema: Schema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A user id must be attached to a link"],
  },
  createdAt: Date,
});

linkSchema.pre("save", function (this: ILink, next) {
  if (!this.isNew) return next();
  this.createdAt = new Date();
  next();
});

const Link = mongoose.models.Link || mongoose.model<ILink>("Link", linkSchema);

export default Link;
