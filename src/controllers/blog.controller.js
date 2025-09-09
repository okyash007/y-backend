import { ApiResponse } from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';

export const createBlog = catchAsync(async (_req, res) => {
  const response = {
    status: "OK",
    timestamp: new Date().toISOString()
  };
  
  res.json(new ApiResponse(200, response, "Blog creation endpoint"));
});

export const getBlogBySlug = catchAsync(async (req, res) => {
  const { slug } = req.params;
  
  const response = {
    status: "OK",
    timestamp: new Date().toISOString(),
    slug
  };
  
  res.json(new ApiResponse(200, response, `Blog retrieved for slug: ${slug}`));
});
