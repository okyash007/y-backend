import z from "zod";
import {
  createBlogWithData,
  getPublishedBlugBuSlug,
  updateBlogWithData,
} from "../services/blog.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import catchAsync from "../utils/catchAsync.js";

export const createBlogController = catchAsync(async (req, res) => {
  const deviceId = req.yDevice._id;

  const blogData = req.body;
  const verifiedBlogData = z
    .object({
      content: z.string(),
      title: z.string().optional(),
    })
    .safeParse(blogData);

  if (!verifiedBlogData.success) {
    return res.json(new ApiResponse(400, null, verifiedBlogData.error.message));
  }

  const blog = await createBlogWithData(
    deviceId,
    verifiedBlogData.data.content,
    verifiedBlogData.data.title
  );

  res.json(
    new ApiResponse(200, blog, `Blog created for deviceId: ${deviceId}`)
  );
});

export const getBlogBySlugController = catchAsync(async (req, res) => {
  const { slug } = req.params;

  if (!slug) {
    return res.json(new ApiResponse(400, null, "Slug is required"));
  }

  const blog = await getPublishedBlugBuSlug(slug);

  if (!blog) {
    return res.json(new ApiResponse(404, null, "Blog not found"));
  }

  res.json(new ApiResponse(200, blog, `Blog retrieved for slug: ${slug}`));
});

export const updateBlogController = catchAsync(async (req, res) => {
  const { blogId } = req.params;

  const updatedBlogData = req.body;
  const verifiedBlogData = z
    .object({
      content: z.string().optional(),
      title: z.string().optional(),
      isPublished: z.boolean().optional(),
    })
    .safeParse(updatedBlogData);

  if (!verifiedBlogData.success) {
    return res.json(new ApiResponse(400, null, verifiedBlogData.error.message));
  }

  const blog = await updateBlogWithData(blogId, verifiedBlogData.data);

  res.json(new ApiResponse(200, blog, `Blog updated for blogId: ${blogId}`));
});
