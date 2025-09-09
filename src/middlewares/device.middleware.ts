import { Request, Response, NextFunction } from 'express';
import { createDevice } from "../services/device.services.js";
import { Fingerprint } from "../types/index.js";
import catchAsync from "../utils/catchAsync.js";

export const deviceMiddleware = catchAsync(async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const device = await createDevice(req.fingerprint as Fingerprint);
    (req as any).yDevice = device;
    next();
});