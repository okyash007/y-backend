import { Request, Response, NextFunction } from 'express';
import { AsyncHandler } from '../types/index.js';

type ExpressAsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export default function catchAsync(fn: ExpressAsyncHandler): AsyncHandler {
  return function (req: Request, res: Response, next: NextFunction): Promise<void> {
    return Promise.resolve(fn(req, res, next)).catch((err: Error) => next(err));
  };
}
