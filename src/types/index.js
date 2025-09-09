// This file contains exported constants and schemas for the vanilla JS version
// TypeScript interfaces are not needed in vanilla JS

import { z } from 'zod';

// Zod schemas for validation (these can still be used in vanilla JS)
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
