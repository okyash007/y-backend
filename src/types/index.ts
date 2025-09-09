import { Document, Types } from 'mongoose';
import { z } from 'zod';

// User related types
export interface IUser extends Document {
  name?: string;
  email: string;
  verified: boolean;
  password?: string;
  display_id: string;
  role: 'admin' | 'user' | 'visitor';
  createdAt: Date;
  updatedAt: Date;
}

// Device related types
export interface IDevice extends Document {
  fingerprint: string;
  ipAddress: string;
  deviceConsistent: {
    os: string;
    platform: string;
    language: string;
    timezone: string;
    ipAddress: string;
  };
  language: string;
  timezone: string;
  os: string;
  platform: string;
  user?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Blog related types
export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  author: Types.ObjectId;
  tags?: string[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// API Response types
export interface IApiResponse<T = any> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
  [key: string]: any;
}

// Error types
export interface IApiError extends Error {
  statusCode: number;
  isOperational: boolean;
}

// Middleware types
export type AsyncHandler = (req: any, res: any, next: any) => Promise<void>;

// Common response structure
export interface StandardResponse {
  status: string;
  timestamp: string;
}

// Legacy interface - will be replaced by Zod types
export interface Fingerprint {
  hash: string;
  components: FingerprintComponents;
}

// Zod schemas for validation
export const FingerprintComponentsSchema = z.object({
  useragent: z.object({
    browser: z.string(),
    version: z.string(),
    os: z.string(),
    platform: z.string(),
    source: z.string(),
  }).optional(),
  acceptHeaders: z.object({
    accept: z.string(),
    encoding: z.string(),
    language: z.string(),
  }).optional(),
  geoip: z.object({
    country: z.string(),
    region: z.string(),
    eu: z.string(),
    timezone: z.string(),
    city: z.string(),
    ll: z.array(z.number()),
    metro: z.number(),
    area: z.number(),
  }).optional(),
  deviceConsistent: z.object({
    os: z.string(),
    platform: z.string(),
    language: z.string(),
    timezone: z.string(),
    ipAddress: z.string(),
  }).optional(),
});

export const FingerprintSchema = z.object({
  hash: z.string(),
  components: FingerprintComponentsSchema,
});

// Zod schema for express-fingerprint result (can be array-based or object-based components)
export const FingerprintResultSchema = z.object({
  hash: z.string(),
  components: z.union([
    z.array(z.record(z.string(), z.any())), // Array format (original express-fingerprint)
    z.record(z.string(), z.any()) // Object format (sometimes returned)
  ]).optional(),
});

// Type inference from Zod schemas
export type FingerprintComponents = z.infer<typeof FingerprintComponentsSchema>;
export type FingerprintResult = z.infer<typeof FingerprintResultSchema>;
