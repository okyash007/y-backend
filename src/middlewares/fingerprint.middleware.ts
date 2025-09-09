import fingerprint from "express-fingerprint";
import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../utils/ApiResponse.js';
import { FingerprintResultSchema, FingerprintSchema, Fingerprint } from '../types/index.js';
import { z } from 'zod';

// Convert express-fingerprint result to our Fingerprint format using Zod validation
const convertAndValidateFingerprint = (fpResult: unknown): Fingerprint => {
  // First validate the input as FingerprintResult
  const validatedResult = FingerprintResultSchema.parse(fpResult);
  
  // Handle both array-based and object-based components
  let components: any = {};
  if (validatedResult.components) {
    if (Array.isArray(validatedResult.components)) {
      // Array format - merge all objects in the array
      validatedResult.components.forEach((component) => {
        Object.assign(components, component);
      });
    } else {
      // Object format - use directly
      components = validatedResult.components;
    }
  }
  
  // Create and validate the final Fingerprint object
  const fingerprint: Fingerprint = {
    hash: validatedResult.hash,
    components
  };
  
  // Validate the final result matches our Fingerprint schema
  return FingerprintSchema.parse(fingerprint);
};

const baseFingerprintMiddleware = fingerprint({
  parameters: [
    // fingerprint.useragent,
    // fingerprint.acceptHeaders,
    // Custom parameter for device-consistent info
    function (this: { req: Request }, next: (err: Error, result?: any) => void) {
      const req = this.req;
      const userAgent: string = req.headers["user-agent"] || "";

      // Extract OS and device info that's more consistent across browsers
      const osMatch = userAgent.match(
        /(Windows NT [\d.]+|Mac OS X [\d_]+|Linux|Android [\d.]+|iOS [\d_]+)/i
      );
      const platformMatch = userAgent.match(
        /(iPhone|iPad|Android|Windows|Macintosh|Linux)/i
      );

      // Get client IP address (handles proxies and load balancers)
      const getClientIP = (req: Request): string => {
        const forwarded = req.headers["x-forwarded-for"];
        return (
          (Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(",")[0]?.trim()) ||
          req.headers["x-real-ip"] as string ||
          req.headers["x-client-ip"] as string ||
          (req as any).connection?.remoteAddress ||
          (req as any).socket?.remoteAddress ||
          req.ip ||
          "Unknown"
        );
      };

      // Extract screen resolution hints from user agent if available
      const deviceInfo = {
        os: osMatch ? osMatch[1] : "Unknown",
        platform: platformMatch ? platformMatch[1] : "Unknown",
        // Accept-Language is often consistent across browsers on same device
        language: req.headers["accept-language"]
          ? req.headers["accept-language"].split(",")[0]
          : "Unknown",
        // Timezone from headers (if available)
        timezone: (req.headers["x-timezone"] as string) || "Unknown",
        // IP address - very consistent across browsers on same device/network
        ipAddress: getClientIP(req),
      };

      next(null as any, { deviceConsistent: deviceInfo });
    },
  ],
});

// Wrapper middleware that ensures fingerprint is always available
export const fingerprintMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  baseFingerprintMiddleware(req, res, (err): void => {
    if (err) {
      res.status(500).json(new ApiResponse(500, null, "Error generating fingerprint"));
      return;
    }
    
    try {
      // Check if fingerprint was successfully generated
      if (!req.fingerprint) {
        res.status(400).json(new ApiResponse(400, null, "Fingerprint data not available"));
        return;
      }
      
      // Convert and validate the fingerprint using Zod
      const validatedFingerprint = convertAndValidateFingerprint(req.fingerprint);
      
      // Replace the original fingerprint with the validated one
      (req as any).fingerprint = validatedFingerprint;
      
      next();
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        res.status(400).json(new ApiResponse(400, null, `Invalid fingerprint data: ${validationError.message}`));
      } else {
        res.status(500).json(new ApiResponse(500, null, "Error processing fingerprint"));
      }
      return;
    }
  });
};
