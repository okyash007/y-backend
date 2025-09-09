import ApiError from '../utils/ApiError.js';

export const errorMiddleWare = (err, _req, res, _next) => {
  const error = err;
  
  error.message = error.message || "Internal server error";
  error.statusCode = error.statusCode || 500;

  res.status(error.statusCode).json({
    statusCode: error.statusCode,
    success: false,
    message: error.message,
  });
};
