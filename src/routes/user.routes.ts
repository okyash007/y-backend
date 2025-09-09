import express, { Router } from "express";
import { authUser, identifyUser } from '../controllers/user.controller.js';

const router: Router = express.Router();

router.get("/auth", authUser);
router.post("/identify", identifyUser);

export default router;
