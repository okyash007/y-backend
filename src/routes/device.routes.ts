import express, { Router } from 'express';
import { createDeviceController } from '../controllers/device.controller.js';
import { deviceMiddleware } from '../middlewares/device.middleware.js';

const router: Router = express.Router();

router.get('/', deviceMiddleware, createDeviceController);

export default router;
