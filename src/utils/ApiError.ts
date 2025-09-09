import { IApiError } from '../types/index.js';

export default class ApiError extends Error implements IApiError {
  public statusCode: number;
  public isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational: boolean = true, stack?: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
