import Blog from "../models/Blog.js";
import { blogUpdateZodSchema, blogZodSchema } from "../zod/blog.zod.js";
import { z } from "zod";

export const createBlog = async (blogData) => {
  const blog = await Blog.create(blogData);
  return blog;
};

export const getBlogBySlug = async (slug) => {
  const blog = await Blog.findOne({ slug });
  return blog;
};

export const getPublishedBlugBuSlug = async (slug) => {
  const blog = await Blog.findOne({ slug, isPublished: true }).populate({
    path: "device",
    select: "platform user",
    populate: {
      path: "user",
      select: "name email"
    }
  });
  return blog;
};

const updateBlog = async (blogId, blogData) => {
  const blog = await Blog.findByIdAndUpdate(blogId, blogData, {
    new: true,
  });
  return blog;
};

export const getBlogCountWithSlug = async (slug) => {
  const count = await Blog.countDocuments({
    slug: { $regex: `^${slug}(-\\d+)?$` },
  });
  return count;
};

// Helper function to convert title to slug
export const titleToSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, and multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
};

export const createUniqueSlug = async (baseSlug) => {
  // Count all blogs that start with the base slug pattern
  const count = await getBlogCountWithSlug(baseSlug);

  // If no blogs exist with this pattern, return the base slug
  if (count === 0) {
    return baseSlug;
  }

  // Generate the next available slug based on count
  const candidateSlug = `${baseSlug}-${count + 1}`;

  // Double-check that this specific slug doesn't exist
  const existingBlog = await Blog.findOne({ slug: candidateSlug });

  if (!existingBlog) {
    return candidateSlug;
  }

  // If it exists (edge case), recursively try with the candidate as new base
  return await createUniqueSlug(candidateSlug);
};

export const createBlogWithZod = async (blogData) => {
  try {
    const result = blogZodSchema.safeParse(blogData);
    if (!result.success) {
      throw new Error(result.error.message);
    }
    const blog = await Blog.create(result.data);
    return blog;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createBlogWithData = async (deviceId, content = "", title = "Untitled") => {
  const baseSlug = titleToSlug(title);
  const slug = await createUniqueSlug(baseSlug);

  const blogData = {
    device: deviceId,
    slug,
    title,
    content,
  };

  const blog = await createBlogWithZod(blogData);
  return blog;
};

export const updateBlogWithZod = async (blogId, blogData) => {
  try {
    const result = blogUpdateZodSchema.safeParse(blogData);
    if (!result.success) {
      throw new Error(result.error.message);
    }
    const blog = await updateBlog(blogId, result.data);
    return blog;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateBlogWithData = async (blogId, blogData) => {
  try {
    // First, get the current blog to check if title is being updated
    const currentBlog = await Blog.findById(blogId);
    if (!currentBlog) {
      throw new Error("Blog not found");
    }

    // Check if title is being updated and is different from current title
    if (blogData.title && blogData.title !== currentBlog.title) {
      // Create a new slug from the updated title
      const baseSlug = titleToSlug(blogData.title);
      const newSlug = await createUniqueSlug(baseSlug);
      
      // Add the new slug to the update data
      blogData.slug = newSlug;
    }

    // Update the blog with the new data (including new slug if title was updated)
    const updatedBlog = await updateBlogWithZod(blogId, blogData);
    return updatedBlog;
  } catch (error) {
    throw new Error(error.message);
  }
};
