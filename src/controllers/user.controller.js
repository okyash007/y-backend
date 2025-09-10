import { ApiResponse } from "../utils/ApiResponse.js";
import catchAsync from "../utils/catchAsync.js";
import { z } from "zod";
import { findOrCreateUser } from "../services/user.service.js";
import { updateDevice } from "../services/device.services.js";
import mongoose from "mongoose";

const itentitySchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
});

export const identifyUser = catchAsync(async (req, res) => {

  // If user is already identified, return the user
  if (req.yDevice?.user) {
    return res.json(
      new ApiResponse(200, req.yDevice, "User already identified")
    );
  }

  // Validate the request body
  const result = itentitySchema.safeParse(req.body);

  if (!result.success) {
    return res.json(
      new ApiResponse(400, result.error.message, "Invalid request")
    );
  }

  const { email, name, password } = result.data;

  // Start a database transaction to ensure atomicity
  const session = await mongoose.startSession();
  
  try {
    await session.withTransaction(async () => {
      const user = await findOrCreateUser(email, name, password, session);
      const device = await updateDevice(req.yDevice._id, { user: user._id }, session);
      
      // Store the device for the response
      res.locals.transactionResult = device;
    });

    return res.json(new ApiResponse(200, res.locals.transactionResult, "User identified"));
  } finally {
    await session.endSession();
  }
});
