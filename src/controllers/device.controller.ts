import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";
import _ from "lodash";


export const createDeviceController = (req: Request, res: Response): void => {
  res.json(new ApiResponse(200, (req as any).yDevice, "Device creation endpoint"));
};
