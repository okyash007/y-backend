import express from "express";
import { authUser, identifyUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get("/auth", authUser);
router.post("/identify", identifyUser);

export default router;
