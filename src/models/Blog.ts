import mongoose, { Schema, Model } from 'mongoose';
import { IBlog } from '../types/index.js';

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "Author is required"],
    },
    // category: {
    //   type: String,
    //   required: [true, "Category is required"],
    //   trim: true,
    // },
    tags: {
      type: [String],
      trim: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Blog: Model<IBlog> = mongoose.model<IBlog>("blogs", blogSchema);

export default Blog;
