import mongoose, { Schema } from 'mongoose';

const blogSchema = new Schema(
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
    device: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "devices",
      required: [true, "Device is required"],
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

const Blog = mongoose.model("blogs", blogSchema);

export default Blog;
