import express from "express";
import {
  createBlogController,
  getBlogBySlugController,
  updateBlogController,
} from "../controllers/blog.controller.js";
import { deviceMiddleware } from "../middlewares/device.middleware.js";

const router = express.Router();

router.post("/create", deviceMiddleware, createBlogController);
router.put("/update/:blogId", deviceMiddleware, updateBlogController);
router.get("/:slug", getBlogBySlugController);

export default router;
