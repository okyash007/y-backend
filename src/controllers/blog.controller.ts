import { Request, Response } from 'express';
import { ApiResponse } from '../utils/ApiResponse.js';
import { StandardResponse } from '../types/index.js';
import catchAsync from '../utils/catchAsync.js';

export const createBlog = catchAsync(async (_req: Request, res: Response): Promise<void> => {
  const response: StandardResponse = {
    status: "OK",
    timestamp: new Date().toISOString()
  };
  
  res.json(new ApiResponse(200, response, "Blog creation endpoint"));
});

export const getBlogBySlug = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { slug } = req.params;
  
  const response: StandardResponse & { slug: string } = {
    status: "OK",
    timestamp: new Date().toISOString(),
    slug
  };
  
  res.json(new ApiResponse(200, response, `Blog retrieved for slug: ${slug}`));
});
