import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError.js';

export const errorMiddleWare = (
  err: ApiError | Error, 
  _req: Request, 
  res: Response, 
  _next: NextFunction
): void => {
  const error = err as ApiError;
  
  error.message = error.message || "Internal server error";
  error.statusCode = error.statusCode || 500;

  res.status(error.statusCode).json({
    statusCode: error.statusCode,
    success: false,
    message: error.message,
  });
};
