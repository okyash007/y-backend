import { ApiResponse } from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';

export const authUser = catchAsync(async (_req, res) => {
  const response = {
    status: "OK",
    timestamp: new Date().toISOString()
  };
  
  res.json(new ApiResponse(200, response, "User authentication endpoint"));
});

export const identifyUser = catchAsync(async (_req, res) => {
  const response = {
    status: "OK",
    timestamp: new Date().toISOString()
  };
  
  res.json(new ApiResponse(200, response, "User identification endpoint"));
});
