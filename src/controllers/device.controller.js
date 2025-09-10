import { ApiResponse } from "../utils/ApiResponse.js";
import _ from "lodash";

export const syncDeviceController = (req, res) => {
  res.json(new ApiResponse(200, req.yDevice, "Device synced"));
};
