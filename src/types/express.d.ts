import { Request } from 'express';
import { Fingerprint } from './index.js';

declare global {
  namespace Express {
    interface Request {
      fingerprint?: Fingerprint;
    }
  }
}

export {};
