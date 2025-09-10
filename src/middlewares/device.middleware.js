import { syncDevice } from "../services/device.services.js";
import catchAsync from "../utils/catchAsync.js";

export const deviceMiddleware = catchAsync(async (req, _res, next) => {
    const device = await syncDevice(req.fingerprint);
    req.yDevice = device;
    next();
});
