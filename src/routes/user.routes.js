import express from "express";
import { identifyUser } from '../controllers/user.controller.js';
import { deviceMiddleware } from "../middlewares/device.middleware.js";

const router = express.Router();

router.post("/identify", deviceMiddleware, identifyUser);

export default router;
