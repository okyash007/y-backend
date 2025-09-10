import express from 'express';
import { syncDeviceController } from '../controllers/device.controller.js';
import { deviceMiddleware } from '../middlewares/device.middleware.js';

const router = express.Router();

router.get('/', deviceMiddleware, syncDeviceController);

export default router;
