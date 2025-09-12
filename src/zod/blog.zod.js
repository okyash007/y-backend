import { z } from "zod";
import mongoose from "mongoose";

// Custom validation for MongoDB ObjectId (string format or ObjectId instance)
const mongoObjectId = z.union([
  z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format"),
  z.instanceof(mongoose.Types.ObjectId)
]);

export const blogZodSchema = z.object({
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  device: mongoObjectId,
});

export const blogUpdateZodSchema = z.object({
  title: z.string().optional(),
  slug: z.string().optional(),
  content: z.string().optional(),
  device: mongoObjectId.optional(),
  isPublished: z.boolean().optional(),
});
