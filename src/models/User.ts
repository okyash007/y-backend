import mongoose, { Schema, Model } from 'mongoose';
import { IUser } from '../types/index.js';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      minlength: [8, "Password must be at least 8 characters long"],
    },
    display_id: {
      type: String,
      required: [true, "Display ID is required"],
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "user", "visitor"],
      default: "visitor",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ createdAt: -1 });

const User: Model<IUser> = mongoose.model<IUser>("users", userSchema);

export default User;
