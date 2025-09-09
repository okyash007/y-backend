import { Request, Response } from 'express';
import { ApiResponse } from '../utils/ApiResponse.js';
import { StandardResponse } from '../types/index.js';
import catchAsync from '../utils/catchAsync.js';

export const authUser = catchAsync(async (_req: Request, res: Response): Promise<void> => {
  const response: StandardResponse = {
    status: "OK",
    timestamp: new Date().toISOString()
  };
  
  res.json(new ApiResponse(200, response, "User authentication endpoint"));
});

export const identifyUser = catchAsync(async (_req: Request, res: Response): Promise<void> => {
  const response: StandardResponse = {
    status: "OK",
    timestamp: new Date().toISOString()
  };
  
  res.json(new ApiResponse(200, response, "User identification endpoint"));
});
